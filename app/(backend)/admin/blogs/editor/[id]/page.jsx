"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import useBlogs from "@/hooks/useBlogs";

const Tiptap = dynamic(() => import("@/app/components/Tiptap"), { ssr: false });

const DEFAULT_OG = "/default-news.jpg";

const categoryOptions = {
  MarketAnalysis: ["marketAnalysis"],
  Editorials: ["editorials"],
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

  // ── All state declarations at top (no hooks after conditional) ──
  const [userRole, setUserRole] = useState("");
  const [title, setTitle] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [content, setContent] = useState("");
  const [publishAt, setPublishAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [populated, setPopulated] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((d) => { if (d.success) setUserRole(d.user.role); })
      .catch(() => {});
  }, []);

  // Populate state when blog loads in edit mode (runs once)
  useEffect(() => {
    if (!isEdit || isLoading || populated) return;

    const blog = blogs.find((b) => b.slug === id);
    if (!blog) return;

    setTitle(blog.title || "");
    setMetaTitle(blog.metaTitle || "");
    setMetaDescription(blog.metaDescription || "");
    setKeywords(blog.keywords || "");
    setMainCategory(blog.category || "");
    setSubCategory(blog.subCategory || "");
    setContent(blog.content || "");
    setPublishAt(
      blog.publishAt
        ? new Date(blog.publishAt).toISOString().slice(0, 16)
        : ""
    );
    setPopulated(true);
  }, [blogs, isLoading, isEdit, id, populated]);

  // Auto-fill metaTitle from title when creating new (functional update avoids dep on metaTitle)
  useEffect(() => {
    if (!isEdit && title) {
      setMetaTitle((prev) => prev || title.slice(0, 60));
    }
  }, [title, isEdit]);

  // Auto-fill metaDescription from content when creating new
  useEffect(() => {
    if (!isEdit && content) {
      const plain = content.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
      setMetaDescription((prev) => prev || plain.slice(0, 160));
    }
  }, [content, isEdit]);

  // Manual refresh — overwrites SEO fields from latest title + content
  const refreshSeo = () => {
    if (title) setMetaTitle(title.slice(0, 60));
    if (content) {
      const plain = content.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
      setMetaDescription(plain.slice(0, 160));
    }
  };

  const extractFirstImage = (html) => {
    if (!html) return DEFAULT_OG;
    return html.match(/<img[^>]+src="([^"]+)"/)?.[1] || DEFAULT_OG;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!metaTitle.trim()) newErrors.metaTitle = "Meta title is required";
    if (!metaDescription.trim()) newErrors.metaDescription = "Meta description is required";
    if (!keywords.trim()) newErrors.keywords = "Keywords are required";
    if (!mainCategory) newErrors.mainCategory = "Select main category";
    if (!subCategory) newErrors.subCategory = "Select sub category";
    if (!content.replace(/<[^>]+>/g, "").trim()) newErrors.content = "Content is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (type) => {
    if (!validateForm()) return;

    let finalStatus = type;
    if (type === "published" && publishAt) {
      if (new Date(publishAt) > new Date()) finalStatus = "scheduled";
    }

    const payload = {
      title,
      metaTitle: metaTitle || title,
      metaDescription,
      keywords,
      ogImage: extractFirstImage(content),
      imageAlt: title,
      category: mainCategory,
      subCategory,
      content,
      status: finalStatus,
      publishAt: publishAt ? new Date(publishAt) : null,
    };

    try {
      setLoading(true);

      // id is the slug when editing (URL: /admin/blogs/editor/my-slug)
      const res = await fetch(isEdit ? `/api/blog/${id}` : "/api/blog", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to save");
      if (!data._id && !data.slug) throw new Error("Unexpected server response");

      router.push("/admin/blogs");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Loading screen (no early return before hooks anymore)
  if (isEdit && (isLoading || !populated)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb]">

      {/* HEADER */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black">
              {isEdit ? "Edit Article" : "Create Article"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Automobile news editor &amp; SEO management
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => handleSave("draft")}
              disabled={loading}
              className="h-11 px-5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50"
            >
              Save Draft
            </button>

            <button
              onClick={() => handleSave("scheduled")}
              disabled={loading || !publishAt}
              className="h-11 px-5 rounded-xl bg-[#2D2D2D] hover:bg-[#444] text-white"
            >
              Schedule
            </button>

            <button
              onClick={() => handleSave("published")}
              disabled={loading}
              className="h-11 px-6 rounded-xl bg-black hover:bg-gray-800 text-white font-semibold"
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid xl:grid-cols-[1fr_380px] gap-8">

          {/* LEFT */}
          <div className="space-y-6">

            {/* TITLE */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
              <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Article Title
              </label>
              <textarea
                rows={2}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Write headline..."
                className={`w-full text-5xl font-black leading-tight outline-none resize-none mt-4 ${
                  errors.title ? "border-red-500" : ""
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-2">{errors.title}</p>
              )}
            </div>

            {/* EDITOR */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-8 py-5 border-b border-gray-100">
                <h2 className="text-2xl font-bold">Content Editor</h2>
              </div>
              <div className="p-6">
                <Tiptap key={id} setContent={setContent} initialContent={content} />
                {errors.content && (
                  <p className="text-red-500 text-sm mt-4">{errors.content}</p>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* PUBLISH */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold mb-6">Publish Settings</h2>
              <div className="space-y-5">

                {/* MAIN CATEGORY */}
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Main Category
                  </label>
                  <select
                    value={mainCategory}
                    onChange={(e) => {
                      setMainCategory(e.target.value);
                      setSubCategory("");
                    }}
                    className="w-full mt-2 h-12 px-4 rounded-2xl border border-gray-200 bg-gray-50 outline-none"
                  >
                    <option value="">Select</option>
                    {Object.keys(categoryOptions).map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.mainCategory && (
                    <p className="text-red-500 text-sm mt-2">{errors.mainCategory}</p>
                  )}
                </div>

                {/* SUB CATEGORY */}
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Sub Category
                  </label>
                  <select
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className={`w-full mt-2 h-12 px-4 rounded-2xl border bg-gray-50 outline-none ${
                      errors.subCategory ? "border-red-500" : "border-gray-200"
                    }`}
                  >
                    <option value="">Select</option>
                    {categoryOptions[mainCategory]?.map((sub) => (
                      <option key={sub}>{sub}</option>
                    ))}
                  </select>
                  {errors.subCategory && (
                    <p className="text-red-500 text-sm mt-2">{errors.subCategory}</p>
                  )}
                </div>

                {/* DATE */}
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Publish Date
                  </label>
                  <input
                    type="datetime-local"
                    value={publishAt}
                    onChange={(e) => setPublishAt(e.target.value)}
                    className="w-full mt-2 h-12 px-4 rounded-2xl border border-gray-200 bg-gray-50 outline-none"
                  />
                </div>

              </div>
            </div>

            {/* SEO — admin only */}
            {userRole === "admin" && <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-2xl font-bold">SEO Settings</h2>
                <button
                  type="button"
                  onClick={refreshSeo}
                  title="Re-generate meta title and description from current title and content"
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
                >
                  ↻ Refresh from Content
                </button>
              </div>

              <div className="p-6 space-y-5">

                {/* META TITLE */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Meta Title
                    </label>
                    <span className={`text-xs ${metaTitle.length > 60 ? "text-red-500 font-bold" : metaTitle.length > 50 ? "text-yellow-500" : "text-gray-400"}`}>
                      {metaTitle.length}/60
                    </span>
                  </div>
                  <input
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="SEO title (auto-filled from article title)..."
                    className={`w-full h-12 px-4 rounded-2xl border bg-gray-50 outline-none ${
                      errors.metaTitle ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {errors.metaTitle && (
                    <p className="text-red-500 text-sm mt-2">{errors.metaTitle}</p>
                  )}
                </div>

                {/* META DESCRIPTION */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Meta Description
                    </label>
                    <span className={`text-xs ${metaDescription.length > 160 ? "text-red-500 font-bold" : metaDescription.length > 140 ? "text-yellow-500" : "text-gray-400"}`}>
                      {metaDescription.length}/160
                    </span>
                  </div>
                  <textarea
                    rows={5}
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="SEO description (auto-filled from content)..."
                    className={`w-full p-4 rounded-2xl border bg-gray-50 outline-none resize-none ${
                      errors.metaDescription ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {errors.metaDescription && (
                    <p className="text-red-500 text-sm mt-2">{errors.metaDescription}</p>
                  )}
                </div>

                {/* KEYWORDS */}
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Keywords
                  </label>
                  <input
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="e.g. hyundai creta, tata punch ev, electric car india"
                    className={`w-full mt-2 h-12 px-4 rounded-2xl border bg-gray-50 outline-none ${
                      errors.keywords ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  <p className="text-xs text-gray-400 mt-1.5">
                    Comma-separated. Include brand names, model names, and topic keywords.
                  </p>
                  {errors.keywords && (
                    <p className="text-red-500 text-sm mt-2">{errors.keywords}</p>
                  )}
                </div>

              </div>
            </div>}

          </div>
        </div>
      </div>
    </div>
  );
}
