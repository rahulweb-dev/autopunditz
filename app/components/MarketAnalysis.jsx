"use client";

import Image from "next/image";
import Link from "next/link";
import { analyses } from "@/app/constants/data/marketAnalysisData";

export default function MarketAnalysis() {

  return (

    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">

      {/* Header */}

      <div className="mb-6 md:mb-8">

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
          Market Analysis
        </h2>

        <p className="text-gray-500 text-xs sm:text-sm md:text-base">
          Automotive industry insights & reports
        </p>

      </div>


      {/* Layout */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8">

        {/* Featured */}
        <Link
          href={`/market-analysis/${analyses[0].slug}`}
          className="lg:col-span-2 block group"
        >

          <div className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition duration-300">

            {/* Image */}
            <div className="relative w-full h-56 sm:h-54 md:h-72 lg:h-[290px]">

              <Image
                src={analyses[0].image}
                fill
                alt={analyses[0].title}
                className="object-cover group-hover:scale-105 transition duration-500"
              />

            </div>

            {/* Content */}
            <div className="p-4 md:p-5">

              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold leading-snug mb-2">
                {analyses[0].title}
              </h3>

              <div className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">
                  {analyses[0].author}
                </span>

                <span className="mx-2">-</span>

                <span>
                  {analyses[0].date}
                </span>
              </div>

              <span className="text-red-500 font-medium group-hover:text-red-600 transition">
                Read Report →
              </span>

            </div>

          </div>

        </Link>

        {/* Side Scroll */}
        <div className="flex flex-col h-full">

          <div className="h-[520px] sm:h-[560px] lg:h-[360px] overflow-y-auto space-y-6 pr-2">

            {analyses.slice(1).map((item, i) => (

              <Link
                key={i}
                href={`/market-analysis/${item.slug}`}
                className="block group"
              >

                <div className="bg-white rounded-xl overflow-hidden  hover:shadow-lg transition duration-300">

                  {/* Image */}
                  <div className="relative w-full h-44 sm:h-48">

                    <Image
                      src={item.image}
                      fill
                      alt={item.title}
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />

                  </div>

                  {/* Content */}
                  <div className="p-3">

                    <h3 className="text-xl sm:text-base font-semibold leading-snug mb-2 line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="text-xs sm:text-sm text-gray-600 mb-2">
                      <span className="font-semibold">
                        {item.author}
                      </span>

                      <span className="mx-2">-</span>

                      <span>
                        {item.date}
                      </span>
                    </div>

                    {/* Read Report */}
                    <span className="text-red-500 text-xs sm:text-sm font-medium group-hover:text-red-600 transition">
                      Read Report →
                    </span>

                  </div>

                </div>

              </Link>

            ))}

          </div>

          {/* Explore */}
          <Link
            href="/market-analysis"
            className="mt-4 text-red-500 text-sm font-medium hover:text-red-600"
          >
            Explore Market Analysis →
          </Link>

        </div>

      </div>

    </section>

  );

}