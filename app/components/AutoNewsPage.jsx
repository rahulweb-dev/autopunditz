  "use client";

import { useState } from "react";
import Image from "next/image";

const categories = ["Latest", "Electric", "Upcoming", "Reviews"];

const breakingNews = [
  "Tata Nexon EV 2026 Launch Confirmed",
  "Hyundai Creta EV Spotted Testing",
  "Mahindra Thar 5 Door Launch Soon",
  "Maruti Swift Hybrid Coming India",
];

const featured = {
  title:
    "Tata Nexon EV 2026 Launch Confirmed — New Design And 500KM Range Expected",
  image:
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
};

const latestNews = [
  {
    title: "Hyundai Creta EV Spotted Testing",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
  },
  {
    title: "Mahindra Scorpio N New Variant",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
  },
  {
    title: "Maruti Swift Hybrid Confirmed",
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763",
  },
  {
    title: "Kia Seltos Facelift Revealed",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
  },
];

const carLaunch = [
  {
    title: "Toyota Fortuner 2026 Launch",
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753",
  },
  {
    title: "Honda Elevate EV Coming Soon",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d",
  },
  {
    title: "Skoda Slavia New Edition",
    image:
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def",
  },
];

export default function AutoNewsPage() {
  const [active, setActive] = useState("Latest");

  return (
    <section className="bg-[#0c0c0c] text-white py-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* Breaking News */}
        <div className="flex items-center gap-4 border-b border-gray-800 pb-3 mb-6">
          <span className="bg-red-600 px-2 py-1 text-xs">
            Breaking
          </span>

          <div className="overflow-hidden">
            <div className="flex gap-8 animate-pulse whitespace-nowrap">
              {breakingNews.map((item, i) => (
                <span key={i} className="text-sm text-gray-300">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-6 border-b border-gray-800 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`pb-2 text-sm ${
                active === cat
                  ? "border-b-2 border-yellow-400 text-yellow-400"
                  : "text-gray-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">

          <div className="md:col-span-2 relative h-[350px]">
            <Image
              src={featured.image}
              alt=""
              fill
              className="object-cover"
            />

            <div className="absolute bottom-0 bg-gradient-to-t from-black p-5">
              <h2 className="text-xl font-semibold">
                {featured.title}
              </h2>
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
                </div>

                <p className="text-sm">{item.title}</p>
              </div>
            ))}
          </div>

        </div>

        {/* Car Launch Section */}
        <div className="mb-10">

          <h2 className="text-xl font-semibold mb-4">
            Car Launch
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            {carLaunch.map((item, i) => (
              <div key={i}>
                <div className="relative h-44">
                  <Image
                    src={item.image}
                    fill
                    alt=""
                    className="object-cover"
                  />
                </div>

                <p className="mt-2 text-sm">
                  {item.title}
                </p>
              </div>
            ))}

          </div>

        </div>

        {/* Electric Section */}

        <div>

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