"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { posts } from "@/app/constants/data/latestPostsData";

export default function LatestPosts() {
  return (
    <section className="bg-white py-10 sm:py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-8"
        >

          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Latest Posts
            </h2>

            <p className="text-gray-600">
              Recent articles and updates
            </p>
          </div>

          <Link
            href="/posts"
            className="flex items-center gap-2 text-red-600 font-medium"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>

        </motion.div>


        {/* Grid */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {posts.map((post, index) => (

            <Link
              key={index}
              href={`/posts/${post.slug}`}
            >

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition border cursor-pointer"
              >

                {/* Image */}

                <div className="relative h-52">

                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute top-3 left-3">
                    <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>

                </div>


                {/* Content */}

                <div className="p-5">

                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>


                  {/* Footer */}

                  <div className="flex justify-between text-xs text-gray-500 border-t pt-3">

                    <div className="flex gap-3">

                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>

                    </div>

                    <ArrowRight className="w-4 h-4 text-red-600" />

                  </div>

                </div>

              </motion.div>

            </Link>

          ))}

        </div>

      </div>
    </section>
  );
}