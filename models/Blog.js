import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, default: "News" },

    status: {
      type: String,
      enum: ["draft", "published", "pending", "scheduled", "trash"],
      default: "draft",
    },

    publishAt: { type: Date, default: null },

    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);