import { connectDB } from "@/lib/db";
import Subscriber from "@/models/Subscriber";

// GET /api/unsubscribe?email=xxx  (called from email link)
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return Response.json({ error: "Email required" }, { status: 400 });
    }

    await Subscriber.findOneAndUpdate(
      { email: email.toLowerCase() },
      { isActive: false }
    );

    // Redirect to a confirmation page
    return Response.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?done=1`,
      302
    );
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

// POST /api/unsubscribe  { email }
export async function POST(req) {
  try {
    await connectDB();

    const { email } = await req.json();

    if (!email) {
      return Response.json({ error: "Email required" }, { status: 400 });
    }

    await Subscriber.findOneAndUpdate(
      { email: email.toLowerCase() },
      { isActive: false }
    );

    return Response.json({ message: "Unsubscribed successfully" });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
