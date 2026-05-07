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

export default function EditorialsPage() {

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

  // ✅ LOADING
  if (isLoading && !blogs.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">

        <p className="text-lg font-medium">
          Loading Editorials...
        </p>

      </div>
    );
  }

  return (

    <section className="bg-gradient-to-b from-gray-50 to-white min-h-screen">

      {/* HERO */}

      <div className="relative overflow-hidden">

        <div className="absolute inset-0 bg-black/60 z-10" />

        <Image
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1800&auto=format&fit=crop"
          alt="Editorials"
          width={1800}
          height={900}
          priority
          className="w-full h-[320px] md:h-[450px] object-cover"
        />

        <div className="absolute inset-0 z-20 flex items-center">

          <div className="max-w-7xl mx-auto px-4 w-full">

            <div className="max-w-3xl">

              <span className="bg-white/10 border border-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm inline-block mb-6">

                Automotive Editorials

              </span>

              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-5">

                Industry Opinions,
                <br />
                Insights & Analysis

              </h1>

              <p className="text-white/80 text-base md:text-lg leading-relaxed">

                Explore expert perspectives,
                deep industry analysis,
                automobile market insights,
                and editorial opinions from
                our automotive newsroom.

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* CONTENT */}

      <div className="max-w-7xl mx-auto px-4 py-14">

        {/* TOP */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">

          <div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">

              Latest Editorials

            </h2>

            <p className="text-gray-500">

              {editorials.length} published editorials available

            </p>

          </div>

          <div className="bg-red-50 text-red-600 border border-red-100 px-5 py-2 rounded-full text-sm font-medium">

            Updated Daily

          </div>

        </div>

        {/* EMPTY */}

        {!editorials.length && (

          <div className="bg-white rounded-3xl border shadow-sm py-24 text-center">

            <div className="text-6xl mb-6">
              📰
            </div>

            <h3 className="text-3xl font-bold mb-3">

              No Editorials Found

            </h3>

            <p className="text-gray-500">

              No editorial articles available right now.

            </p>

          </div>

        )}

        {/* GRID */}

        {!!editorials.length && (

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">

            {editorials.map((item, index) => (

              <Link
                key={item.slug}
                href={`/editorials/${item.slug}`}
                className="group"
              >

                <article className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500">

                  {/* IMAGE */}

                  <div className="relative aspect-video overflow-hidden">

                    <Image
                      src={extractImage(
                        item.content
                      )}
                      fill
                      alt={item.title}
                      className="object-cover group-hover:scale-110 transition duration-700"
                    />

                    {/* CATEGORY */}

                    <div className="absolute top-4 left-4">

                      <span className="bg-black/70 backdrop-blur-md text-white text-xs px-4 py-2 rounded-full uppercase tracking-wide">

                        Editorial

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

                        {item.author ||
                          "Editorial Team"}

                      </span>

                      <span>•</span>

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

                    </div>

                    <h3 className="text-xl font-bold leading-snug line-clamp-2 mb-4 group-hover:text-red-500 transition">

                      {item.title}

                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-3 mb-6">

                      {item.content
                        ?.replace(
                          /<[^>]+>/g,
                          ""
                        )
                        ?.slice(0, 120)}

                      ...

                    </p>

                    <div className="flex items-center justify-between">

                      <span className="text-sm text-gray-500">

                        Read Full Editorial

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