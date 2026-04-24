// app/api/auth/login/route.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const { email, password } = await req.json();
  console.log("Login attempt:", email);

  const user = await User.findOne({ email });
  if (!user) {
    console.log("❌ User not found");
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log("Password match:", isMatch);

  if (!isMatch) {
    console.log("❌ Wrong password");
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  const res = NextResponse.json({ success: true });
  res.cookies.set("token", token, { httpOnly: true });

  return res;
}