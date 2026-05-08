import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";

export async function DELETE(
  req,
  context
) {

  try {

    await connectDB();

    // ✅ NEXT 15 FIX
    const { id } =
      await context.params;

    console.log(
      "DELETE USER:",
      id
    );

    const deletedUser =
      await Admin.findByIdAndDelete(
        id
      );

    if (!deletedUser) {

      return NextResponse.json(
        {
          success: false,
          message:
            "User not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "User deleted successfully",
    });

  } catch (error) {

    console.log(error);

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