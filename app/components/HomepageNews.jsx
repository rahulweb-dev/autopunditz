"use client";

import { useState } from "react";
import Image from "next/image";

const categories = [
  "Latest",
  "Electric",
  "Upcoming",
  "Launch",
  "Reviews",
];

const breakingNews = [
  "Tata Nexon EV 2026 Launch Confirmed",
  "Hyundai Creta EV Spotted Testing",
  "Mahindra Thar 5 Door Launch Soon",
  "Maruti Swift Hybrid Coming India",
];

const featured = {
  title:
    "Safest Cars in India 2026: EVs Dominate, Perfect Scores Emerge — Kia Seltos Leads ICE Safety Revolution",
  desc:
    "India’s automotive safety landscape underwent a dramatic transformation in 2026. With the rise of Bharat NCAP, safety is becoming a baseline expectation.",
  image:
    "https://static.wixstatic.com/media/1da610_5461451e916542b9846eccc35a589408~mv2.jpg",
};

const latestNews = [
  {
    title:
      "Safest Cars in India 2026: EVs Dominate, Perfect Scores Emerge — Kia Seltos Leads ICE Safety Revolution",
    desc:
      "India’s automotive safety landscape underwent a dramatic transformation in 2026. With the rise of Bharat NCAP, safety is becoming a baseline expectation.",
    tag: "Safety",
    image:
      "https://static.wixstatic.com/media/1da610_5461451e916542b9846eccc35a589408~mv2.jpg",
    date: "Apr 7, 2026",
    readTime: "5 min read",
    featured: true,
  },

  {
    title:
      "Renault India Sales March 2026: 77% YoY Growth, Duster Relaunch Boosts Volumes",
    desc:
      "Renault India posted 5,046 units in March 2026 marking 77% YoY growth.",
    tag: "Sales",
    image:
      "https://static.wixstatic.com/media/1da610_bdfdb767c68a4521a9c0a9f55e3de7b2~mv2.jpg",
    date: "Apr 6, 2026",
    readTime: "3 min read",
  },

  {
    title: "Discounts and Offers on Skoda Cars for April 2026",
    desc:
      "Skoda India offers strong benefits across models including MY25 clearance.",
    tag: "Offers",
    image:
      "https://static.wixstatic.com/media/eb34fb_1e02107d30274267b49116288e0de731~mv2.png",
    date: "Apr 5, 2026",
    readTime: "4 min read",
  },

  {
    title: "Skoda India Sales Analysis: March 2026",
    desc:
      "Skoda recorded 7,928 units with 7% YoY growth and 25% MoM jump.",
    tag: "Sales",
    image:
      "https://static.wixstatic.com/media/1da610_7f4eb9124ae4470fa008e3d5c7d5c210~mv2.png",
    date: "Apr 6, 2026",
    readTime: "3 min read",
  },
];

const launches = [
  {
    title: "Toyota Fortuner 2026 Launch",
    desc: "Hybrid Fortuner expected with new features",
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753",
  },
  {
    title: "Honda Elevate EV",
    desc: "Honda preparing electric SUV for India",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d",
  },
  {
    title: "Skoda Slavia New Edition",
    desc: "New Slavia variant launched in India",
    image:
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def",
  },
];

export default function HomepageNews() {
  const [active, setActive] = useState("Latest");

  return (
    <section className="bg-[#0a0a0a] text-white py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Breaking News */}
        <div className="flex gap-4 border-b border-gray-800 pb-3 mb-6">
          <span className="bg-red-600 px-2 py-1 text-xs">
            Breaking
          </span>

          <div className="overflow-hidden">
            <div className="flex gap-8 whitespace-nowrap animate-pulse">
              {breakingNews.map((item, i) => (
                <span key={i} className="text-sm text-gray-400">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-4xl font-semibold">
            Latest Car News
          </h2>

          <div className="bg-red-500 h-1 w-60 mt-2 rounded-full"></div>
        </div>
        {/* Category Tabs */}
        <div className="flex gap-6 border-b border-gray-800 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`pb-2 text-sm ${active === cat
                ? "border-b-2 border-red-500 text-red-500"
                : "text-gray-400"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Section */}

        <div className="grid md:grid-cols-3 gap-4 mb-10">

          <div className="md:col-span-2 relative h-[380px]">
            <Image
              src={featured.image}
              fill
              alt=""
              className="object-cover"
            />

            <div className="absolute bottom-0 bg-gradient-to-t from-black p-6">

              <span className="bg-red-600 px-2 py-1 text-xs mb-2 inline-block">
                Live Updates
              </span>

              <h2 className="text-2xl font-semibold mb-2">
                {featured.title}
              </h2>

              <p className="text-sm text-gray-300">
                {featured.desc}
              </p>

            </div>
          </div>

          <div className="space-y-4">
            {latestNews.map((item, i) => (
              <div key={i} className="flex gap-3">

                <div className="relative w-28 h-20">
                  <Image
                    src={item.image}
                    fill
                    alt=""
                    className="object-cover"
                  />

                  <span className="absolute top-1 left-1 bg-red-600 text-xs px-2 py-1">
                    {item.tag}
                  </span>

                </div>

                <div>
                  <p className="text-sm font-medium">
                    {item.title}
                  </p>

                  <p className="text-xs text-gray-400">
                    {item.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Latest Grid */}

        <div className="grid md:grid-cols-4 gap-4 mb-10">
          {latestNews.map((item, i) => (
            <div key={i} className="group cursor-pointer">

              <div className="relative h-40">

                <Image
                  src={item.image}
                  fill
                  alt=""
                  className="object-cover"
                />

                <span className="absolute top-2 left-2 bg-red-600 text-xs px-2 py-1">
                  {item.tag}
                </span>

              </div>

              <div className="mt-2">
                <p className="text-sm font-medium">
                  {item.title}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {item.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Car Launch */}

        <div className="mb-10">

          <h2 className="text-xl font-semibold mb-4">
            Car Launch
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {launches.map((item, i) => (
              <div key={i}>

                <div className="relative h-44">

                  <Image
                    src={item.image}
                    fill
                    alt=""
                    className="object-cover"
                  />

                  <span className="absolute top-2 left-2 bg-red-600 text-xs px-2 py-1">
                    Launch
                  </span>

                </div>

                <p className="text-sm mt-2 font-medium">
                  {item.title}
                </p>

                <p className="text-xs text-gray-400">
                  {item.desc}
                </p>

              </div>
            ))}
          </div>

        </div>

        {/* Electric Cars */}

        <div className="mb-10">

          <h2 className="text-xl font-semibold mb-4">
            Electric Cars
          </h2>

          <div className="grid md:grid-cols-4 gap-4">
            {latestNews.map((item, i) => (
              <div key={i}>
                <div className="relative h-36">

                  <Image
                    src={item.image}
                    fill
                    alt=""
                    className="object-cover"
                  />

                  <span className="absolute top-2 left-2 bg-[#2D2D2D] text-xs px-2 py-1">
                    EV
                  </span>

                </div>

                <p className="text-sm mt-2">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Upcoming Cars */}

        <div className="mb-10">

          <h2 className="text-xl font-semibold mb-4">
            Upcoming Cars
          </h2>

          <div className="grid md:grid-cols-4 gap-4">
            {latestNews.map((item, i) => (
              <div key={i}>
                <div className="relative h-36">

                  <Image
                    src={item.image}
                    fill
                    alt=""
                    className="object-cover"
                  />

                  <span className="absolute top-2 left-2 bg-[#E53935] text-xs px-2 py-1">
                    Upcoming
                  </span>

                </div>

                <p className="text-sm mt-2">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}