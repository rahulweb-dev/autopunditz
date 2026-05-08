"use client";

import Image from "next/image";
import Link from "next/link";
import useBlogs from "@/hooks/useBlogs";
import { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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
  if (isLoading && !blogs.length) {

    return (

      <section className="bg-gradient-to-b from-gray-50 to-white py-14">

        <div className="max-w-7xl mx-auto px-4">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">

            <div>

              <Skeleton
                height={18}
                width={180}
                borderRadius={8}
              />

              <Skeleton
                height={55}
                width={260}
                className="mt-4"
                borderRadius={10}
              />

              <Skeleton
                height={18}
                width={420}
                className="mt-4"
                borderRadius={8}
              />

              <Skeleton
                height={18}
                width={360}
                className="mt-2"
                borderRadius={8}
              />

            </div>

            <Skeleton
              height={20}
              width={180}
              borderRadius={8}
            />

          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* FEATURED */}
            <div className="lg:col-span-2">

              <div className="relative h-[350px] md:h-[520px] rounded-3xl overflow-hidden">

                {/* IMAGE */}
                <Skeleton
                  height="100%"
                  width="100%"
                  borderRadius={24}
                />

                {/* CONTENT */}
                <div className="absolute bottom-0 p-6 md:p-10 w-full">

                  <Skeleton
                    height={32}
                    width={120}
                    borderRadius={999}
                  />

                  <Skeleton
                    height={48}
                    width="85%"
                    className="mt-6"
                    borderRadius={10}
                  />

                  <Skeleton
                    height={48}
                    width="65%"
                    className="mt-3"
                    borderRadius={10}
                  />

                  <Skeleton
                    height={18}
                    width={260}
                    className="mt-6"
                    borderRadius={8}
                  />

                  <Skeleton
                    height={18}
                    width="90%"
                    className="mt-6"
                    borderRadius={8}
                  />

                  <Skeleton
                    height={18}
                    width="70%"
                    className="mt-3"
                    borderRadius={8}
                  />

                  <Skeleton
                    height={22}
                    width={150}
                    className="mt-6"
                    borderRadius={8}
                  />

                </div>

              </div>

            </div>

            {/* SIDE ARTICLES */}
            <div className="flex flex-col">

              <div className="h-[520px] overflow-hidden space-y-5 pr-2">

                {[1, 2, 3, 4].map((i) => (

                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden p-4"
                  >

                    <div className="flex gap-4">

                      {/* IMAGE */}
                      <div className="w-28 h-24 flex-shrink-0">

                        <Skeleton
                          height={96}
                          width={112}
                          borderRadius={14}
                        />

                      </div>

                      {/* CONTENT */}
                      <div className="flex-1">

                        <Skeleton
                          height={14}
                          width={80}
                          borderRadius={6}
                        />

                        <Skeleton
                          height={20}
                          width="95%"
                          className="mt-3"
                          borderRadius={8}
                        />

                        <Skeleton
                          height={20}
                          width="75%"
                          className="mt-2"
                          borderRadius={8}
                        />

                        <Skeleton
                          height={14}
                          width={170}
                          className="mt-4"
                          borderRadius={6}
                        />

                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </section>
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