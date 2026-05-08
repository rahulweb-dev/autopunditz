"use client";

import Image from "next/image";
import Link from "next/link";
import useBlogs from "@/hooks/useBlogs";
import { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function extractImage(html) {
  if (!html) return "/placeholder.jpg";
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : "/placeholder.jpg";
}

export default function MarketAnalysis() {
  const { blogs, isLoading } = useBlogs();

  const analyses = useMemo(() => {
    return blogs
      .filter(blog =>
        blog?.category?.toLowerCase()?.includes("market")
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [blogs]);

  const featured = analyses[0];

  if (isLoading && !blogs.length) {

    return (

      <section className="max-w-container mx-auto px-4 py-6 md:py-10">

        {/* Header */}
        <div className="mb-6 md:mb-8">

          <Skeleton
            height={42}
            width={260}
            borderRadius={10}
          />

          <Skeleton
            height={18}
            width={240}
            className="mt-3"
            borderRadius={8}
          />

        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Featured */}
          <div className="lg:col-span-2">

            <div className="bg-white rounded-xl overflow-hidden">

              {/* Image */}
              <Skeleton
                height={320}
                width="100%"
                borderRadius={0}
              />

              {/* Content */}
              <div className="p-5">

                <Skeleton
                  height={34}
                  width="90%"
                  borderRadius={8}
                />

                <Skeleton
                  height={16}
                  width={220}
                  className="mt-4"
                  borderRadius={8}
                />

                <Skeleton
                  height={20}
                  width={140}
                  className="mt-6"
                  borderRadius={8}
                />

              </div>

            </div>

          </div>

          {/* Side Cards */}
          <div className="flex flex-col">

            <div className="h-[360px] overflow-hidden space-y-6 pr-2">

              {[1, 2, 3].map((i) => (

                <div
                  key={i}
                  className="bg-white rounded-xl overflow-hidden"
                >

                  {/* Image */}
                  <Skeleton
                    height={176}
                    width="100%"
                    borderRadius={0}
                  />

                  {/* Content */}
                  <div className="p-3">

                    <Skeleton
                      height={22}
                      width="95%"
                      borderRadius={8}
                    />

                    <Skeleton
                      height={14}
                      width={180}
                      className="mt-3"
                      borderRadius={8}
                    />

                    <Skeleton
                      height={18}
                      width={110}
                      className="mt-4"
                      borderRadius={8}
                    />

                  </div>

                </div>
              ))}

            </div>

            {/* Explore */}
            <div className="mt-4">

              <Skeleton
                height={18}
                width={180}
                borderRadius={8}
              />

            </div>

          </div>

        </div>

      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-6 md:py-10">

      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Market Analysis
        </h2>
        <p className="text-gray-500 text-sm md:text-base">
          Automotive industry insights & reports
        </p>
      </div>

      {analyses.length === 0 ? (
        <p className="text-center">No Market Analysis found</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Featured */}
          {featured && (
            <Link
              href={`/market-analysis/${featured._id}`}
              className="lg:col-span-2 group"
            >
              <div className="bg-white rounded-xl overflow-hidden hover:shadow-lg">

                <div className="relative w-full h-64 md:h-72">
                  <Image
                    src={extractImage(featured.content)}
                    fill
                    alt={featured.title}
                    className="object-cover"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">
                    {featured.title}
                  </h3>

                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold">
                      {featured.author || "Admin"}
                    </span>
                    <span className="mx-2">-</span>
                    <span>
                      {new Date(featured.createdAt).toDateString()}
                    </span>
                  </div>

                  <span className="text-red-500 font-medium">
                    Read Report →
                  </span>
                </div>

              </div>
            </Link>
          )}

          {/* Side */}
          <div className="flex flex-col">
            <div className="h-[360px] overflow-y-auto space-y-6 pr-2">

              {analyses.slice(1).map((item) => (
                <Link
                  key={item._id}
                  href={`/market-analysis/${item.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl overflow-hidden hover:shadow-lg">

                    <div className="relative w-full h-44">
                      <Image
                        src={extractImage(item.content)}
                        fill
                        alt={item.title}
                        className="object-cover"
                      />
                    </div>

                    <div className="p-3">
                      <h3 className="text-base font-semibold mb-2 line-clamp-2">
                        {item.title}
                      </h3>

                      <div className="text-xs text-gray-600 mb-2">
                        <span className="font-semibold">
                          {item.author || "Admin"}
                        </span>
                        <span className="mx-2">-</span>
                        <span>
                          {new Date(item.createdAt).toDateString()}
                        </span>
                      </div>

                      <span className="text-red-500 text-sm">
                        Read Report →
                      </span>
                    </div>

                  </div>
                </Link>
              ))}

            </div>

            <Link
              href="/market-analysis"
              className="mt-4 text-red-500 text-sm font-medium"
            >
              Explore Market Analysis →
            </Link>
          </div>

        </div>
      )}
    </section>
  );
}