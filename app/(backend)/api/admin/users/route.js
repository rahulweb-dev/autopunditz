import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";

export async function GET() {

  await connectDB();

  const users =
    await Admin.find()
      .select("-password")
      .sort({
        createdAt: -1,
      });

  return NextResponse.json(
    users
  );
}