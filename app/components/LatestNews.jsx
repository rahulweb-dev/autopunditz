"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import Image from "next/image";

const news = [
  {
    title: "Electric Vehicle Sales Surge 45% in Q1 2026",
    excerpt:
      "Market data reveals unprecedented growth in EV adoption across major markets, driven by new model launches and improved charging infrastructure.",
    image:
      "https://images.unsplash.com/photo-1760538961281-b4619503cc1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    date: "Apr 7, 2026",
    readTime: "5 min read",
    featured: true,
  },
  {
    title: "Toyota Maintains Global Leadership Position",
    excerpt:
      "Latest sales figures show Toyota leading with 2.1M units sold in March 2026.",
    image:
      "https://images.unsplash.com/photo-1765285037939-673641e49b04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    date: "Apr 6, 2026",
    readTime: "3 min read",
  },
  {
    title: "Chinese Automakers Expand European Presence",
    excerpt:
      "New data shows significant market share gains in key European markets.",
    image:
      "https://images.unsplash.com/photo-1770319942638-a5989632f2ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    date: "Apr 5, 2026",
    readTime: "4 min read",
  },
  {
    title: "Toyota Maintains Global Leadership Position",
    excerpt:
      "Latest sales figures show Toyota leading with 2.1M units sold in March 2026.",
    image:
      "https://images.unsplash.com/photo-1765285037939-673641e49b04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
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

        <button className="hidden md:flex items-center gap-2 px-6 py-3 text-blue-600 hover:text-blue-700 font-medium group">
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

            <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
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