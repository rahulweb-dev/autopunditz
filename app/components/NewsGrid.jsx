"use client";

import Image from "next/image";
import Link from "next/link";

export default function NewsGrid({ title, subtitle, data, basePath }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          {title}
        </h1>

        <p className="text-gray-500 mt-2">
          {subtitle}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
          >

            {/* Image */}

            <Link href={`${basePath}/${item.slug}`}>
              <div className="relative h-48">

                <Image
                  src={item.image}
                  fill
                  alt={item.title}
                  className="object-cover"
                />

              </div>
            </Link>

            {/* Content */}

            <div className="p-4">

              <p className="text-xs text-gray-500 mb-2">
                {item.date}
              </p>

              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 line-clamp-3">
                {item.desc}
              </p>

              <Link
                href={`${basePath}/${item.slug}`}
                className="mt-3 inline-block text-red-500 text-sm font-medium hover:text-red-600"
              >
                Read More →
              </Link>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}