import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

// 🔄 AUTO PUBLISH
async function autoPublish() {
  await Blog.updateMany(
    {
      status: "scheduled",
      publishAt: { $lte: new Date() },
    },
    { $set: { status: "published" } }
  );
}


// GET ALL
export async function GET() {
  await connectDB();

  await autoPublish();

  const blogs = await Blog.find().sort({ createdAt: -1 });

  return Response.json(blogs);
}

export async function POST(req) {
await connectDB();

try {
  const {
    title,
    category,
    subCategory,
    content,
    status,
    publishAt,
  } = await req.json();

  // ✅ VALIDATIONS
  if (!title) {
    return Response.json({ error: "Title required" }, { status: 400 });
  }

  if (!content) {
    return Response.json({ error: "Content required" }, { status: 400 });
  }

  if (!category) {
    return Response.json({ error: "Category required" }, { status: 400 });
  }

  if (!subCategory) {
    return Response.json({ error: "SubCategory required" }, { status: 400 });
  }

  const now = new Date();
  let finalStatus = status || "draft";

  // 🔥 AUTO STATUS LOGIC
  if (publishAt) {
    const publishDate = new Date(publishAt);

    if (publishDate > now) {
      finalStatus = "scheduled";
    } else {
      finalStatus = "published";
    }
  }

  // ✅ CREATE BLOG (explicit fields only)
  const blog = await Blog.create({
    title,
    category,
    subCategory, // 🔥 GUARANTEED SAVE
    content,
    status: finalStatus,
    publishAt,
  });

  return Response.json(blog, { status: 201 });

} catch (error) {
  console.error("POST BLOG ERROR:", error);
  return Response.json(
    { error: error.message || "Something went wrong" },
    { status: 500 }
  );
}
}