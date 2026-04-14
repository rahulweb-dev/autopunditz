"use client";

import Image from "next/image";
import Link from "next/link";

const editorials = [
  {
    slug: "indian-brand-analysis-2025",
    title: "2025: Indian mass-market passenger vehicle Brand analysis",
    excerpt:
      "Mahindra became the second-largest carmaker in India.",
    author: "Rahul",
    date: "Apr 7, 2026",
    category: "Opinion",
    image:
      "https://static.wixstatic.com/media/1da610_73ad1d21253249cbb9b77cb417c80fbb~mv2.jpg",
  },
  {
    slug: "best-selling-cars-2025",
    title: "Best Selling Cars of 2025",
    excerpt:
      "Maruti Dzire became the best-selling car in 2025.",
    author: "David Chen",
    date: "Apr 6, 2026",
    category: "Analysis",
    image:
      "https://static.wixstatic.com/media/1da610_fb6ed218ead34b948263020a61e06b66~mv2.jpg",
  },
  {
    slug: "car-sales-analysis-2025",
    title: "Indian Car Sales Analysis for CY2025",
    excerpt:
      "2025 registered highest wholesale vehicle sales.",
    author: "Emma Rodriguez",
    date: "Apr 5, 2026",
    category: "Deep Dive",
    image:
      "https://static.wixstatic.com/media/1da610_d3f60af0b01e477cab339065c48312f9~mv2.jpg",
  },
];

export default function Editorials() {

  return (

    <section className="max-w-7xl mx-auto px-4 py-10">

      {/* Header */}

      <div className="mb-6">

        <h2 className="text-3xl md:text-4xl font-semibold">
          Editorials
        </h2>

        <p className="text-gray-500 mt-2">
          Expert perspectives and thought leadership
        </p>

      </div>


      {/* Layout */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Featured */}

        <Link
          href={`/editorials/${editorials[0].slug}`}
          className="lg:col-span-2"
        >

          <div className="relative h-[260px] md:h-[360px] rounded-xl overflow-hidden group">

            <Image
              src={editorials[0].image}
              fill
              alt=""
              className="object-cover group-hover:scale-105 transition"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

            <div className="absolute bottom-0 p-6 text-white">

              <span className="bg-red-600 text-xs px-3 py-1 rounded-full">
                {editorials[0].category}
              </span>

              <h3 className="text-xl font-semibold mt-2">
                {editorials[0].title}
              </h3>

              <p className="text-sm text-gray-200 mt-1">
                {editorials[0].date}
              </p>

            </div>

          </div>

        </Link>


        {/* Side Scroll */}

        <div className="flex flex-col">

          <div className="h-[260px] md:h-[360px] overflow-y-auto space-y-3 pr-2">

            {editorials.slice(1).map((item, i) => (

              <Link
                key={i}
                href={`/editorials/${item.slug}`}
              >

                <div className="flex gap-3 border rounded-xl p-2 hover:shadow">

                  <div className="relative w-24 h-20">

                    <Image
                      src={item.image}
                      fill
                      alt=""
                      className="object-cover rounded"
                    />

                  </div>

                  <div>

                    <p className="text-xs text-red-500">
                      {item.category}
                    </p>

                    <p className="text-sm font-semibold line-clamp-2">
                      {item.title}
                    </p>

                    <p className="text-xs text-gray-500">
                      {item.date}
                    </p>

                  </div>

                </div>

              </Link>

            ))}

          </div>

          <Link
            href="/editorials"
            className="mt-4 text-red-500 text-sm font-medium"
          >
            Explore Editorials →
          </Link>

        </div>

      </div>

    </section>

  );

}