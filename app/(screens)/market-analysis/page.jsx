import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 300;

function extractImage(html) {
  if (!html) return "/placeholder.jpg";
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : "/placeholder.jpg";
}

export default async function MarketAnalysisPage() {
  let analyses = [];
  try {
    await connectDB();
    const raw = await Blog.find({
      status: "published",
      category: { $regex: /^marketanalysis$/i },
      subCategory: { $regex: /^marketanalysis$/i },
    })
      .sort({ createdAt: -1 })
      .limit(50)
      .select("title slug content createdAt ogImage")
      .lean();

    analyses = raw.map((b) => ({
      _id: b._id.toString(),
      title: b.title,
      slug: b.slug,
      content: b.content,
      createdAt: b.createdAt?.toISOString() ?? null,
      ogImage: b.ogImage || null,
    }));
  } catch {
    // DB unreachable — render empty state below
  }

  if (!analyses.length) {
    return <p className="text-center py-20">No Market Analysis found</p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Market Analysis</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {analyses.map((item) => (
          <Link key={item.slug} href={`/market-analysis/${item.slug}`}>
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md">
              <div className="relative aspect-video">
                <Image
                  src={item.ogImage || extractImage(item.content)}
                  fill
                  alt={item.title}
                  className="object-cover rounded-t-xl"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(item.createdAt).toDateString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
