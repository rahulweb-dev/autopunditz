"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import Image from "next/image";

const posts = [
  {
    title: "Understanding the New Euro 7 Emission Standards",
    excerpt:
      "What automakers need to know about the latest European emission regulations.",
    date: "Apr 7, 2026",
    readTime: "6 min",
    category: "Regulation",
    image: "https://static.wixstatic.com/media/1da610_5461451e916542b9846eccc35a589408~mv2.jpg/v1/fill/w_138,h_244,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/1da610_5461451e916542b9846eccc35a589408~mv2.jpg"
  },
  {
    title: "Discounts and Offers on Tata Motors Cars for April 2026",
    excerpt:
      "April 2026 marks a significant push for Tata Motors as they rollout a comprehensive suite of benefits across their Internal Combustion Engine (ICE) and Electric Vehicle (EV) portfolios. With the fiscal year in full swing, the homegrown automaker is targeting aggressive growth through high-value Green Bonuses for EVs and tiered consumer discounts for their popular New Forever range.",
    date: "Apr 7, 2026",
    readTime: "5 min",
    category: "Technology",
    image:
      "https://static.wixstatic.com/media/eb34fb_ebad4c6cf19a43449010597e3b7c2d80~mv2.png/v1/fill/w_1110,h_617,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/eb34fb_ebad4c6cf19a43449010597e3b7c2d80~mv2.png",
  },
  {
    title: "How AI is Transforming Vehicle Design",
    excerpt:
      "In March 2026, the Czech automaker recorded total sales of 7,928 units, achieving a 7% Year-on-Year (YoY) growth and a substantial 25% Month-on-Month (MoM) jump compared to February. The data reveals a brand successfully navigating a transitional phase, with its India 2.0 models continuing to bear the brunt of the volume requirements..",
    date: "Apr 6, 2026",
    readTime: "7 min",
    category: "Innovation",
    image:
      "https://static.wixstatic.com/media/1da610_7f4eb9124ae4470fa008e3d5c7d5c210~mv2.png/v1/fill/w_1110,h_251,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1da610_7f4eb9124ae4470fa008e3d5c7d5c210~mv2.png ",
  },
  {
    title: "Renault India Sales March 2026: 77% YoY Growth, Duster Relaunch Boosts Volumes",
    excerpt:
      "Renault India posted a robust performance in March 2026, registering total sales of 5,046 units, marking a strong 77% year-on-year (YoY) growth compared to 2,846 units in March 2025. However, on a month-on-month (MoM) basis, sales declined by 15%, indicating some cooling after February’s momentum.",
    date: "Apr 6, 2026",
    readTime: "4 min",
    category: "Market",
    image:
      "https://static.wixstatic.com/media/1da610_bdfdb767c68a4521a9c0a9f55e3de7b2~mv2.jpg/v1/fill/w_276,h_276,fp_0.50_0.50,lg_1,q_90,enc_avif,quality_auto/1da610_bdfdb767c68a4521a9c0a9f55e3de7b2~mv2.jpg",
  },
  {
    title: "Discounts and Offers on Volkswagen Cars for April 2026",
    excerpt:
      "April 2026 brings a wave of aggressive promotional schemes from Volkswagen India, aimed at stimulating the premium mid-size SUV and sedan segments. As part of the Customer Benefit Program-April 2026, the German automaker has rolled out a multi-tiered discount structure involving cash supports, liquidation bonuses for 2025 inventory, and enhanced loyalty perks.",
    date: "Apr 5, 2026",
    readTime: "8 min",
    category: "Business",
    image:
      "https://static.wixstatic.com/media/eb34fb_2a57fb9c243a4d2f9733365b7368eee1~mv2.png/v1/fill/w_1110,h_608,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/eb34fb_2a57fb9c243a4d2f9733365b7368eee1~mv2.png",
  },
  {
    title: "Skoda India Sales Analysis: March 2026",
    excerpt:
      "In March 2026, the Czech automaker recorded total sales of 7,928 units, achieving a 7% Year-on-Year (YoY) growth and a substantial 25% Month-on-Month (MoM) jump compared to February. The data reveals a brand successfully navigating a transitional phase, with its India 2.0 models continuing to bear the brunt of the volume requirements.",
    date: "Apr 5, 2026",
    readTime: "6 min",
    category: "Alternative Fuel",
    image:
      "https://static.wixstatic.com/media/1da610_7f4eb9124ae4470fa008e3d5c7d5c210~mv2.png/v1/fill/w_1110,h_251,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1da610_7f4eb9124ae4470fa008e3d5c7d5c210~mv2.png",
  },
];

export default function LatestPosts() {
  return (
    <section className="container mx-auto  px-6 py-16">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-between mb-10"
      >
        <div>
          <h2 className="text-4xl font-bold text-neutral-900 mb-2">
            Latest Posts
          </h2>
          <p className="text-neutral-600">
            Recent articles and updates
          </p>
        </div>

        <button className="hidden md:flex items-center gap-2 px-6 py-3 text-blue-600 hover:text-blue-700 font-medium group">
          All Posts
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {posts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -6 }}
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
          >

            {/* Background Image */}
            <div className="relative h-[320px]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-medium flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition">
                  {post.title}
                </h3>

                <p className="text-sm text-white/80">
                  {post.excerpt}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/20">

                <div className="flex items-center gap-3 text-xs text-white/80">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>

            </div>

          </motion.div>
        ))}

      </div>
    </section>
  );
}