import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title:           { type: String, required: true, trim: true },
    content:         { type: String, required: true },
    category:        { type: String, default: "News" },
    subCategory:     { type: String, default: "Two wheeler", required: true },
    metaTitle:       { type: String, required: true, trim: true },
    metaDescription: { type: String, required: true, trim: true },
    keywords:        { type: String, required: true, trim: true },
    ogImage:         { type: String, default: "/default-news.jpg" },
    imageAlt:        { type: String, default: "" },
    slug:            { type: String, required: true, unique: true, lowercase: true, trim: true },
    status: {
      type: String,
      enum: ["draft", "published", "pending", "scheduled", "trash"],
      default: "draft",
    },
    publishAt:      { type: Date, default: null },
    views:          { type: Number, default: 0 },
    likes:          { type: Number, default: 0 },
    newsletterSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ── Indexes ─────────────────────────────────────────────────────────────────
// slug is already unique (auto-indexed by Mongoose)
BlogSchema.index({ status: 1, createdAt: -1 });          // list by status
BlogSchema.index({ status: 1, publishAt: 1 });            // auto-publish scheduler
BlogSchema.index({ category: 1, status: 1, createdAt: -1 });      // category filter
BlogSchema.index({ subCategory: 1, status: 1, createdAt: -1 });   // subcategory filter
BlogSchema.index({ status: 1, newsletterSent: 1 });       // newsletter check
// Full-text search on title, keywords, category, subCategory
BlogSchema.index(
  { title: "text", keywords: "text", category: "text", subCategory: "text" },
  { weights: { title: 10, keywords: 5, category: 2, subCategory: 2 } }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
