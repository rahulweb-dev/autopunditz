import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import mongoose from "mongoose";

// ✅ GET ONE
export async function GET(req, context) {
  await connectDB();

  const { id } = await context.params; // ✅ FIX

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  const blog = await Blog.findById(id);

  if (!blog) {
    return Response.json({ error: "Blog not found" }, { status: 404 });
  }

  return Response.json(blog);
}

// ✅ UPDATE
export async function PUT(req, context) {
  try {
    await connectDB();

    const { id } = await context.params; // ✅ FIX
    const body = await req.json();

    console.log("Updating:", id, body); // debug

    const updated = await Blog.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updated) {
      return Response.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return Response.json(updated);

  } catch (err) {
    console.error("PUT ERROR:", err);
    return Response.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}

// ✅ DELETE (already correct)
export async function DELETE(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const deleted = await Blog.findByIdAndDelete(id);

    if (!deleted) {
      return Response.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true });

  } catch (err) {
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}