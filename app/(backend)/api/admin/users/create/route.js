import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import { requireAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {

  const { error } = await requireAdmin();
  if (error) return error;

  try {

    await connectDB();

    const {
      name,
      email,
      password,
      role,
    } = await req.json();

    // ✅ Check Existing
    const existing =
      await Admin.findOne({
        email,
      });

    if (existing) {

      return NextResponse.json(
        {
          success: false,
          message:
            "User already exists",
        },
        {
          status: 400,
        }
      );
    }

    // ✅ Hash Password
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // ✅ Create User
    const user =
      await Admin.create({
        name,
        email,
        password:
          hashedPassword,
        role,
      });

    return NextResponse.json({
      success: true,
      user,
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message:
          error.message,
      },
      {
        status: 500,
      }
    );
  }
}