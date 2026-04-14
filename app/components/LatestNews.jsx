"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { newsData } from "@/app/constants/data/newsData";

const tabs = ["Cars", "Bikes"];

export default function LatestNews() {

  const [active, setActive] = useState("Cars");
  const router = useRouter();

  const handleExplore = () => {
    router.push(`/${active.toLowerCase()}`);
  };

  return (
    <section id="latest-auto-news" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 ">

      {/* Header */}

      <div className="mb-6 md:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
          Latest News
        </h2>

        <p className="text-gray-500 text-xs sm:text-sm md:text-base">
          Breaking vehicle updates
        </p>
      </div>

      {/* Tabs */}

      <div className="flex gap-4 sm:gap-6 overflow-x-auto border-b mb-6 pb-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`pb-2 text-xs sm:text-sm md:text-base whitespace-nowrap transition ${
              active === tab
                ? "border-b-2 border-red-500 text-red-500 font-medium"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8">

        {/* Featured */}

        <Link
          href={`/${active.toLowerCase()}/${newsData[active][0].slug}`}
          className="lg:col-span-2"
        >
          <div className="relative h-48 sm:h-56 md:h-72 lg:h-90 rounded-xl overflow-hidden group cursor-pointer">

            <Image
              src={newsData[active][0].image}
              fill
              alt={newsData[active][0].title}
              className="object-cover group-hover:scale-105 transition duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="absolute bottom-0 p-3 sm:p-4 md:p-6 text-white w-full">

              <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold mb-1">
                {newsData[active][0].title}
              </h3>

              <p className="text-xs sm:text-sm text-white/90 line-clamp-2">
                {newsData[active][0].desc}
              </p>

              <span className="text-sm text-red-300 mt-2 inline-block">
                Read More →
              </span>

            </div>

          </div>
        </Link>

        {/* Side Scroll */}

        <div className="flex flex-col h-full">

          <div className="h-[260px] sm:h-[300px] lg:h-[360px] overflow-y-auto space-y-3 pr-2">

            {newsData[active].slice(1).map((item, i) => (
              
              <Link
                key={i}
                href={`/${active.toLowerCase()}/${item.slug}`}
              >
                <div className="flex gap-3 bg-white rounded-xl border p-2 md:p-3 hover:shadow-md transition cursor-pointer">

                  <div className="relative w-24 h-20 flex-shrink-0">
                    <Image
                      src={item.image}
                      fill
                      alt=""
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex flex-col justify-center">

                    <p className="text-xs text-gray-500">
                      {item.date}
                    </p>

                    <p className="text-sm font-semibold line-clamp-2">
                      {item.title}
                    </p>

                    <p className="text-xs text-gray-500 line-clamp-2">
                      {item.desc}
                    </p>

                    <span className="text-red-500 text-xs mt-1">
                      Read More →
                    </span>

                  </div>

                </div>

              </Link>

            ))}

          </div>

          {/* Explore Button */}

          <button
            onClick={handleExplore}
            className="mt-4 text-red-500 text-sm font-medium hover:text-red-600"
          >
            Explore {active} →
          </button>

        </div>

      </div>

    </section>
  );
}