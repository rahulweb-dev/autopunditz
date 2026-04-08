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
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc7b9e0473?w=800&q=80",
  },
  {
    title: "Battery Technology Breakthroughs in 2026",
    excerpt:
      "Solid-state batteries and fast-charging innovations changing the EV landscape.",
    date: "Apr 7, 2026",
    readTime: "5 min",
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1558981403-c5f9891c74f5?w=800&q=80",
  },
  {
    title: "How AI is Transforming Vehicle Design",
    excerpt:
      "Machine learning algorithms optimize aerodynamics and material selection.",
    date: "Apr 6, 2026",
    readTime: "7 min",
    category: "Innovation",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  },
  {
    title: "Consumer Trends: Shift Toward Smaller EVs",
    excerpt:
      "Compact electric vehicles gain popularity in urban markets worldwide.",
    date: "Apr 6, 2026",
    readTime: "4 min",
    category: "Market",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
  },
  {
    title: "Supply Chain Resilience in Automotive",
    excerpt:
      "Strategies automakers are using to prevent future disruptions.",
    date: "Apr 5, 2026",
    readTime: "8 min",
    category: "Business",
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&q=80",
  },
  {
    title: "Hydrogen Fuel Cells: The Comeback Story",
    excerpt:
      "Why some manufacturers are betting on hydrogen over batteries.",
    date: "Apr 5, 2026",
    readTime: "6 min",
    category: "Alternative Fuel",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=80",
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