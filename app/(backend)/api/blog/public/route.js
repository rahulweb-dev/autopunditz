import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET() {
  await connectDB();

  const blogs = await Blog.find({ status: "published" })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  return Response.json(blogs, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
  });
}
