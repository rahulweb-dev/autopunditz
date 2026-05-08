import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";

// =========================
// ✅ GET ALL CONTACTS
// =========================
export async function GET() {

  try {

    await connectDB();

    const contacts =
      await Contact.find()
        .sort({
          createdAt: -1,
        });

    return NextResponse.json({
      success: true,
      contacts,
    });

  } catch (error) {

    console.log(
      "GET CONTACT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch contacts",
      },
      {
        status: 500,
      }
    );
  }
}

// =========================
// ✅ CREATE CONTACT
// =========================
export async function POST(req) {

  try {

    await connectDB();

    const body =
      await req.json();

    let {
      name,
      email,
      phone,
      message,
    } = body;

    // ✅ TRIM
    name = name?.trim();
    email = email?.trim();
    phone = phone?.trim();
    message = message?.trim();

    // =========================
    // ✅ VALIDATIONS
    // =========================

    // NAME
    if (!name) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Name is required",
        },
        {
          status: 400,
        }
      );
    }

    // EMAIL
    if (!email) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Email is required",
        },
        {
          status: 400,
        }
      );
    }

    // EMAIL FORMAT
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(email)
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid email address",
        },
        {
          status: 400,
        }
      );
    }

    // PHONE
    if (!phone) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Phone number is required",
        },
        {
          status: 400,
        }
      );
    }

    // PHONE VALIDATION
    if (
      phone.length < 10
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid phone number",
        },
        {
          status: 400,
        }
      );
    }

    // MESSAGE
    if (!message) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Message is required",
        },
        {
          status: 400,
        }
      );
    }

    // MESSAGE LENGTH
    if (
      message.length < 10
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Message should be at least 10 characters",
        },
        {
          status: 400,
        }
      );
    }

    // =========================
    // ✅ SAVE CONTACT
    // =========================

    const contact =
      await Contact.create({
        name,
        email,
        phone,
        message,
      });

    return NextResponse.json({
      success: true,
      message:
        "Message Sent Successfully",
      contact,
    });

  } catch (error) {

    console.log(
      "CONTACT API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}