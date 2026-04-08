"use client";

import { motion } from "framer-motion";
import { User, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";

const editorials = [
  {
    title: "The Future of Autonomous Driving: Reality vs. Hype",
    excerpt:
      "Separating fact from fiction in the autonomous vehicle revolution and what it means for the industry.",
    author: "Sarah Mitchell",
    date: "Apr 7, 2026",
    category: "Opinion",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
  },
  {
    title: "Why Legacy Automakers Are Winning the EV Race",
    excerpt:
      "Traditional manufacturers leverage scale, distribution, and brand trust to compete with Tesla.",
    author: "David Chen",
    date: "Apr 6, 2026",
    category: "Analysis",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  },
  {
    title: "The Hidden Cost of the Battery Supply Chain",
    excerpt:
      "Examining environmental and geopolitical challenges in lithium and rare earth mineral sourcing.",
    author: "Emma Rodriguez",
    date: "Apr 5, 2026",
    category: "Deep Dive",
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&q=80",
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