"use client";

import Image from "next/image";
import Link from "next/link";
import useBlogs from "@/hooks/useBlogs";

function extractImage(html) {
  if (!html) return "/placeholder.jpg";
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : "/placeholder.jpg";
}

export default function MarketAnalysisPage() {
  const { blogs, isLoading } = useBlogs();

  const analyses = blogs
    .filter(
      (blog) =>
        blog?.category?.toLowerCase() ===
        "marketanalysis" &&
        blog?.subCategory?.toLowerCase() ===
        "marketanalysis"
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );

  if (isLoading) return <p>Loading...</p>;
  if (!analyses.length) return <p>No Market Analysis found</p>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold mb-8">
        Market Analysis
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {analyses.map((item, i) => (

          <Link key={i} href={`/market-analysis/${item._id}`}>

            <div className="bg-white rounded-xl shadow-sm hover:shadow-md">

              <div className="relative aspect-video">
                <Image
                  src={extractImage(item.content)}
                  fill
                  alt={item.title}
                  className="object-cover rounded-t-xl"
                />
              </div>

              <div className="p-4">

                <h3 className="font-semibold line-clamp-2">
                  {item.title}
                </h3>

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