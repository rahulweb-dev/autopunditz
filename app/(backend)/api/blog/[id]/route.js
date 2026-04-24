// app/api/blog/[id]/route.js

import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import jwt from "jsonwebtoken";

// ✅ GET SINGLE BLOG
export async function GET(req, { params }) {
  await connectDB();

  const blog = await Blog.findById(params.id);

  if (!blog) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json(blog);
}

// ✅ UPDATE BLOG
export async function PUT(req, { params }) {
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

    const updated = await Blog.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );

    return Response.json(updated);

  } catch (err) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// ✅ DELETE BLOG
export async function DELETE(req, { params }) {
  await connectDB();

  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 Only admin can delete
    if (user.role !== "admin") {
      return Response.json({ error: "Only admin can delete" }, { status: 403 });
    }

    await Blog.findByIdAndDelete(params.id);

    return Response.json({ success: true });

  } catch (err) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}