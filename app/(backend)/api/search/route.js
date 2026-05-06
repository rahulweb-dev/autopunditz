import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET(req) {

  try {

    await connectDB();

    const { searchParams } =
      new URL(req.url);

    const q =
      searchParams.get("q") || "";

    if (!q.trim()) {
      return Response.json([]);
    }

    const blogs = await Blog.find({
      status: "published",
      $or: [
        {
          title: {
            $regex: q,
            $options: "i",
          },
        },
        {
          content: {
            $regex: q,
            $options: "i",
          },
        },
        {
          category: {
            $regex: q,
            $options: "i",
          },
        },
        {
          subCategory: {
            $regex: q,
            $options: "i",
          },
        },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return Response.json(blogs);

  } catch (err) {

    return Response.json(
      { error: "Search failed" },
      { status: 500 }
    );

  }

}