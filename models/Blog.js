import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, default: "News" },
    subCategory: {
      type: String,
      default:"Two wheeler",
      required: true,
    },
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