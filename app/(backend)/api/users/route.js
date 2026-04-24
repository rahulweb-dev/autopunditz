// app/api/users/route.js

import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await connectDB();

  try {
    // ✅ Get token from cookies
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Only admin can create users
    if (decoded.role !== "admin") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const { name, email, password, role } = await req.json();

    // ❌ Validate fields
    if (!name || !email || !password) {
      return Response.json({ error: "All fields required" }, { status: 400 });
    }

    // ❌ Prevent duplicate users
    const existing = await User.findOne({ email });
    if (existing) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    // ❌ Prevent creating admin accidentally
    if (role === "admin") {
      return Response.json(
        { error: "Cannot create admin from API" },
        { status: 403 }
      );
    }

    // ✅ Hash password
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || "writer",
    });

    return Response.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}