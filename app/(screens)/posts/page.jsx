"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import {
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";

import useBlogs from "@/hooks/useBlogs";

function extractImage(html = "") {

  const match = html.match(
    /<img[^>]+src="([^">]+)"/
  );

  return match?.[1] || "/placeholder.jpg";
}

export default function PostsPage() {

  const {
    blogs,
    isLoading,
  } = useBlogs();

  // ✅ SORT LATEST POSTS

  const posts = blogs?.sort(
    (a, b) =>
      new Date(b.createdAt) -
      new Date(a.createdAt)
  );

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
        }/${post.slug}`;

    }

    if (
      post.category ===
      "Editorials"
    ) {

      return `/editorials/${post.slug}`;

    }

    return "/";
  };

  return (

    <section className="bg-gray-50 min-h-screen py-10 sm:py-14">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER */}

        <div className="mb-10">

          <h1
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-bold
              tracking-tight
            "
          >

            Latest Posts

          </h1>

          <p className="text-gray-600 mt-3 text-base sm:text-lg">

            Explore recent automotive news, market analysis,
            editorials and sales reports.

          </p>

        </div>

        {/* LOADING */}

        {isLoading && (

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-6
            "
          >

            {[...Array(6)].map(
              (_, index) => (

                <div
                  key={index}
                  className="
                    h-[420px]
                    rounded-2xl
                    bg-gray-200
                    animate-pulse
                  "
                />

              )
            )}

          </div>

        )}

        {/* POSTS */}

        {!isLoading && (

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-6
            "
          >

            {posts?.map(
              (post, index) => (

                <Link
                  key={post._id}
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
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                    }}
                    whileHover={{
                      y: -6,
                    }}
                    className="
                      group
                      bg-white
                      rounded-2xl
                      overflow-hidden
                      border
                      border-gray-100
                      shadow-sm
                      hover:shadow-2xl
                      transition-all
                      duration-300
                      h-full
                      flex
                      flex-col
                    "
                  >

                    {/* IMAGE */}

                    <div
                      className="
                        relative
                        h-56
                        overflow-hidden
                      "
                    >

                      <Image
                        src={extractImage(
                          post.content
                        )}
                        fill
                        alt={post.title}
                        className="
                          object-cover
                          group-hover:scale-105
                          transition-transform
                          duration-500
                        "
                      />

                      {/* CATEGORY */}

                      <div className="absolute top-4 left-4">

                        <span
                          className="
                            bg-red-600
                            text-white
                            text-xs
                            font-medium
                            px-3
                            py-1
                            rounded-full
                            shadow-lg
                          "
                        >

                          {post.category}

                        </span>

                      </div>

                    </div>

                    {/* CONTENT */}

                    <div className="p-5 flex flex-col flex-1">

                      {/* TITLE */}

                      <h2
                        className="
                          text-lg
                          font-semibold
                          leading-snug
                          mb-3
                          line-clamp-2
                          min-h-[56px]
                          group-hover:text-red-600
                          transition-colors
                        "
                      >

                        {post.title}

                      </h2>

                      {/* DESCRIPTION */}

                      <p
                        className="
                          text-sm
                          text-gray-600
                          line-clamp-3
                          min-h-[72px]
                          mb-5
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
                          pt-4
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

              )
            )}

          </div>

        )}

      </div>

    </section>
  );
}