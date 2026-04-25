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

// CREATE
export async function POST(req) {
  await connectDB();

  const body = await req.json();

  const now = new Date();

  if (body.publishAt) {
    const publishDate = new Date(body.publishAt);

    // 🔥 FIX: compare correctly
    if (publishDate > now) {
      body.status = "scheduled";
    } else {
      body.status = "published";
    }
  }

  const blog = await Blog.create(body);

  return Response.json(blog, { status: 201 });
}