import { connectDB } from "@/lib/db";
import Subscriber from "@/models/Subscriber";

/**
 * POST /api/subscribers/import
 * Body: { emails: ["a@b.com", "c@d.com", ...] }
 * or CSV text:  { csv: "email1\nemail2\n..." }
 *
 * Use this to bulk-import your 2000 email list.
 */
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    let emailList = [];

    if (Array.isArray(body.emails)) {
      emailList = body.emails;
    } else if (typeof body.csv === "string") {
      // Parse CSV/plain-text — one email per line, comma-separated, or semicolon-separated
      emailList = body.csv
        .split(/[\n,;]+/)
        .map((e) => e.trim())
        .filter((e) => e.includes("@"));
    } else {
      return Response.json(
        { error: "Provide emails array or csv string" },
        { status: 400 }
      );
    }

    // Validate and deduplicate
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = [...new Set(emailList.map((e) => e.toLowerCase()))].filter(
      (e) => emailRegex.test(e)
    );

    if (valid.length === 0) {
      return Response.json({ error: "No valid emails found" }, { status: 400 });
    }

    // Bulk upsert — insert new, skip duplicates
    const ops = valid.map((email) => ({
      updateOne: {
        filter: { email },
        update: { $setOnInsert: { email, isActive: true } },
        upsert: true,
      },
    }));

    const result = await Subscriber.bulkWrite(ops);

    return Response.json({
      message: "Import complete",
      inserted: result.upsertedCount,
      alreadyExisted: result.matchedCount,
      total: valid.length,
    });
  } catch (err) {
    console.error("Import error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
