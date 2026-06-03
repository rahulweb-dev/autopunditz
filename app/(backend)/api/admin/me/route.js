import { requireAuth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const { payload, error } = await requireAuth();

  if (error) return error;

  return NextResponse.json({
    success: true,
    user: {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    },
  });
}
