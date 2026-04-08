"use client";

import { motion } from "framer-motion";
import { TrendingUp, Globe, DollarSign, ArrowRight } from "lucide-react";
import Image from "next/image";

const analyses = [
  {
    title: "Q1 2026 Global Market Report",
    description:
      "Comprehensive analysis of worldwide automotive sales, trends, and regional performance.",
    image:
      "https://images.unsplash.com/photo-1768796370479-dc98ad26c6f6?w=800&q=80",
    icon: Globe,
    stats: "+12.5% YoY Growth",
  },
  {
    title: "Electric Vehicle Adoption Forecast",
    description:
      "Five-year projection of EV market penetration across major global markets.",
    image:
      "https://images.unsplash.com/photo-1775259928405-d3d76549cb08?w=800&q=80",
    icon: TrendingUp,
    stats: "18.2% Market Share",
  },
  {
    title: "OEM Financial Performance",
    description:
      "Quarterly earnings analysis and profitability metrics for top manufacturers.",
    image:
      "https://images.unsplash.com/photo-1672072141517-43e8e1ee4c14?w=800&q=80",
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