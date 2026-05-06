"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Tiptap from "@/app/components/Tiptap";
import useBlogs from "@/hooks/useBlogs";

const categoryOptions = {
  MarketAnalysis:["marketAnalysis"],
  Editorials:['editorials'],
  News: ["Cars", "Bikes", "Offers of Month"],
  Sales: [
    "Car Sales Figures",
    "Two Wheeler Sales Figures",
    "Three Wheeler Sales Statistics",
    "Tractor Sales",
    "Commercial Vehicle Sales",
    "Electric Vehicle Sales",
    "Yearly Sales Analysis",
    "Statewise Sales Figures",
    "Vehicle Registration Data",
    "Production Statistics",
    "Export Statistics",
  ],
};

export default function EditorPage() {
  const { id } = useParams();
  const router = useRouter();

  const isEdit = id !== "new";

  const { blogs, isLoading } = useBlogs();

  const blog = isEdit
    ? blogs.find((b) => b._id?.toString() === id)
    : null;

  // ✅ IMPORTANT FIX
  if (isEdit && (isLoading || !blog)) {
    return (
      <div className="p-6 text-center">
        Loading...
      </div>
    );
  }

  // ✅ STATES AFTER BLOG LOADS
  const [title, setTitle] = useState(blog?.title || "");
  const [mainCategory, setMainCategory] = useState(
    blog?.category || ""
  );

  const [subCategory, setSubCategory] = useState(
    blog?.subCategory || ""
  );

  const [content, setContent] = useState(
    blog?.content || ""
  );

  const [publishAt, setPublishAt] = useState(() => {
    if (!blog?.publishAt) return "";

    return new Date(blog.publishAt)
      .toISOString()
      .slice(0, 16);
  });

  const [loading, setLoading] = useState(false);

  const handleSave = async (type) => {
    if (!title.trim()) {
      return alert("Title required");
    }

    if (!content || content === "<p></p>") {
      return alert("Content required");
    }

    if (!mainCategory) {
      return alert("Select category");
    }

    if (!subCategory) {
      return alert("Select sub category");
    }

    let finalStatus = type;

    if (type === "published" && publishAt) {
      if (new Date(publishAt) > new Date()) {
        finalStatus = "scheduled";
      }
    }

    const payload = {
      title,
      category: mainCategory,
      subCategory,
      content,
      status: finalStatus,
      publishAt: publishAt
        ? new Date(publishAt)
        : null,
    };

    // ✅ DEBUG
    console.log("PAYLOAD:", payload);

    try {
      setLoading(true);

      const res = await fetch(
        isEdit
          ? `/api/blog/${id}`
          : "/api/blog",
        {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      console.log("RESPONSE:", data);

      if (!res.ok) {
        throw new Error(
          data.error || "Failed to save"
        );
      }

      router.push("/admin/blogs");

    } catch (err) {
      console.error(err);
      alert(err.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">
            {isEdit ? "Edit Blog" : "Create Blog"}
          </h1>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white shadow-md rounded-xl p-6 space-y-6">

          {/* TITLE */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title..."
            className="w-full text-3xl font-semibold outline-none border-b pb-2 focus:border-black transition"
          />

          {/* CATEGORY ROW */}
          <div className="grid md:grid-cols-2 gap-4">

            {/* MAIN CATEGORY */}
            <div>
              <label className="text-sm text-gray-500">Main Category</label>
              <select
                value={mainCategory}
                onChange={(e) => {
                  const selected = e.target.value;
                  setMainCategory(selected);
                  setSubCategory("");
                }}
                className="w-full mt-1 border p-2 rounded-lg focus:ring-2 focus:ring-black"
              >
                <option value="">Select</option>
                {Object.keys(categoryOptions).map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* SUB CATEGORY */}
            <div>
              <label className="text-sm text-gray-500">Sub Category</label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full mt-1 border p-2 rounded-lg focus:ring-2 focus:ring-black"
              >
                <option value="">Select</option>
                {categoryOptions[mainCategory]?.map((sub) => (
                  <option key={sub}>{sub}</option>
                ))}
              </select>
            </div>

          </div>

          {/* SCHEDULE */}
          <div>
            <label className="text-sm text-gray-500">
              Publish Date & Time
            </label>
            <input
              type="datetime-local"
              value={publishAt}
              onChange={(e) => setPublishAt(e.target.value)}
              className="w-full mt-1 border p-2 rounded-lg focus:ring-2 focus:ring-black"
            />
          </div>

          {/* EDITOR */}
          <div className="border rounded-lg p-3">
            <Tiptap
              key={id}
              setContent={setContent}
            // initialContent={content}
            />
          </div>
        </div>

        {/* ACTION BAR */}
        <div className="flex justify-end gap-3 sticky bottom-4 bg-white p-4 rounded-xl shadow-md">

          <button
            onClick={() => handleSave("draft")}
            disabled={loading}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Save Draft
          </button>

          <button
            onClick={() => handleSave("published")}
            disabled={loading}
            className="px-4 py-2 bg-black text-white rounded-lg hover:opacity-90"
          >
            Publish
          </button>

          <button
            onClick={() => handleSave("scheduled")}
            disabled={loading || !publishAt}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:opacity-90"
          >
            Schedule
          </button>

        </div>

      </div>
    </div>
  );
}