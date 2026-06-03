import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import Subscriber from "@/models/Subscriber";
import { slugify } from "@/lib/slugify";
import { sendBlogNewsletter } from "@/lib/emailService";
import { notifyGoogleIndexing } from "@/lib/googleIndexing";
import { getBlogUrl } from "@/lib/blogUrl";
import { requireAuth } from "@/lib/auth";

let _lastAutoPublish = 0;

// Auto-publish scheduled posts that are now due (at most once per minute)
async function autoPublish() {
  const now = Date.now();
  if (now - _lastAutoPublish < 60_000) return;
  _lastAutoPublish = now;

  const due = await Blog.find({
    status: "scheduled",
    publishAt: { $lte: new Date() },
  }).select("slug category subCategory").lean();

  if (due.length === 0) return;

  await Blog.updateMany(
    { status: "scheduled", publishAt: { $lte: new Date() } },
    { $set: { status: "published" } }
  );

  for (const blog of due) {
    notifyGoogleIndexing(getBlogUrl(blog), "URL_UPDATED").catch(console.error);
  }
}

// Fire-and-forget: send newsletter + ping Google after first publish
async function onBlogPublished(blog) {
  const [newsletterResult, indexResult] = await Promise.allSettled([
    (async () => {
      const subscribers = await Subscriber.find({ isActive: true }, "email").lean();
      await sendBlogNewsletter(blog, subscribers);
      await Blog.findByIdAndUpdate(blog._id, { newsletterSent: true });
    })(),
    notifyGoogleIndexing(getBlogUrl(blog), "URL_UPDATED"),
  ]);

  if (newsletterResult.status === "rejected")
    console.error("Newsletter error:", newsletterResult.reason);
  if (indexResult.status === "rejected")
    console.error("Google Indexing error:", indexResult.reason);
}

// GET ALL BLOGS — public (returns published + drafts; used by admin dashboard)
export async function GET() {
  try {
    await connectDB();
    await autoPublish();
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .lean();
    return Response.json(blogs);
  } catch (error) {
    console.error("GET blogs error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// CREATE BLOG — requires login
export async function POST(req) {
  const { error } = await requireAuth();
  if (error) return error;

  try {
    await connectDB();

    const body = await req.json();

    const { title, category, subCategory, metaTitle, metaDescription, keywords, ogImage, imageAlt, content, status, publishAt } = body;

    if (!title)       return Response.json({ error: "Title required" }, { status: 400 });
    if (!content)     return Response.json({ error: "Content required" }, { status: 400 });
    if (!category)    return Response.json({ error: "Category required" }, { status: 400 });
    if (!subCategory) return Response.json({ error: "SubCategory required" }, { status: 400 });

    const now = new Date();
    let finalStatus = status || "draft";
    if (publishAt) {
      finalStatus = new Date(publishAt) > now ? "scheduled" : "published";
    }

    const slug = slugify(title);

    const blog = await Blog.create({
      title, metaTitle, metaDescription, keywords, ogImage, imageAlt,
      content, category, subCategory, slug,
      status: finalStatus, publishAt,
    });

    if (finalStatus === "published") {
      onBlogPublished(blog).catch(console.error);
    }

    return Response.json(blog, { status: 201 });
  } catch (error) {
    console.error("POST blog error:", error);
    return Response.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
