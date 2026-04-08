"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[calc(100vh-73px)] min-h-[600px] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="https://images.unsplash.com/photo-1774791697892-d215769d89ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920"
          alt="Automotive Dashboard"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/95 via-neutral-900/80 to-transparent" />

      {/* Content */}
      <div className="relative max-w-[1400px] mx-auto px-6 h-full flex items-center">
        <div className="max-w-2xl">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 mb-6">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">
                Market Data Updated Daily
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Automotive Intelligence
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              Powered by Data
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-neutral-300 mb-8 leading-relaxed"
          >
            Real-time market insights, sales analytics, and industry trends
            for automotive professionals and enthusiasts.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <button className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium flex items-center gap-2 transition-all hover:scale-105">
              Explore Data
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-xl font-medium border border-white/20 transition-all">
              View Reports
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap items-center gap-8 mt-12 pt-8 border-t border-white/10"
          >
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">
                2.5M+
              </div>
              <div className="text-sm text-neutral-400">Data Points</div>
            </div>

            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">
                50K+
              </div>
              <div className="text-sm text-neutral-400">
                Reports Published
              </div>
            </div>

            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">
                1000+
              </div>
              <div className="text-sm text-neutral-400">
                OEMs Tracked
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-50 to-transparent" />
    </section>
  );
}