import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import { requireAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {

  const { error } = await requireAdmin();
  if (error) return error;

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