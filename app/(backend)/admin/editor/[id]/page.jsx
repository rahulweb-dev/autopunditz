"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Tiptap from "@/app/components/Tiptap";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  const isEdit = id !== "new";

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEdit);

  // ✅ Fetch blog if edit mode
  useEffect(() => {
    if (!isEdit) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blog/${id}`);
        const data = await res.json();

        setTitle(data.title || "");
        setCategory(data.category || "");
        setContent(data.content || "");
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingData(false);
      }
    };

    fetchBlog();
  }, [id, isEdit]);

  // ✅ Save (create or update)
  const handleSave = async () => {
    if (!title) return alert("Title required");
    if (!content || content === "<p></p>") return alert("Content required");

    setLoading(true);

    const url = isEdit ? `/api/blog/${id}` : "/api/blog";
    const method = isEdit ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        category,
        content,
      }),
    });

    setLoading(false);
    alert(isEdit ? "Updated ✅" : "Created ✅");

    router.push("/admin/blogs");
  };

  if (loadingData) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* TOP BAR */}
      <div className="flex justify-between items-center px-6 py-3 border-b bg-white">
        <button onClick={() => router.back()} className="text-gray-600">
          ← Back
        </button>

        <div className="flex gap-3">
          <button onClick={handleSave} className="text-gray-600">
            {loading ? "Saving..." : "Save"}
          </button>

          <button
            onClick={handleSave}
            className="bg-black text-white px-4 py-1 rounded-full"
          >
            Publish
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* TITLE */}
        <input
          value={title}
          placeholder="Add Title"
          className="w-full text-5xl font-bold outline-none bg-transparent mb-6 placeholder-gray-400"
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* CATEGORY */}
        <select
          value={category}
          className="mb-6 text-sm text-gray-500 outline-none bg-transparent"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="cars">Cars</option>
          <option value="bikes">Bikes</option>
          <option value="news">News</option>
        </select>

        {/* EDITOR */}
        <Tiptap
          setContent={setContent}
          initialContent={content}
        />

        {/* SAVE BUTTON */}
        <div className="mt-8">
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Blog"}
          </button>
        </div>

      </div>
    </div>
  );
}