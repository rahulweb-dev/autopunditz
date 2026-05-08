"use client";

import { motion } from "framer-motion";

import {
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import useBlogs from "@/hooks/useBlogs";

function extractImage(html = "") {

  const match = html.match(
    /<img[^>]+src="([^">]+)"/
  );

  return match?.[1] || "/placeholder.jpg";
}

export default function LatestPosts() {

  const {
    blogs,
    isLoading,
  } = useBlogs();

  // ✅ ONLY LATEST 3 POSTS

  const posts = blogs
    ?.sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 3);

  // ✅ ROUTES

  const getRoute = (post) => {

    if (
      post.category === "News"
    ) {

      return `/${post.subCategory
        ?.toLowerCase()
        }/${post.slug}`;

    }

    if (
      post.category ===
      "MarketAnalysis"
    ) {

      return `/market-analysis/${post.slug}`;

    }

    if (
      post.category === "Sales"
    ) {

      return `/sales-analysis/${post.subCategory
        ?.toLowerCase()
        .replace(/\s+/g, "-")
        }/${post._id}`;

    }

    if (
      post.category ===
      "Editorials"
    ) {

      return `/editorials/${post._id}`;

    }

    return "/";
  };

  return (

    <section className="bg-white py-10 sm:py-14 lg:py-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >

          <div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">

              Latest Posts

            </h2>

            <p className="text-gray-600 mt-1">

              Recent articles and updates

            </p>

          </div>

          <Link
            href="/posts"
            className="
              flex
              items-center
              gap-2
              text-red-600
              font-medium
              hover:gap-3
              transition-all
            "
          >

            View All

            <ArrowRight className="w-4 h-4" />

          </Link>

        </motion.div>

        {/* LOADING */}

        {isLoading && (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {[...Array(3)].map(
              (_, index) => (

                <div
                  key={index}
                  className="
                    animate-pulse
                    bg-gray-100
                    rounded-2xl
                    h-[420px]
                  "
                />

              )
            )}

          </div>

        )}

        {/* POSTS */}

        {!isLoading && (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {posts.map((post, index) => (

              <Link
                key={post.slug}
                href={getRoute(post)}
              >

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                  }}
                  className="
                    bg-white
                    rounded-2xl
                    overflow-hidden
                    shadow-md
                    hover:shadow-2xl
                    transition-all
                    duration-300
                    border
                    border-gray-100
                    cursor-pointer
                    h-full
                    flex
                    flex-col
                    group
                  "
                >

                  {/* IMAGE */}

                  <div className="relative h-52 w-full overflow-hidden">

                    <Image
                      src={extractImage(
                        post.content
                      )}
                      alt={post.title}
                      fill
                      className="
                        object-cover
                        group-hover:scale-105
                        transition-transform
                        duration-500
                      "
                    />

                    {/* CATEGORY */}

                    <div className="absolute top-3 left-3">

                      <span
                        className="
                          bg-red-600
                          text-white
                          text-xs
                          px-3
                          py-1
                          rounded-full
                          font-medium
                          shadow-md
                        "
                      >

                        {post.category}

                      </span>

                    </div>

                  </div>

                  {/* CONTENT */}

                  <div className="p-5 flex flex-col flex-1">

                    {/* TITLE */}

                    <h3
                      className="
                        font-semibold
                        text-lg
                        leading-snug
                        mb-3
                        line-clamp-2
                        min-h-[56px]
                        group-hover:text-red-600
                        transition-colors
                      "
                    >

                      {post.title}

                    </h3>

                    {/* DESCRIPTION */}

                    <p
                      className="
                        text-sm
                        text-gray-600
                        mb-5
                        line-clamp-3
                        min-h-[72px]
                      "
                    >

                      {post.metaDescription ||
                        "Read full article..."}

                    </p>

                    <div className="flex-1" />

                    {/* FOOTER */}

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        border-t
                        pt-3
                        text-xs
                        text-gray-500
                      "
                    >

                      <div className="flex items-center gap-4">

                        <span className="flex items-center gap-1">

                          <Calendar className="w-3 h-3" />

                          {new Date(
                            post.createdAt
                          ).toLocaleDateString()}

                        </span>

                        <span className="flex items-center gap-1">

                          <Clock className="w-3 h-3" />

                          5 min read

                        </span>

                      </div>

                      <ArrowRight
                        className="
                          w-4
                          h-4
                          text-red-600
                          group-hover:translate-x-1
                          transition-transform
                        "
                      />

                    </div>

                  </div>

                </motion.div>

              </Link>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}