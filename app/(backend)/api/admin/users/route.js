import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import { requireAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {

  const { error } = await requireAdmin();
  if (error) return error;

  await connectDB();

  const users = await Admin.find()
    .select("-password")
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(
    users
  );
}