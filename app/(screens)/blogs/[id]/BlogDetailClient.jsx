'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"

export default function BlogDetailClient() {
  // The [id] folder name captures the value — here it's actually the slug string
  const { id: slug } = useParams()

  const [orderedBlogs, setOrderedBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blog/public')
        const data = await res.json()

        if (!data || data.length === 0) return

        const currentIndex = data.findIndex(b => b.slug === slug)

        if (currentIndex === -1) return

        const reordered = [
          ...data.slice(currentIndex),
          ...data.slice(0, currentIndex)
        ]

        setOrderedBlogs(reordered)

      } catch (err) {
        console.error(err)
      }
    }

    if (slug) fetchBlogs()
  }, [slug])

  if (orderedBlogs.length === 0) {
    return <p className="p-6">Loading...</p>
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-6 space-y-16">

        <Link href="/blogs" className="text-sm text-gray-500">
          ← Back to Blogs
        </Link>

        {orderedBlogs.map((blog, index) => (
          <div
            key={blog._id}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <h1 className="text-4xl font-bold mb-3">
              {blog.title}
            </h1>

            <p className="text-gray-500 mb-6">
              {blog.category}
            </p>

            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {index !== orderedBlogs.length - 1 && (
              <div className="mt-12 border-t pt-6 text-center text-gray-400 text-sm">
                Continue Reading ↓
              </div>
            )}
          </div>
        ))}

      </div>
    </div>
  )
}
