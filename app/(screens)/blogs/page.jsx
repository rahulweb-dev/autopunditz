'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blog')
        const data = await res.json()
        setBlogs(data)
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }

    fetchBlogs()
  }, [])

  const formatDate = (date) => {
    if (!date) return ""
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    })
  }

  const getReadingTime = (text = "") => {
    const words = text.replace(/<[^>]+>/g, '').trim().split(/\s+/).length
    return Math.max(1, Math.ceil(words / 200)) + " min read"
  }

  if (loading) return <p className="p-6 text-center">Loading...</p>

return (
  <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-14">
    <div className="max-w-7xl mx-auto px-6">

      {/* HEADER */}
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Latest Blogs
        </h1>
        <p className="text-gray-500 mt-3">
          Discover insights, trends & stories
        </p>
      </div>

      {/* FEATURED BLOG */}
      {blogs[0] && (
        <Link href={`/blogs/${blogs[0]._id}`}>
          <div className="relative h-[400px] rounded-3xl overflow-hidden mb-16 group cursor-pointer">

            <Image
              src={
                blogs[0].content?.match(/<img.*?src="(.*?)"/)?.[1] ||
                "/placeholder.jpg"
              }
              alt={blogs[0].title}
              fill
              className="object-cover group-hover:scale-105 transition duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

            {/* TEXT */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-sm opacity-80 mb-2">
                {formatDate(blogs[0].createdAt)} • {getReadingTime(blogs[0].content)}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold leading-snug">
                {blogs[0].title}
              </h2>
            </div>
          </div>
        </Link>
      )}

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {blogs.slice(1).map((blog) => {
          const cleanText = blog.content?.replace(/<[^>]+>/g, '') || ""
          const image =
            blog.content?.match(/<img.*?src="(.*?)"/)?.[1] ||
            "/placeholder.jpg"

          return (
            <Link key={blog._id} href={`/blogs/${blog._id}`}>
              <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 cursor-pointer">

                {/* IMAGE */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />

                  {/* CATEGORY */}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 text-xs font-medium rounded-full shadow">
                    {blog.category || "General"}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-5">

                  {/* META */}
                  <div className="text-xs text-gray-400 mb-2">
                    {formatDate(blog.createdAt)} • {getReadingTime(blog.content)}
                  </div>

                  {/* TITLE */}
                  <h2 className="text-lg font-semibold leading-snug mb-2 group-hover:text-red-600 transition">
                    {blog.title}
                  </h2>

                  {/* DESC */}
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {cleanText.slice(0, 100)}...
                  </p>

                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  </div>
)
}