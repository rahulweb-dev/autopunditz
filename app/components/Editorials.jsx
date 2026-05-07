"use client";

import Image from "next/image";
import Link from "next/link";
import useBlogs from "@/hooks/useBlogs";
import { useMemo } from "react";

function extractImage(html = "") {
  const match = html.match(
    /<img[^>]+src="([^">]+)"/
  );

  return match?.[1] || "/placeholder.jpg";
}

export default function Editorials() {

  const { blogs, isLoading } = useBlogs();

  // ✅ FILTER EDITORIALS
  const editorials = useMemo(() => {

    return blogs
      .filter(
        (blog) =>
          blog?.category === "Editorials" &&
          blog?.subCategory === "editorials" &&
          blog?.status === "published"
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );

  }, [blogs]);

  const featured = editorials[0];

  // ✅ LOADING
  if (isLoading && !blogs.length) {
    return (
      <p className="text-center py-20">
        Loading Editorials...
      </p>
    );
  }

  return (

    <section className="bg-gradient-to-b from-gray-50 to-white py-14">

      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">

          <div>

            <span className="text-red-500 uppercase tracking-widest text-sm font-semibold">

              Opinions & Insights

            </span>

            <h2 className="text-3xl md:text-5xl font-bold mt-3">

              Editorials

            </h2>

            <p className="text-gray-500 mt-3 max-w-2xl">

              Deep dives, expert opinions,
              automobile industry analysis,
              and editorial perspectives.

            </p>

          </div>

          <Link
            href="/editorials"
            className="text-red-500 font-semibold hover:text-red-600 transition"
          >
            Explore Editorials →
          </Link>

        </div>

        {/* EMPTY */}

        {editorials.length === 0 ? (

          <div className="bg-white rounded-3xl border shadow-sm py-20 text-center">

            <div className="text-5xl mb-5">
              📰
            </div>

            <h3 className="text-3xl font-bold mb-3">

              No Editorials Found

            </h3>

            <p className="text-gray-500">

              No editorial articles are available right now.

            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* FEATURED */}

            {featured && (

              <Link
                href={`/editorials/${featured.slug}`}
                className="lg:col-span-2 group"
              >

                <article className="relative h-[350px] md:h-[520px] rounded-3xl overflow-hidden shadow-xl">

                  {/* IMAGE */}

                  <Image
                    src={extractImage(
                      featured.content
                    )}
                    fill
                    priority
                    alt={featured.title}
                    className="object-cover group-hover:scale-105 transition duration-700"
                  />

                  {/* OVERLAY */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                  {/* CONTENT */}

                  <div className="absolute bottom-0 p-6 md:p-10 text-white">

                    <span className="bg-red-500 text-white text-xs uppercase tracking-widest px-4 py-2 rounded-full">

                      Editorials

                    </span>

                    <h3 className="text-2xl md:text-4xl font-bold leading-tight mt-5 max-w-3xl">

                      {featured.title}

                    </h3>

                    <div className="flex items-center gap-3 mt-5 text-sm text-white/70">

                      <span>
                        {featured.author ||
                          "Editorial Team"}
                      </span>

                      <span>•</span>

                      <span>

                        {new Date(
                          featured.createdAt
                        ).toDateString()}

                      </span>

                    </div>

                    <p className="text-white/80 mt-5 max-w-2xl line-clamp-2">

                      {featured.content
                        ?.replace(
                          /<[^>]+>/g,
                          ""
                        )
                        ?.slice(0, 160)}

                      ...

                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 text-red-400 font-semibold">

                      Read Editorial →

                    </div>

                  </div>

                </article>

              </Link>

            )}

            {/* SIDE ARTICLES */}

            <div className="flex flex-col">

              <div className="h-[520px] overflow-y-auto space-y-5 pr-2">

                {editorials
                  .slice(1)
                  .map((item) => (

                    <Link
                      key={item._id}
                      href={`/editorials/${item._id}`}
                      className="group"
                    >

                      <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition overflow-hidden">

                        <div className="flex gap-4 p-4">

                          {/* IMAGE */}

                          <div className="relative w-28 h-24 rounded-xl overflow-hidden flex-shrink-0">

                            <Image
                              src={extractImage(
                                item.content
                              )}
                              fill
                              alt={item.title}
                              className="object-cover group-hover:scale-105 transition"
                            />

                          </div>

                          {/* CONTENT */}

                          <div className="flex-1">

                            <span className="text-red-500 text-xs uppercase tracking-wide font-semibold">

                              Editorial

                            </span>

                            <h3 className="font-bold line-clamp-2 mt-1 group-hover:text-red-500 transition">

                              {item.title}

                            </h3>

                            <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">

                              <span>

                                {item.author ||
                                  "Editorial Team"}

                              </span>

                              <span>•</span>

                              <span>

                                {new Date(
                                  item.createdAt
                                ).toLocaleDateString(
                                  "en-IN"
                                )}

                              </span>

                            </div>

                          </div>

                        </div>

                      </article>

                    </Link>

                  ))}

              </div>


            </div>

          </div>

        )}

      </div>

    </section>

  );
}