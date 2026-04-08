"use client";

import { motion } from "framer-motion";
import { TrendingUp, Globe, DollarSign, ArrowRight } from "lucide-react";
import Image from "next/image";

const analyses = [
  {
    title: "Electric, Hybrid, Petrol and Diesel Cars Sales for February 2021",
    description:
      "We were as always first and were 100% accurate with the wholesale car Data of February'21.We thank our readers for their patronage and feedback, which is the sole reason for doing this article on fuel type analysis. ",
    image:
      "https://static.wixstatic.com/media/eb3040_e82b753a661b4ddab809d732ef36ab6f~mv2.jpeg/v1/fill/w_846,h_265,al_c,lg_1,q_80,enc_avif,quality_auto/eb3040_e82b753a661b4ddab809d732ef36ab6f~mv2.jpeg",
    icon: Globe,
    stats: "+12.5% YoY Growth",
  },
  {
    title: "World’s Top 10 Most Valuable Automobile Brands of 2021!",
    description:
      "Toyota overtakes Mercedes-Benz claiming the Numero Uno position as the world’s most valuable automobile brand with a brand value of US$59.5 billion. ",
    image:
      "https://static.wixstatic.com/media/eb3040_ba126d31a04a4b028bea79342ad20c62~mv2.jpeg/v1/fill/w_846,h_265,al_c,lg_1,q_80,enc_avif,quality_auto/eb3040_ba126d31a04a4b028bea79342ad20c62~mv2.jpeg",
    icon: TrendingUp,
    stats: "18.2% Market Share",
  },
  {
    title: "Petrol v/s Diesel Cars Sales in India for Feb'21",
    description:
      "Maruti Suzuki which is now a predominantly Petrol-only car manufacturer was the No.1 Petrol Car OEM and Mahindra emerged as the No.1 Diesel Car OEM for February 2021. ",
    image:
      "https://static.wixstatic.com/media/eb3040_20c2b85fed164c348a024664a8cfd088~mv2.jpeg/v1/fill/w_846,h_265,al_c,lg_1,q_80,enc_avif,quality_auto/eb3040_20c2b85fed164c348a024664a8cfd088~mv2.jpeg",
    icon: DollarSign,
    stats: "$240B Revenue",
  },
];

export default function MarketAnalysis() {
  return (
    <section className="container mx-auto px-6 py-16">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-4xl font-bold text-neutral-900 mb-2">
            Market Analysis
          </h2>
          <p className="text-neutral-600">
            In-depth reports and forecasts
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {analyses.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-neutral-100"
            >
              
              {/* Image */}
              <div className="relative h-52">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Stats Badge */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                  <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-sm">
                    {item.stats}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-neutral-600 text-sm mb-5">
                  {item.description}
                </p>

                <button className="flex items-center gap-2 text-blue-600 font-medium group">
                  View Report
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </button>
              </div>

            </motion.div>
          );
        })}
      </div>
    </section>
  );
}