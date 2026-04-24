"use client";

import Image from "next/image";
import Link from "next/link";

export default function NewsGrid({ title, subtitle, data, basePath }) {

  // ✅ Format Date
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // ✅ Reading Time
  const getReadingTime = (text = "") => {
    const words = text.replace(/<[^>]+>/g, "").trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200)) + " min read";
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          {title}
        </h1>

        <p className="text-gray-500 mt-2">
          {subtitle}
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {data.map((item, index) => {
          const cleanText = item.content?.replace(/<[^>]+>/g, "") || "";
          const imageMatch = item.content?.match(/<img.*?src="(.*?)"/);
          const image = item.image || imageMatch?.[1] || "/placeholder.jpg";

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
            >

              {/* IMAGE */}
              <Link href={`${basePath}/${item._id || item.slug}`}>
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={image}
                    fill
                    alt={item.title}
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
              </Link>

              {/* CONTENT */}
              <div className="p-4 flex flex-col">

                {/* ✅ META (FIXED) */}
                <p className="text-xs text-gray-400 mb-2">
                  {formatDate(item.date || item.createdAt)} •{" "}
                  {getReadingTime(item.content)}
                </p>

                {/* TITLE */}
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-red-600 transition">
                  {item.title}
                </h3>

                {/* DESC */}
                <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                  {cleanText.slice(0, 110)}...
                </p>

                {/* READ MORE */}
                <Link
                  href={`${basePath}/${item._id}`}
                  className="mt-auto text-red-500 text-sm font-medium hover:text-red-600"
                >
                  Read More →
                </Link>

              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
}