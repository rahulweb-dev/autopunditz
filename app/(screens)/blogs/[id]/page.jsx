'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"

export default function BlogDetail() {
  const { id } = useParams()

  const [blogs, setBlogs] = useState([])
  const [orderedBlogs, setOrderedBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blog')
        const data = await res.json()

        if (!data || data.length === 0) return

        // 👉 find clicked blog index
        const currentIndex = data.findIndex(b => b._id === id)

        if (currentIndex === -1) return

        // 👉 circular order
        const reordered = [
          ...data.slice(currentIndex),
          ...data.slice(0, currentIndex)
        ]

        setBlogs(data)
        setOrderedBlogs(reordered)

      } catch (err) {
        console.error(err)
      }
    }

    if (id) fetchBlogs()
  }, [id])

  if (orderedBlogs.length === 0) {
    return <p className="p-6">Loading...</p>
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">

      <div className="max-w-3xl mx-auto px-6 space-y-16">

        {/* 🔙 BACK */}
        <Link href="/blogs" className="text-sm text-gray-500">
          ← Back to Blogs
        </Link>

        {/* 🔥 ALL BLOGS IN SEQUENCE */}
        {orderedBlogs.map((blog, index) => (

          <div
            key={blog._id}
            className="bg-white p-6 rounded-lg shadow-sm"
          >

            {/* TITLE */}
            <h1 className="text-4xl font-bold mb-3">
              {blog.title}
            </h1>

            {/* CATEGORY */}
            <p className="text-gray-500 mb-6">
              {blog.category}
            </p>

            {/* CONTENT */}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* DIVIDER BETWEEN BLOGS */}
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