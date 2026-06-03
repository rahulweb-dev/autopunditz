import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import NewsGrid from "@/app/components/NewsGrid";

export const revalidate = 300;

export default async function BikesPage() {
  let bikes = [];
  try {
    await connectDB();
    const raw = await Blog.find({
      status: "published",
      category: { $regex: /^news$/i },
      subCategory: { $regex: /^bikes$/i },
    })
      .sort({ createdAt: -1 })
      .limit(50)
      .select("title slug content createdAt ogImage")
      .lean();

    bikes = raw.map((b) => ({
      _id: b._id.toString(),
      title: b.title,
      slug: b.slug,
      content: b.content,
      createdAt: b.createdAt?.toISOString() ?? null,
      image: b.ogImage || null,
    }));
  } catch {
    // DB unreachable — render empty grid
  }

  return (
    <NewsGrid
      title="Bikes News"
      subtitle="Latest bikes updates and news"
      data={bikes}
      basePath="/bikes"
    />
  );
}
