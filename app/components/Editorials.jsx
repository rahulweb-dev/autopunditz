"use client";

import { motion } from "framer-motion";
import { User, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";

const editorials = [
  {
    title: "2025: Indian mass-market passenger vehicle Brand analysis",
    excerpt:
      "Mahindra became the second-largest carmaker in India.",
    author: "Rahul",
    date: "Apr 7, 2026",
    category: "Opinion",
    image:
      "https://static.wixstatic.com/media/1da610_73ad1d21253249cbb9b77cb417c80fbb~mv2.jpg/v1/fill/w_1110,h_606,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1da610_73ad1d21253249cbb9b77cb417c80fbb~mv2.jpg",
  },
  {
    title: "Best Selling Cars of 2025",
    excerpt:
      "Maruti Dzire became the best-selling car in 2025, followed by the Hyundai Creta Tata Punch dropped to No.10 in 2025, from its No.1 position in 2024 SUV and crossover body-style products are now the majority in the top 10 rankingMahindra Scorpio is the most expensive product in the top 10 ranking",
    author: "David Chen",
    date: "Apr 6, 2026",
    category: "Analysis",
    image:
      "https://static.wixstatic.com/media/1da610_fb6ed218ead34b948263020a61e06b66~mv2.jpg/v1/fill/w_1110,h_455,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1da610_fb6ed218ead34b948263020a61e06b66~mv2.jpg",
  },
  {
    title: "Indian Car Sales Analysis for CY2025",
    excerpt:
      "2025 registered the highest-ever wholesale of 45,29,913 vehicles, with improvement in growth rate to 5.7% 3% to 13% GST reduction across various PV categories in September 2025 is the major growth driver in 2025,4,66,318 vehicle sales made October 2025 the best sales month in history,The Maruti Dzire became the best-selling car in 2025,Mahindra became the second-largest carmaker in 2025 ,All manufacturers offered discounts to prop up sales in 2025",
    author: "Emma Rodriguez",
    date: "Apr 5, 2026",
    category: "Deep Dive",
    image:
      "https://static.wixstatic.com/media/1da610_d3f60af0b01e477cab339065c48312f9~mv2.jpg",
  },
];

export default function Editorials() {
  return (
    <section className="bg-neutral-100 py-20">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <h2 className="text-4xl font-bold text-neutral-900 mb-2">
              Editorials
            </h2>
            <p className="text-neutral-600">
              Expert perspectives and thought leadership
            </p>
          </div>

          <button className="hidden md:flex items-center gap-2 px-6 py-3 text-blue-600 hover:text-blue-700 font-medium group">
            More Opinions
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {editorials.map((item, index) => (
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

                <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-neutral-600 text-sm mb-6">
                  {item.excerpt}
                </p>

                {/* Author */}
                <div className="flex items-center justify-between pt-5 border-t">
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>

                    <div>
                      <div className="font-medium text-sm">
                        {item.author}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-neutral-500">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-5 h-5 text-blue-600" />

                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}