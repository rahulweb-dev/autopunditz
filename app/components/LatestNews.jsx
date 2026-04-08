"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import Image from "next/image";

const news = [
  {
    title: "Safest Cars in India 2026: EVs Dominate, Perfect Scores Emerge — Kia Seltos Leads ICE Safety Revolution",
    excerpt:
      "India’s automotive safety landscape underwent a dramatic transformation in 2026. With the rise of the Bharat NCAP, safety is no longer a premium feature—it is becoming a baseline expectation.",
    image:
      "https://static.wixstatic.com/media/1da610_5461451e916542b9846eccc35a589408~mv2.jpg/v1/fill/w_264,h_264,fp_0.50_0.50,q_90,enc_avif,quality_auto/1da610_5461451e916542b9846eccc35a589408~mv2.jpg",
    date: "Apr 7, 2026",
    readTime: "5 min read",
    featured: true,
  },
  {
    title: "Renault India Sales March 2026: 77% YoY Growth, Duster Relaunch Boosts Volumes",
    excerpt:
      "Renault India posted a robust performance in March 2026, registering total sales of 5,046 units, marking a strong 77% year-on-year (YoY) growth compared to 2,846 units in March 2025. However, on a month-on-month (MoM) basis, sales declined by 15%, indicating some cooling after February’s momentum.",
    image:
      "https://static.wixstatic.com/media/1da610_bdfdb767c68a4521a9c0a9f55e3de7b2~mv2.jpg/v1/fill/w_1110,h_222,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/1da610_bdfdb767c68a4521a9c0a9f55e3de7b2~mv2.jpg",
    date: "Apr 6, 2026",
    readTime: "3 min read",
  },
  {
    title: "Discounts and Offers on Skoda Cars for April 2026",
    excerpt:
      "Skoda India has rolled out a strong set of offers for April 2026, targeting both MY25 stock clearance and selective MY26 push. The benefits vary significantly across models and model years, with the highest discounts clearly focused on clearing older inventory. Here’s a detailed breakdown.",
    image:
      "https://static.wixstatic.com/media/eb34fb_1e02107d30274267b49116288e0de731~mv2.png/v1/fill/w_1110,h_632,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/eb34fb_1e02107d30274267b49116288e0de731~mv2.png",
    date: "Apr 5, 2026",
    readTime: "4 min read",
  },
  {
    title: "Skoda India Sales Analysis: March 2026",
    excerpt:
      "In March 2026, the Czech automaker recorded total sales of 7,928 units, achieving a 7% Year-on-Year (YoY) growth and a substantial 25% Month-on-Month (MoM) jump compared to February. The data reveals a brand successfully navigating a transitional phase, with its India 2.0 models continuing to bear the brunt of the volume requirements.",
    image:
      "https://static.wixstatic.com/media/1da610_7f4eb9124ae4470fa008e3d5c7d5c210~mv2.png/v1/fill/w_1110,h_251,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1da610_7f4eb9124ae4470fa008e3d5c7d5c210~mv2.png",
    date: "Apr 6, 2026",
    readTime: "3 min read",
  },


];

export default function LatestNews() {
  return (
    <section className="container mx-auto px-6 py-16">

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
            Latest News
          </h2>
          <p className="text-neutral-600">
            Breaking stories and market updates
          </p>
        </div>

        <button className="hidden md:flex items-center gap-2 px-6 py-3 text-red-600 hover:text-red-700 font-medium group">
          View All
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Featured */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -4 }}
          className="bg-white rounded-2xl overflow-hidden shadow-lg border cursor-pointer"
        >
          <div className="relative h-80">
            <Image
              src={news[0].image}
              alt={news[0].title}
              fill
              className="object-cover"
            />

            <div className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white text-sm rounded-full">
              Featured
            </div>
          </div>

          <div className="p-8">
            <div className="flex gap-4 text-sm text-neutral-500 mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {news[0].date}
              </span>

              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {news[0].readTime}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {news[0].title}
            </h3>

            <p className="text-neutral-600 mb-6">
              {news[0].excerpt}
            </p>

            <button className="text-blue-600 font-medium flex items-center gap-2 group">
              Read More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>

        {/* Side News */}
        <div className="flex flex-col gap-6">
          {news.slice(1).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl shadow-lg border border-neutral-100 overflow-hidden flex flex-col sm:flex-row cursor-pointer group"
            >

              {/* Image */}
              <div className="relative w-full sm:w-40 h-52 sm:h-40 flex-shrink-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 flex flex-col justify-between">

                <div>
                  {/* Date */}
                  <div className="flex gap-3 text-xs text-neutral-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-lg text-neutral-900 mb-2 group-hover:text-blue-600 transition">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                    {item.excerpt}
                  </p>
                </div>

                {/* Button */}
                <button className="text-blue-600 text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read More
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                </button>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}