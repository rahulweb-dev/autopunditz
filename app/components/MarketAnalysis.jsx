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
          className="lg:col-span-2"
        >

          <div className="relative h-48 sm:h-56 md:h-72 lg:h-[360px] rounded-xl overflow-hidden group">

            <Image
              src={analyses[0].image}
              fill
              alt={analyses[0].title}
              className="object-cover group-hover:scale-105 transition duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="absolute bottom-0 p-3 sm:p-4 md:p-6 text-white">

              <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold mb-1">
                {analyses[0].title}
              </h3>

              <p className="text-xs sm:text-sm text-white/90">
                {analyses[0].date}
              </p>

              <span className="text-red-300 mt-2 inline-block text-sm">
                Read Report →
              </span>

            </div>

          </div>

        </Link>


        {/* Side Scroll */}

        <div className="flex flex-col h-full">

          <div className="h-[260px] sm:h-[300px] lg:h-[360px] overflow-y-auto space-y-3 pr-2">

            {analyses.slice(1).map((item,i)=> (

              <Link
                key={i}
                href={`/market-analysis/${item.slug}`}
              >

                <div className="flex gap-3 bg-white rounded-xl border p-2 md:p-3 hover:shadow-md transition">

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

                    <span className="text-red-500 text-xs mt-1">
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