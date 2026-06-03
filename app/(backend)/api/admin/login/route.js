import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {

  await connectDB();

  const {
    email,
    password,
  } = await req.json();

  // ✅ Find User
  const admin =
    await Admin.findOne({
      email,
    });

  if (!admin) {

    return NextResponse.json(
      {
        success: false,
        message:
          "Invalid Email",
      },
      { status: 401 }
    );
  }

  // ✅ Check Password
  const isMatch =
    await bcrypt.compare(
      password,
      admin.password
    );

  if (!isMatch) {

    return NextResponse.json(
      {
        success: false,
        message:
          "Wrong Password",
      },
      { status: 401 }
    );
  }

  // ✅ Create JWT
  const token = jwt.sign(
    {
      id: admin._id,
      email: admin.email,
      role: admin.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  // ✅ Response
  const response =
    NextResponse.json({
      success: true,
      role: admin.role,
      message:
        "Login Success",
    });

  // ✅ Set Cookie
  response.cookies.set(
    "token",
    token,
    {
      httpOnly: true,

      secure: process.env.NODE_ENV === "production",

      sameSite: "lax",

      path: "/",

      maxAge:
        60 *
        60 *
        24 *
        7,
    }
  );

  return response;
}