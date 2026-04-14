"use client";

import Image from "next/image";

const news = [
  {
    title:
      "Safest Cars in India 2026: EVs Dominate, Perfect Scores Emerge — Kia Seltos Leads ICE Safety Revolution",
    image:
      "https://static.wixstatic.com/media/1da610_5461451e916542b9846eccc35a589408~mv2.jpg",
    category: "Safety",
    date: "Apr 7, 2026",
    readTime: "5 min read",
    featured: true,
  },
  {
    title:
      "Renault India Sales March 2026: 77% YoY Growth, Duster Relaunch Boosts Volumes",
    image:
      "https://static.wixstatic.com/media/1da610_bdfdb767c68a4521a9c0a9f55e3de7b2~mv2.jpg",
    category: "Sales",
    date: "Apr 6, 2026",
    readTime: "3 min read",
  },
  {
    title: "Discounts and Offers on Skoda Cars for April 2026",
    image:
      "https://static.wixstatic.com/media/eb34fb_1e02107d30274267b49116288e0de731~mv2.png",
    category: "Offers",
    date: "Apr 5, 2026",
    readTime: "4 min read",
  },
  {
    title: "Skoda India Sales Analysis: March 2026",
    image:
      "https://static.wixstatic.com/media/1da610_7f4eb9124ae4470fa008e3d5c7d5c210~mv2.png",
    category: "Sales",
    date: "Apr 6, 2026",
    readTime: "3 min read",
  },

  // Existing News
  {
    title: "Hyundai Creta EV Spotted Testing In India",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
    category: "Electric",
  },
  {
    title: "Mahindra Thar 5 Door Coming Soon",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    category: "Upcoming",
  },
  {
    title: "Maruti Swift Hybrid Confirmed",
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763",
    category: "Hybrid",
  },
  {
    title: "Kia Seltos Facelift Gets ADAS",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
    category: "Launch",
  },
  {
    title: "Toyota Innova EV Concept Revealed",
    image:
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def",
    category: "Electric",
  },
  {
    title: "MG Hector 2026 Updated Features",
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753",
    category: "Update",
  },
  {
    title: "Skoda Slavia New Edition Launched",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d",
    category: "Launch",
  },
];

export default function LatestAutoNews() {
  const featured = news.find(item => item.featured) || news[0];

  return (
    <section className="bg-[#111] text-white py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            Latest Car News
          </h2>

          <button className="text-sm text-gray-400 hover:text-white">
            View All →
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Featured */}
          <div className="md:col-span-2">
            <div className="relative h-[350px] rounded-lg overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover"
              />

              <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent p-5">

                <span className="bg-red-600 px-2 py-1 text-xs mb-2 inline-block">
                  {featured.category}
                </span>

                <h3 className="text-xl font-semibold">
                  {featured.title}
                </h3>

                <div className="text-xs text-gray-400 mt-1">
                  {featured.date} • {featured.readTime}
                </div>

              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            {news.slice(1, 4).map((item, i) => (
              <div
                key={i}
                className="flex gap-3 hover:bg-[#1a1a1a] p-2 rounded cursor-pointer"
              >
                <div className="relative w-28 h-20 rounded overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    {item.title}
                  </p>

                  <span className="text-xs text-red-500">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid md:grid-cols-4 gap-4 mt-6">
          {news.slice(4).map((item, i) => (
            <div
              key={i}
              className="group cursor-pointer"
            >
              <div className="relative h-40 rounded overflow-hidden">

                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />

                <span className="absolute top-2 left-2 bg-red-600 text-xs px-2 py-1">
                  {item.category}
                </span>

              </div>

              <p className="text-sm mt-2 group-hover:text-red-500 transition">
                {item.title}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}