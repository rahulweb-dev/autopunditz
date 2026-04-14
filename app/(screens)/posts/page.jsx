"use client";

import Image from "next/image";
import Link from "next/link";
import { posts } from "@/app/constants/data/latestPostsData";

export default function PostsPage() {

  return (

    <section className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-semibold mb-8">
        Latest Posts
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {posts.map((post) => (

          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
          >

            <div className="border rounded-xl overflow-hidden">

              <div className="relative h-52">

                <Image
                  src={post.image}
                  fill
                  alt=""
                  className="object-cover"
                />

              </div>

              <div className="p-4">

                <h3 className="font-semibold">
                  {post.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {post.excerpt}
                </p>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>

  )

}