const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

const MONGO_URI =
  "mongodb+srv://rahulwebdeveloper12_db_user:0wpdj7bdhoZRGHBO@autopunditz.vdgypun.mongodb.net/?appName=autopunditz";

const EMAIL = "admin@autopunditz.com";
const PASSWORD = "Admin@123";

async function createAdmin() {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    // Try both possible database names
    const dbNames = ["test", "autopunditz"];
    let targetDb = null;
    let targetCollection = null;

    for (const dbName of dbNames) {
      const db = client.db(dbName);
      const collections = await db
        .listCollections({ name: "admins" })
        .toArray();
      if (collections.length > 0) {
        targetDb = db;
        targetCollection = db.collection("admins");
        console.log(`📦 Found 'admins' collection in database: ${dbName}`);
        break;
      }
    }

    // If not found in existing dbs, use 'test' (Mongoose default)
    if (!targetCollection) {
      console.log(
        "📦 'admins' collection not found — creating in 'test' database (Mongoose default)"
      );
      targetDb = client.db("test");
      targetCollection = targetDb.collection("admins");
    }

    const existing = await targetCollection.findOne({ email: EMAIL });

    const hashedPassword = await bcrypt.hash(PASSWORD, 10);
    const now = new Date();

    if (existing) {
      await targetCollection.updateOne(
        { email: EMAIL },
        { $set: { password: hashedPassword, role: "admin", updatedAt: now } }
      );
      console.log("🔄 Existing admin found — password & role updated.");
    } else {
      await targetCollection.insertOne({
        email: EMAIL,
        password: hashedPassword,
        role: "admin",
        createdAt: now,
        updatedAt: now,
      });
      console.log("🆕 Admin user created successfully!");
    }

    console.log("\n─────────────────────────────────");
    console.log("  LOGIN CREDENTIALS");
    console.log("─────────────────────────────────");
    console.log("  Email   :", EMAIL);
    console.log("  Password:", PASSWORD);
    console.log("─────────────────────────────────\n");
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await client.close();
    console.log("🔌 Disconnected from MongoDB");
  }
}

createAdmin();
