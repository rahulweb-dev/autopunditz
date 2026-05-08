import Image from "next/image";
import Link from "next/link";

import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

function extractImage(html = "") {
  const match = html.match(
    /<img[^>]+src="([^">]+)"/
  );

  return match?.[1] || "/placeholder.jpg";
}

function formatTitle(slug = "") {
  return slug
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}

// ✅ SEO
export async function generateMetadata({
  params,
}) {

  const { id } = await params;

  const title = formatTitle(id);

  return {
    title: `${title} | Sales Analysis`,
    description: `Latest ${title} reports, sales statistics, and automobile market analysis.`,
  };
}

export default async function CategoryPage({
  params,
}) {

  const { id } = await params;

  await connectDB();

  const blogs = await Blog.find({
    category: "Sales",
    subCategory: formatTitle(id),
    status: "published",
  })
    .sort({ createdAt: -1 })
    .lean();

  const pageTitle = formatTitle(id);

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white min-h-screen">

      {/* HERO */}
      <div className="relative overflow-hidden">

        <div className="absolute inset-0 bg-black/60 z-10" />

        <Image
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1800&auto=format&fit=crop"
          alt={pageTitle}
          width={1800}
          height={800}
          priority
          className="w-full h-[320px] md:h-[420px] object-cover"
        />

        <div className="absolute inset-0 z-20 flex items-center">

          <div className="max-w-7xl mx-auto px-4 w-full">

            <div className="max-w-3xl">

              <span className="bg-white/10 border border-white/20 backdrop-blur-md text-white px-4 py-1 rounded-full text-sm inline-block mb-5">

                Automobile Industry Reports

              </span>

              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-5">

                {pageTitle}

              </h1>

              <p className="text-white/80 text-base md:text-lg leading-relaxed">

                Explore the latest {pageTitle.toLowerCase()} reports,
                sales performance, registration data,
                and automobile market insights.

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-14">

        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

          <div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">

              Latest Reports

            </h2>

            <p className="text-gray-500">

              {blogs.length} published articles available

            </p>

          </div>

          <div className="flex items-center gap-3">

            <div className="bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium border border-red-100">

              Updated Daily

            </div>

          </div>

        </div>

        {/* EMPTY */}
        {!blogs.length && (

          <div className="bg-white rounded-3xl border shadow-sm py-24 text-center">

            <div className="w-20 h-20 rounded-full bg-gray-100 mx-auto flex items-center justify-center mb-6 text-4xl">

              📊

            </div>

            <h2 className="text-3xl font-bold mb-3">

              No Reports Found

            </h2>

            <p className="text-gray-500 max-w-md mx-auto">

              No published reports are available
              in this category right now.

            </p>

          </div>

        )}

        {/* BLOG GRID */}
        {!!blogs.length && (

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">

            {blogs.map((item, index) => (

              <Link
                key={item.slug}
                href={`/sales-analysis/${id}/${item.slug}`}
                className="group"
              >

                <article className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500">

                  {/* IMAGE */}
                  <div className="relative aspect-video overflow-hidden">

                    <Image
                      src={extractImage(item.content)}
                      fill
                      alt={item.title}
                      className="object-cover group-hover:scale-110 transition duration-700"
                    />

                    {/* CATEGORY BADGE */}
                    <div className="absolute top-4 left-4">

                      <span className="bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full">

                        Sales Analysis

                      </span>

                    </div>

                    {/* NUMBER */}
                    <div className="absolute top-4 right-4">

                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-semibold">

                        {index + 1}

                      </div>

                    </div>

                  </div>

                  {/* CONTENT */}
                  <div className="p-6">

                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">

                      <span>

                        {new Date(
                          item.createdAt
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}

                      </span>

                      <span>•</span>

                      <span>
                        Market Report
                      </span>

                    </div>

                    <h2 className="text-xl font-bold leading-snug line-clamp-2 mb-4 group-hover:text-red-500 transition">

                      {item.title}

                    </h2>

                    <div className="flex items-center justify-between">

                      <span className="text-sm text-gray-500">

                        Read Full Analysis

                      </span>

                      <div className="w-11 h-11 rounded-full bg-gray-100 group-hover:bg-red-500 text-black group-hover:text-white flex items-center justify-center transition">

                        →

                      </div>

                    </div>

                  </div>

                </article>

              </Link>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}