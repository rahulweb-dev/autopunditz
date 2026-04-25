"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Tiptap from "@/app/components/Tiptap";

export default function EditorPage() {
  const { id } = useParams();
  const router = useRouter();

  const isEdit = id !== "new";

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const [publishAt, setPublishAt] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 LOAD BLOG (EDIT MODE)
  useEffect(() => {
    if (!isEdit) return;

    fetch(`/api/blog/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title || "");
        setCategory(data.category || "");
        setContent(data.content || "");
        setStatus(data.status || "draft");

        if (data.publishAt) {
          const date = new Date(data.publishAt);
          setPublishAt(date.toISOString().slice(0, 16));
        }
      });
  }, [id]);

  // ✅ HANDLE SAVE (FULLY FIXED)
  const handleSave = async (type) => {
    if (!title.trim()) return alert("Title required");

    let finalStatus = type;

    // 🔥 FIX 1: Auto convert publish → scheduled if future date
    if (type === "published" && publishAt) {
      const selectedTime = new Date(publishAt);
      const now = new Date();

      if (selectedTime > now) {
        finalStatus = "scheduled";
      }
    }

    // 🔥 FIX 2: Prevent scheduling without date
    if (type === "scheduled" && !publishAt) {
      return alert("Please select publish date & time");
    }

    const payload = {
      title,
      category,
      content,
      status: finalStatus,
      publishAt: publishAt ? new Date(publishAt) : null,
    };

    try {
      setLoading(true);

      const res = await fetch(
        isEdit ? `/api/blog/${id}` : "/api/blog",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to save");

      router.push("/admin/blogs");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      {/* TITLE */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter blog title..."
        className="w-full text-4xl font-bold outline-none border-b pb-2"
      />

      {/* CATEGORY */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="">Select Category</option>
        <option value="Cars">Cars</option>
        <option value="Bikes">Bikes</option>
        <option value="News">News</option>
      </select>

      {/* SCHEDULE */}
      <div>
        <label className="text-sm text-gray-600">
          Publish Date & Time (optional)
        </label>
        <input
          type="datetime-local"
          value={publishAt}
          onChange={(e) => setPublishAt(e.target.value)}
          className="border p-2 rounded w-full mt-1"
        />
      </div>

      {/* EDITOR */}
      {/* <Tiptap setContent={setContent} initialContent={content} /> */}
      <Tiptap setContent={setContent} />
      {/* ACTION BUTTONS */}
      <div className="flex gap-3 pt-4">

        <button
          onClick={() => handleSave("draft")}
          disabled={loading}
          className="px-4 py-2 border rounded"
        >
          {loading ? "Saving..." : "Save Draft"}
        </button>

        <button
          onClick={() => handleSave("published")}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Publish
        </button>

        <button
          onClick={() => handleSave("scheduled")}
          disabled={loading || !publishAt}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Schedule
        </button>

      </div>

    </div>
  );
}