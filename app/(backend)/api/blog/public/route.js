import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET() {
  await connectDB();

  const blogs = await Blog.find({
    status: "published",
  }).sort({ createdAt: -1 });

  return Response.json(blogs);
}