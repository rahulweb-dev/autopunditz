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
    "Tata Nexon EV 2026 Launch Confirmed — 500KM Range Expected",
  desc:
    "Tata Motors preparing next generation Nexon EV with improved range and new design",
  image:
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
};

const latestNews = [
  {
    title: "Hyundai Creta EV Spotted Testing",
    desc: "Creta EV expected launch in 2026 with 500km range",
    tag: "Electric",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
  },
  {
    title: "Mahindra Scorpio N New Variant",
    desc: "New Scorpio variant with ADAS features",
    tag: "Launch",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
  },
  {
    title: "Maruti Swift Hybrid Confirmed",
    desc: "Swift hybrid expected in India soon",
    tag: "Upcoming",
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763",
  },
  {
    title: "Kia Seltos Facelift Revealed",
    desc: "New Seltos gets ADAS and new interior",
    tag: "Review",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
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

        {/* Category Tabs */}
        <div className="flex gap-6 border-b border-gray-800 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`pb-2 text-sm ${
                active === cat
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

                  <span className="absolute top-2 left-2 bg-green-500 text-xs px-2 py-1">
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

                  <span className="absolute top-2 left-2 bg-yellow-500 text-xs px-2 py-1">
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