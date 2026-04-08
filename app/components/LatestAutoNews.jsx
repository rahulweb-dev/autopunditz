"use client";

import Image from "next/image";

const news = [
  {
    title:
      "Tata Nexon 2025 Facelift Launched With New Features",
    image:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200",
    category: "Launch",
    featured: true,
  },
  {
    title: "Hyundai Creta EV Spotted Testing In India",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
  },
  {
    title: "Mahindra Thar 5 Door Coming Soon",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
  },
  {
    title: "Maruti Swift Hybrid Confirmed",
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763",
  },
  {
    title: "Kia Seltos Facelift Gets ADAS",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
  },
  {
    title: "Toyota Innova EV Concept Revealed",
    image:
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def",
  },
  {
    title: "MG Hector 2026 Updated Features",
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753",
  },
  {
    title: "Skoda Slavia New Edition Launched",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d",
  },
];

export default function LatestAutoNews() {
  return (
    <section className="bg-[#111] text-white py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            Latest Car News
          </h2>

          <button className="text-sm text-gray-400">
            View All →
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Featured */}
          <div className="md:col-span-2">
            <div className="relative h-[350px]">
              <Image
                src={news[0].image}
                alt={news[0].title}
                fill
                className="object-cover"
              />

              <div className="absolute bottom-0 bg-gradient-to-t from-black p-5">
                <span className="text-red-500 text-sm">
                  Live Updates
                </span>

                <h3 className="text-xl font-semibold">
                  {news[0].title}
                </h3>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            {news.slice(1, 4).map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="relative w-28 h-20">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <p className="text-sm">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid md:grid-cols-4 gap-4 mt-6">
          {news.slice(4).map((item, i) => (
            <div key={i}>
              <div className="relative h-40">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="text-sm mt-2">
                {item.title}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}