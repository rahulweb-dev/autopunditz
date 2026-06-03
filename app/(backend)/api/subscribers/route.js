import { connectDB } from "@/lib/db";
import Subscriber from "@/models/Subscriber";

// GET /api/subscribers — list all subscribers
export async function GET() {
  try {
    await connectDB();
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    return Response.json({
      total: subscribers.length,
      active: subscribers.filter((s) => s.isActive).length,
      subscribers,
    });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

// POST /api/subscribers — add single subscriber
export async function POST(req) {
  try {
    await connectDB();

    const { email, name } = await req.json();

    if (!email) {
      return Response.json({ error: "Email required" }, { status: 400 });
    }

    const existing = await Subscriber.findOne({ email: email.toLowerCase() });

    if (existing) {
      if (!existing.isActive) {
        existing.isActive = true;
        await existing.save();
        return Response.json({ message: "Re-subscribed successfully" });
      }
      return Response.json(
        { error: "Email already subscribed" },
        { status: 409 }
      );
    }

    const subscriber = await Subscriber.create({ email, name });

    return Response.json(subscriber, { status: 201 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
