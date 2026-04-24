// app/api/blog/route.js

import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import jwt from "jsonwebtoken";

// ✅ GET ALL BLOGS
export async function GET() {
  await connectDB();

  const blogs = await Blog.find().sort({ createdAt: -1 });

  return Response.json(blogs);
}

// ✅ CREATE BLOG (ADMIN + WRITER)
export async function POST(req) {
  await connectDB();

  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (user.role !== "admin" && user.role !== "writer") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    const blog = await Blog.create(body);

    return Response.json(blog);

  } catch (err) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}