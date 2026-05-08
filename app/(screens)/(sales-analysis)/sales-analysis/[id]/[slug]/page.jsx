import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

// ✅ EXTRACT IMAGE

function extractImage(html = "") {

  const match = html.match(
    /<img[^>]+src="([^">]+)"/
  );

  return match?.[1] || "/placeholder.jpg";
}

// ✅ FORMAT TITLE

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

// ✅ SEO META

export async function generateMetadata({
  params,
}) {

  const { id, slug } =
    await params;

  await connectDB();

  const blog = await Blog.findOne({
    slug: slug,
    category: "Sales",
    subCategory: formatTitle(id),
    status: "published",
  });

  if (!blog) {

    return {
      title: "Blog Not Found",
    };

  }

  return {
    title: `${blog.title} | Sales Analysis`,
    description:
      blog.content
        ?.replace(/<[^>]+>/g, "")
        ?.slice(0, 160),
  };
}

// ✅ PAGE

export default async function BlogPage({
  params,
}) {

  const { id, slug } =
    await params;

  await connectDB();

  // ✅ FETCH BLOG

  const blog = await Blog.findOne({
    slug: slug,
    category: "Sales",
    subCategory: formatTitle(id),
    status: "published",
  }).lean();

  if (!blog) {
    notFound();
  }

  // ✅ RELATED BLOGS

  const relatedBlogs =
    await Blog.find({
      slug: {
        $ne: blog.slug,
      },
      category: "Sales",
      subCategory:
        formatTitle(id),
      status: "published",
    })
      .sort({
        createdAt: -1,
      })
      .limit(3)
      .lean();

  const image = extractImage(
    blog.content
  );

  return (

    <section className="bg-gradient-to-b from-gray-50 to-white min-h-screen">

      {/* HERO */}

      <div className="relative h-[350px] md:h-[550px] overflow-hidden">

        {/* IMAGE */}

        <Image
          src={image}
          alt={blog.title}
          fill
          priority
          className="object-cover"
        />

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

        {/* CONTENT */}

        <div className="absolute inset-0 z-20 flex items-end">

          <div className="max-w-6xl mx-auto px-4 pb-12 w-full">

            {/* BREADCRUMB */}

            <div className="flex items-center gap-2 text-sm text-white/70 mb-5">

              <Link
                href="/sales-analysis"
                className="hover:text-white transition"
              >

                Sales Analysis

              </Link>

              <span>/</span>

              <Link
                href={`/sales-analysis/${id}`}
                className="hover:text-white transition"
              >

                {formatTitle(id)}

              </Link>

            </div>

            {/* CATEGORY */}

            <div className="mb-5">

              <span
                className="
                  bg-red-500
                  text-white
                  text-xs
                  uppercase
                  tracking-wider
                  px-4
                  py-2
                  rounded-full
                "
              >

                Sales Report

              </span>

            </div>

            {/* TITLE */}

            <h1
              className="
                text-3xl
                md:text-6xl
                font-bold
                text-white
                leading-tight
                max-w-5xl
                mb-6
              "
            >

              {blog.title}

            </h1>

            {/* META */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-4
                text-white/80
                text-sm
                md:text-base
              "
            >

              <span>

                {new Date(
                  blog.createdAt
                ).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}

              </span>

              <span>•</span>

              <span>

                Automobile Market Analysis

              </span>

            </div>

          </div>

        </div>

      </div>

      {/* CONTENT */}

      <div className="max-w-7xl mx-auto px-4 py-14">

        <div className="grid lg:grid-cols-12 gap-10">

          {/* ARTICLE */}

          <div className="lg:col-span-8">

            <article
              className="
                bg-white
                rounded-3xl
                shadow-sm
                border
                border-gray-100
                p-6
                md:p-10
              "
            >

              <div
                className="
                  prose
                  prose-lg
                  max-w-none
                  prose-img:rounded-2xl
                  prose-headings:font-bold
                  prose-p:text-gray-700
                  prose-a:text-red-500
                "
                dangerouslySetInnerHTML={{
                  __html:
                    blog.content,
                }}
              />

            </article>

          </div>

          {/* SIDEBAR */}

          <aside className="lg:col-span-4">

            {/* AUTHOR */}

            <div
              className="
                bg-white
                rounded-3xl
                border
                border-gray-100
                shadow-sm
                p-6
                mb-8
              "
            >

              <div className="flex items-center gap-4 mb-5">

                <div
                  className="
                    w-14
                    h-14
                    rounded-full
                    bg-red-500
                    text-white
                    flex
                    items-center
                    justify-center
                    text-xl
                    font-bold
                  "
                >

                  A

                </div>

                <div>

                  <h3 className="font-semibold text-lg">

                    Auto Editorial Team

                  </h3>

                  <p className="text-sm text-gray-500">

                    Market Insights & Reports

                  </p>

                </div>

              </div>

              <p
                className="
                  text-gray-600
                  text-sm
                  leading-relaxed
                "
              >

                Latest automobile sales analysis,
                registration trends,
                EV growth,
                and industry market reports.

              </p>

            </div>

            {/* RELATED BLOGS */}

            <div
              className="
                bg-white
                rounded-3xl
                border
                border-gray-100
                shadow-sm
                p-6
              "
            >

              <h3 className="text-2xl font-bold mb-6">

                Related Reports

              </h3>

              <div className="space-y-5">

                {relatedBlogs.map(
                  (item) => (

                    <Link
                      key={item.slug}
                      href={`/sales-analysis/${id}/${item.slug}`}
                      className="group flex gap-4"
                    >

                      {/* IMAGE */}

                      <div
                        className="
                          relative
                          w-28
                          h-24
                          rounded-2xl
                          overflow-hidden
                          flex-shrink-0
                        "
                      >

                        <Image
                          src={extractImage(
                            item.content
                          )}
                          fill
                          alt={item.title}
                          className="
                            object-cover
                            group-hover:scale-105
                            transition
                          "
                        />

                      </div>

                      {/* CONTENT */}

                      <div>

                        <h4
                          className="
                            font-semibold
                            line-clamp-2
                            group-hover:text-red-500
                            transition
                          "
                        >

                          {item.title}

                        </h4>

                        <p className="text-sm text-gray-500 mt-2">

                          {new Date(
                            item.createdAt
                          ).toLocaleDateString(
                            "en-IN"
                          )}

                        </p>

                      </div>

                    </Link>

                  )
                )}

              </div>

            </div>

          </aside>

        </div>

      </div>

    </section>
  );
}