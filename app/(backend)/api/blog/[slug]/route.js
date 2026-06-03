import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import Subscriber from "@/models/Subscriber";
import { sendBlogNewsletter } from "@/lib/emailService";
import { notifyGoogleIndexing } from "@/lib/googleIndexing";
import { getBlogUrl } from "@/lib/blogUrl";
import { requireAuth } from "@/lib/auth";

async function onBlogPublished(blog) {
  try {
    const subscribers = await Subscriber.find({ isActive: true }, "email").lean();
    await sendBlogNewsletter(blog, subscribers);
    await Blog.findByIdAndUpdate(blog._id, { newsletterSent: true });
  } catch (err) {
    console.error("Newsletter error:", err);
  }
  try {
    await notifyGoogleIndexing(getBlogUrl(blog), "URL_UPDATED");
  } catch (err) {
    console.error("Google Indexing error:", err);
  }
}

// GET SINGLE BLOG — public
export async function GET(_req, { params }) {
  try {
    await connectDB();
    const { slug } = await params;
    const blog = await Blog.findOne({ slug: slug.trim() }).lean();
    if (!blog) return Response.json({ error: "Blog not found" }, { status: 404 });
    return Response.json(blog, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch (err) {
    console.error("GET blog error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// UPDATE BLOG — requires login
export async function PUT(req, { params }) {
  const { error } = await requireAuth();
  if (error) return error;

  try {
    await connectDB();
    const { slug } = await params;
    const body = await req.json();

    const oldBlog = await Blog.findOne({ slug: slug.trim() });
    if (!oldBlog) return Response.json({ error: "Blog not found" }, { status: 404 });

    const updated = await Blog.findOneAndUpdate(
      { slug: slug.trim() },
      {
        title: body.title,
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
        keywords: body.keywords,
        ogImage: body.ogImage,
        imageAlt: body.imageAlt,
        content: body.content,
        category: body.category,
        subCategory: body.subCategory,
        slug: slug.trim(),
        status: body.status,
        publishAt: body.publishAt,
      },
      { new: true, runValidators: true }
    );

    const justPublished =
      body.status === "published" &&
      oldBlog.status !== "published" &&
      !oldBlog.newsletterSent;

    if (justPublished) {
      onBlogPublished(updated).catch(console.error);
    } else if (body.status === "published") {
      notifyGoogleIndexing(getBlogUrl(updated), "URL_UPDATED").catch(console.error);
    }

    return Response.json(updated);
  } catch (err) {
    console.error("PUT blog error:", err);
    return Response.json({ error: err.message || "Update failed" }, { status: 500 });
  }
}

// DELETE BLOG — requires login
export async function DELETE(_req, { params }) {
  const { error } = await requireAuth();
  if (error) return error;

  try {
    await connectDB();
    const { slug } = await params;
    const deleted = await Blog.findOneAndDelete({ slug: slug.trim() });
    if (!deleted) return Response.json({ error: "Blog not found" }, { status: 404 });
    notifyGoogleIndexing(getBlogUrl(deleted), "URL_DELETED").catch(console.error);
    return Response.json({ success: true });
  } catch (err) {
    console.error("DELETE blog error:", err);
    return Response.json({ error: "Delete failed" }, { status: 500 });
  }
}
