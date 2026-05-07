import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {

  await connectDB();

  const {
    email,
    password,
    role,
  } = await req.json();

  const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );

  const admin =
    await Admin.create({
      email,
      password:
        hashedPassword,
      role,
    });

  return NextResponse.json({
    success: true,
    admin,
  });
}