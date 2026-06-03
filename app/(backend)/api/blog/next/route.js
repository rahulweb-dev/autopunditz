import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const category = searchParams.get("category");
  const subCategory = searchParams.get("subCategory");
  const loaded = searchParams.getAll("loaded"); // already-seen slugs to skip

  if (!slug) return Response.json(null);

  await connectDB();

  const current = await Blog.findOne({ slug }).select("createdAt").lean();
  if (!current) return Response.json(null);

  const exclude = [...loaded, slug];

  const base = { slug: { $nin: exclude }, status: "published" };
  if (category) base.category = category;
  if (subCategory) base.subCategory = subCategory;

  // prefer older articles first (chronological "next")
  let next = await Blog.findOne({
    ...base,
    createdAt: { $lt: current.createdAt },
  })
    .sort({ createdAt: -1 })
    .lean();

  // wrap around to newest if nothing older remains
  if (!next) {
    next = await Blog.findOne(base).sort({ createdAt: -1 }).lean();
  }

  if (!next) return Response.json(null);

  return Response.json(
    {
      _id: next._id.toString(),
      slug: next.slug,
      title: next.title,
      metaTitle: next.metaTitle || null,
      imageAlt: next.imageAlt || null,
      ogImage: next.ogImage || null,
      content: next.content || "",
      subCategory: next.subCategory || null,
      category: next.category || null,
      createdAt: next.createdAt?.toISOString?.() ?? null,
    },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } }
  );
}
