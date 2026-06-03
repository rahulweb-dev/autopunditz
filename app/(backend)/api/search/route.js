import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

// Escape regex metacharacters to prevent ReDoS
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    // Hard cap at 100 chars to prevent ReDoS / large regex attacks
    const raw = (searchParams.get("q") || "").trim().slice(0, 100);
    if (!raw) return Response.json([]);

    const q = escapeRegex(raw);

    const blogs = await Blog.find({
      status: "published",
      $or: [
        { title:       { $regex: q, $options: "i" } },
        { category:    { $regex: q, $options: "i" } },
        { subCategory: { $regex: q, $options: "i" } },
        { keywords:    { $regex: q, $options: "i" } },
      ],
    })
      .select("title slug ogImage content category subCategory createdAt")
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return Response.json(blogs);
  } catch (err) {
    console.error("Search error:", err);
    return Response.json({ error: "Search failed" }, { status: 500 });
  }
}
