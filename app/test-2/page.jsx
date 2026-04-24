"use client";

import { useState } from "react";
import Tiptap from "../components/Tiptap";
import { useRouter } from "next/navigation";

export default function Page() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSave = async () => {
    if (!title) return alert("Title is required");
    if (!content || content === "<p></p>")
      return alert("Content is required");

    setLoading(true);

    await fetch("/api/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        category,
        content,
      }),
    });

    setLoading(false);
    alert("Saved ✅");
    router.push("/admin/blogs");
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">

      {/* 🔝 TOP BAR */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b shadow-sm px-6 py-3 flex justify-between items-center">

        <button
          onClick={() => router.back()}
          className="text-gray-500 hover:text-black transition text-sm"
        >
          ← Back
        </button>

        <div className="flex items-center gap-3">

          <button
            onClick={handleSave}
            disabled={loading}
            className="text-gray-600 hover:text-black transition text-sm"
          >
            {loading ? "Saving..." : "Save Draft"}
          </button>

          <button
            onClick={handleSave}
            className="bg-black text-white px-5 py-1.5 rounded-full text-sm hover:bg-gray-800 transition"
          >
            Publish
          </button>

        </div>
      </div>

      {/* 🧱 MAIN */}
      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* 📝 EDITOR CARD */}
        <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-6">

          {/* TITLE */}
          <input
            value={title}
            placeholder="Untitled Article..."
            className="w-full text-4xl md:text-5xl font-bold outline-none placeholder-gray-300 leading-tight"
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* CATEGORY */}
          <div className="flex items-center gap-3">

            <span className="text-sm text-gray-400">Category:</span>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-sm bg-gray-100 px-3 py-1.5 rounded-full outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select</option>
              <option value="Cars">Cars</option>
              <option value="Bikes">Bikes</option>
              <option value="EV">EV</option>
              <option value="News">News</option>
            </select>

          </div>

          {/* ✏️ EDITOR */}
          <div className="border-t pt-6">

            <div className="sticky top-[60px] z-10 bg-white pb-2">
              <Tiptap setContent={setContent} />
            </div>

          </div>

        </div>

        {/* 💾 SAVE BUTTON */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-black text-white px-8 py-3 rounded-full text-sm hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Blog"}
          </button>
        </div>

      </div>
    </div>
  );
}