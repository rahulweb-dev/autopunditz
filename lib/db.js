import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connection.readyState) return;
  await mongoose.connect(process.env.MONGO_URI);
}