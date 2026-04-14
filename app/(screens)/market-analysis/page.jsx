"use client";

import Image from "next/image";
import Link from "next/link";
import { analyses } from "@/app/constants/data/marketAnalysisData";

export default function MarketAnalysisPage() {

  return (

    <section className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold mb-8">
        Market Analysis
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {analyses.map((item, i) => (

          <Link
            key={i}
            href={`/market-analysis/${item.slug}`}
          >

            <div className="bg-white rounded-xl shadow-sm hover:shadow-md">

              <div className="relative aspect-video">

                <Image
                  src={item.image}
                  fill
                  alt=""
                  className="object-cover rounded-t-xl"
                />

              </div>

              <div className="p-4">

                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.date}
                </p>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>

  )

}