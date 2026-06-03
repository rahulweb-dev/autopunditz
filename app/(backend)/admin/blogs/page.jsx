"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Plus, Pencil, Trash2, Eye, Search,
  ChevronLeft, ChevronRight, X,
  FileText, LayoutGrid, List, Filter,
} from "lucide-react";
import useSWR from "swr";

const fetcher = (u) => fetch(u).then((r) => r.json());

const STATUS_META = {
  published: { label: "Published", bg: "bg-[#E53935]/10", text: "text-[#E53935]",  dot: "bg-[#E53935]" },
  draft:     { label: "Draft",     bg: "bg-[#888]/10",    text: "text-[#888888]",  dot: "bg-[#888888]" },
  scheduled: { label: "Scheduled", bg: "bg-[#2D2D2D]/10", text: "text-[#2D2D2D]", dot: "bg-[#2D2D2D]" },
};

const STATUSES = ["all", "published", "draft", "scheduled"];

const CATEGORY_OPTIONS = {
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

const CAT_LABEL = {
  MarketAnalysis: "Market Analysis",
  Editorials: "Editorials",
  News: "News",
  Sales: "Sales",
};

// Extract thumbnail — prefer saved ogImage, fallback to first img in content
const getThumbnail = (b) =>
  (b.ogImage && b.ogImage !== "/default-news.jpg" ? b.ogImage : null) ||
  b.content?.match(/<img[^>]+src="([^"]+)"/)?.[1] ||
  null;

const fmt = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function BlogsPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);
  const [search, setSearch] = useState("");
  const [catF, setCatF] = useState("all");
  const [statusF, setStatusF] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;
  const [view, setView] = useState("grid");
  const [preview, setPreview] = useState(null);
  const [delConfirm, setDelConfirm] = useState(null);
  const [toast, setToast] = useState(null);
  const [sel, setSel] = useState([]);

  const [subCatF, setSubCatF] = useState("all");

  const { data, mutate } = useSWR("/api/blog", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 30000,
  });

  const blogs = useMemo(() => Array.isArray(data) ? data : data?.data || [], [data]);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((d) => { if (d.success) setUserRole(d.user.role); })
      .catch(() => {});
  }, []);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  // ── STATS ──
  const stats = useMemo(() => ({
    total: blogs.length,
    published: blogs.filter((b) => b.status === "published").length,
    draft: blogs.filter((b) => b.status === "draft").length,
    scheduled: blogs.filter((b) => b.status === "scheduled").length,
  }), [blogs]);

  // ── FILTER + SORT ──
  const filtered = useMemo(() => {
    const sorters = {
      latest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      oldest: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      az: (a, b) => (a.title || "").localeCompare(b.title || ""),
      views: (a, b) => (b.views || 0) - (a.views || 0),
    };
    return blogs
      .filter((b) =>
        (statusF === "all" || b.status === statusF) &&
        (catF === "all" || b.category === catF) &&
        (subCatF === "all" || b.subCategory === subCatF) &&
        (b.title || "").toLowerCase().includes(search.toLowerCase())
      )
      .sort(sorters[sortBy]);
  }, [blogs, statusF, catF, subCatF, search, sortBy]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // ── STATUS UPDATE ──
  const updateStatus = async (slug, status) => {
    const res = await fetch(`/api/blog/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) { showToast("error", "Status update failed"); return; }
    mutate((prev) => {
      const arr = Array.isArray(prev) ? prev : prev?.data || [];
      return arr.map((b) => b.slug === slug ? { ...b, status } : b);
    }, false);
  };

  // ── DELETE ──
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/blog/${delConfirm}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      mutate((prev) => {
        const arr = Array.isArray(prev) ? prev : prev?.data || [];
        return arr.filter((b) => b.slug !== delConfirm);
      }, false);
      setDelConfirm(null);
      showToast("success", "Blog deleted successfully");
    } catch (err) {
      showToast("error", err.message || "Delete failed");
    }
  };

  // ── BULK DELETE ──
  const bulkDelete = async () => {
    if (!sel.length) return;
    try {
      const results = await Promise.all(
        sel.map((slug) => fetch(`/api/blog/${slug}`, { method: "DELETE" }))
      );
      const failed = results.filter((r) => !r.ok).length;
      mutate((prev) => {
        const arr = Array.isArray(prev) ? prev : prev?.data || [];
        return arr.filter((b) => !sel.includes(b.slug));
      }, false);
      setSel([]);
      if (failed > 0) showToast("error", `${failed} deletion(s) failed`);
      else showToast("success", `${sel.length} blogs deleted`);
    } catch (err) {
      showToast("error", err.message || "Bulk delete failed");
    }
  };

  const toggleSel = (slug) =>
    setSel((p) => p.includes(slug) ? p.filter((x) => x !== slug) : [...p, slug]);

  const s = (fn, resetSub = false) => (...a) => { fn(...a); setPage(1); if (resetSub) setSubCatF("all"); };

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-6 md:p-8">

      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Blog Posts</h1>
          <p className="text-sm text-gray-500 mt-1">
            {stats.total} total · {stats.published} published · {stats.draft} drafts
          </p>
        </div>
        <Link href="/admin/blogs/editor/new">
          <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl font-semibold text-sm shadow-lg shadow-red-200 transition-all hover:-translate-y-0.5">
            <Plus size={16} />
            New Post
          </button>
        </Link>
      </div>

      {/* ── STATS CARDS ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Posts", value: stats.total, color: "from-[#2D2D2D] to-[#555]",        onClick: () => { s(setStatusF)("all"); setCatF("all"); setSubCatF("all"); } },
          { label: "Published",   value: stats.published, color: "from-[#E53935] to-[#c62828]", onClick: () => s(setStatusF)("published") },
          { label: "Drafts",      value: stats.draft, color: "from-[#888] to-[#666]",           onClick: () => s(setStatusF)("draft") },
          { label: "Scheduled",   value: stats.scheduled, color: "from-[#2D2D2D] to-[#E53935]", onClick: () => s(setStatusF)("scheduled") },
        ].map(({ label, value, color, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            className={`bg-gradient-to-r ${color} rounded-2xl p-5 text-white text-left shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5`}
          >
            <p className="text-3xl font-black">{value}</p>
            <p className="text-sm opacity-80 mt-1">{label}</p>
          </button>
        ))}
      </div>

      {/* ── FILTERS ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 shadow-sm">
        <div className="flex flex-wrap gap-3 items-center">

          {/* SEARCH */}
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search posts…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full h-10 pl-9 pr-4 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-400 bg-gray-50"
            />
          </div>

          {/* CATEGORY */}
          <select
            value={catF}
            onChange={(e) => s(setCatF, true)(e.target.value)}
            className="h-10 px-3 border border-gray-200 rounded-xl text-sm outline-none bg-gray-50 cursor-pointer"
          >
            <option value="all">All Categories</option>
            {Object.keys(CATEGORY_OPTIONS).map((c) => (
              <option key={c} value={c}>{CAT_LABEL[c]}</option>
            ))}
          </select>

          {/* SUBCATEGORY — only shown when a main category is selected */}
          {catF !== "all" && (
            <select
              value={subCatF}
              onChange={(e) => s(setSubCatF)(e.target.value)}
              className="h-10 px-3 border border-gray-200 rounded-xl text-sm outline-none bg-gray-50 cursor-pointer"
            >
              <option value="all">All Sub-categories</option>
              {(CATEGORY_OPTIONS[catF] || []).map((sc) => (
                <option key={sc} value={sc}>{sc}</option>
              ))}
            </select>
          )}

          {/* STATUS */}
          <select
            value={statusF}
            onChange={(e) => s(setStatusF)(e.target.value)}
            className="h-10 px-3 border border-gray-200 rounded-xl text-sm outline-none bg-gray-50 cursor-pointer"
          >
            <option value="all">All Status</option>
            {STATUSES.filter((s) => s !== "all").map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>

          {/* SORT */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-10 px-3 border border-gray-200 rounded-xl text-sm outline-none bg-gray-50 cursor-pointer"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
            <option value="az">A → Z</option>
            <option value="views">Most Views</option>
          </select>

          {/* VIEW TOGGLE */}
          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
            <button
              onClick={() => setView("grid")}
              className={`w-10 h-10 flex items-center justify-center transition ${view === "grid" ? "bg-red-500 text-white" : "text-gray-500 hover:bg-gray-100"}`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`w-10 h-10 flex items-center justify-center transition ${view === "list" ? "bg-red-500 text-white" : "text-gray-500 hover:bg-gray-100"}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ── BULK BAR ── */}
      {sel.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-3 mb-4 flex items-center gap-4 flex-wrap">
          <span className="text-sm font-semibold text-red-700">{sel.length} selected</span>
          {userRole === "admin" && (
            <>
              <button onClick={() => Promise.all(sel.map((s) => updateStatus(s, "published"))).then(() => { setSel([]); showToast("success", "Published"); })}
                className="text-xs px-3 py-1.5 rounded-lg bg-[#E53935]/10 text-[#E53935] font-semibold hover:bg-[#E53935]/20 transition">
                Publish All
              </button>
              <button onClick={() => Promise.all(sel.map((s) => updateStatus(s, "draft"))).then(() => { setSel([]); showToast("success", "Moved to draft"); })}
                className="text-xs px-3 py-1.5 rounded-lg bg-[#888]/10 text-[#888] font-semibold hover:bg-[#888]/20 transition">
                Draft All
              </button>
            </>
          )}
          <button onClick={bulkDelete} className="text-xs px-3 py-1.5 rounded-lg bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition">
            Delete All
          </button>
          <button onClick={() => setSel([])} className="ml-auto text-gray-400 hover:text-gray-600">
            <X size={16} />
          </button>
        </div>
      )}

      {/* ── EMPTY STATE ── */}
      {paged.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileText size={28} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700">No posts found</h3>
          <p className="text-sm text-gray-400 mt-1">Try changing your filters or create a new post</p>
          <Link href="/admin/blogs/editor/new">
            <button className="mt-5 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition">
              Create First Post
            </button>
          </Link>
        </div>
      )}

      {/* ── GRID VIEW ── */}
      {view === "grid" && paged.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          {paged.map((b) => {
            const thumb = getThumbnail(b);
            const sm = STATUS_META[b.status] || STATUS_META.draft;
            return (
              <div key={b.slug} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group flex flex-col">

                {/* THUMBNAIL */}
                <div className="relative h-[180px] bg-gray-100 overflow-hidden">
                  {thumb ? (
                    <img src={thumb} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText size={36} className="text-gray-300" />
                    </div>
                  )}

                  {/* STATUS BADGE */}
                  <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${sm.bg} ${sm.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${sm.dot}`} />
                    {sm.label}
                  </div>

                  {/* CATEGORY */}
                  {b.category && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-sm">
                      {b.category}
                    </div>
                  )}

                  {/* SELECT CHECKBOX */}
                  <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition">
                    <input
                      type="checkbox"
                      checked={sel.includes(b.slug)}
                      onChange={() => toggleSel(b.slug)}
                      className="w-4 h-4 accent-red-500 rounded cursor-pointer"
                    />
                  </div>
                </div>

                {/* BODY */}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-gray-900 text-[15px] leading-snug line-clamp-2 mb-2">
                    {b.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-gray-400 mt-auto">
                    <span>{fmt(b.createdAt)}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Eye size={11} />
                      {(b.views || 0).toLocaleString()}
                    </span>
                    {b.subCategory && (
                      <>
                        <span>·</span>
                        <span className="truncate max-w-[90px]">{b.subCategory}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="px-4 pb-4 flex items-center gap-2">
                  <Link href={`/admin/blogs/editor/${b.slug}`} className="flex-1">
                    <button className="w-full h-9 rounded-xl bg-[#2D2D2D]/5 hover:bg-[#2D2D2D]/10 text-[#2D2D2D] text-xs font-semibold flex items-center justify-center gap-1.5 transition">
                      <Pencil size={13} /> Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => setPreview(b)}
                    className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 flex items-center justify-center transition"
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    onClick={() => setDelConfirm(b.slug)}
                    className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── LIST VIEW ── */}
      {view === "list" && paged.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm mb-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="py-3 px-4 w-10">
                  <input type="checkbox" className="w-4 h-4 accent-red-500 cursor-pointer"
                    checked={sel.length === paged.length && paged.length > 0}
                    onChange={() => setSel(sel.length === paged.length ? [] : paged.map((b) => b.slug))} />
                </th>
                {["Post", "Category", "Status", "Views", "Date", "Actions"].map((h, i) => (
                  <th key={i} className={`py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide ${i === 0 ? "text-left" : i === 5 ? "text-right" : "text-center"}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((b) => {
                const thumb = getThumbnail(b);
                const sm = STATUS_META[b.status] || STATUS_META.draft;
                return (
                  <tr key={b.slug} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="py-3 px-4">
                      <input type="checkbox" className="w-4 h-4 accent-red-500 cursor-pointer"
                        checked={sel.includes(b.slug)} onChange={() => toggleSel(b.slug)} />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-11 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          {thumb ? (
                            <img src={thumb} alt={b.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FileText size={16} className="text-gray-300" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm line-clamp-1 max-w-[280px]">{b.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[200px]">/blog/{b.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-xs font-medium text-gray-600">{b.category || "—"}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <select
                        value={b.status}
                        onChange={(e) => updateStatus(b.slug, e.target.value)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full outline-none cursor-pointer border ${sm.bg} ${sm.text} border-transparent`}
                      >
                        {["draft", "published", "scheduled"].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">
                      <span className="flex items-center justify-center gap-1"><Eye size={12} />{(b.views || 0).toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4 text-center text-xs text-gray-500">{fmt(b.createdAt)}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/blogs/editor/${b.slug}`}>
                          <button className="w-8 h-8 rounded-lg bg-[#2D2D2D]/5 hover:bg-[#2D2D2D]/10 text-[#2D2D2D] flex items-center justify-center transition" title="Edit">
                            <Pencil size={13} />
                          </button>
                        </Link>
                        <button onClick={() => setPreview(b)} className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 flex items-center justify-center transition" title="Preview">
                          <Eye size={13} />
                        </button>
                        <button onClick={() => setDelConfirm(b.slug)} className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition" title="Delete">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── PAGINATION ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-200 px-5 py-4 shadow-sm">
          <p className="text-sm text-gray-500">
            Showing <b className="text-gray-800">{(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)}</b> of <b className="text-gray-800">{filtered.length}</b>
          </p>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
              className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:bg-gray-50 transition">
              <ChevronLeft size={15} />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
              <button key={i} onClick={() => setPage(i + 1)}
                className={`w-9 h-9 rounded-xl text-sm font-semibold transition ${page === i + 1 ? "bg-red-500 text-white shadow-sm" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:bg-gray-50 transition">
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* ── PREVIEW MODAL ── */}
      {preview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && setPreview(null)}>
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">

            {/* HEADER */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Preview</h2>
                <p className="text-xs text-gray-400 mt-0.5">{preview.slug}</p>
              </div>
              <button onClick={() => setPreview(null)} className="w-9 h-9 rounded-full border border-gray-200 hover:bg-gray-100 flex items-center justify-center transition">
                <X size={16} />
              </button>
            </div>

            {/* BODY */}
            <div className="overflow-y-auto flex-1">
              {getThumbnail(preview) && (
                <div className="relative h-64">
                  <img src={getThumbnail(preview)} className="w-full h-full object-cover" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-7 text-white">
                    <div className="flex gap-2 mb-3">
                      {preview.status && (
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_META[preview.status]?.bg} ${STATUS_META[preview.status]?.text}`}>
                          {preview.status}
                        </span>
                      )}
                      {preview.category && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                          {preview.category}
                        </span>
                      )}
                    </div>
                    <h1 className="text-2xl font-bold leading-tight">{preview.title}</h1>
                  </div>
                </div>
              )}

              <div className="px-7 py-6">
                {!getThumbnail(preview) && (
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">{preview.title}</h1>
                )}
                <div className="flex gap-4 text-sm text-gray-500 mb-6 pb-5 border-b border-gray-100">
                  <span>{fmt(preview.createdAt)}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Eye size={13} />{(preview.views || 0).toLocaleString()} views</span>
                  {preview.subCategory && <><span>·</span><span>{preview.subCategory}</span></>}
                </div>

                <div
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-8 prose-img:rounded-2xl prose-a:text-indigo-600"
                  dangerouslySetInnerHTML={{ __html: preview.content }}
                />
              </div>
            </div>

            <div className="border-t border-gray-100 px-7 py-4 flex justify-between items-center bg-gray-50">
              <Link href={`/admin/blogs/editor/${preview.slug}`}>
                <button className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                  <Pencil size={14} /> Edit this post
                </button>
              </Link>
              <button onClick={() => setPreview(null)} className="px-5 py-2 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-black transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRM ── */}
      {delConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trash2 size={22} className="text-red-500" />
            </div>
            <h2 className="text-lg font-bold text-center text-gray-900 mb-1">Delete Post?</h2>
            <p className="text-sm text-gray-500 text-center mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDelConfirm(null)} className="flex-1 h-11 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
                Cancel
              </button>
              <button onClick={handleDelete} className="flex-1 h-11 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold transition">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST ── */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[9999]">
          <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-white text-sm font-medium ${toast.type === "success" ? "bg-emerald-500" : "bg-red-500"}`}>
            <span>{toast.type === "success" ? "✓" : "✕"}</span>
            <span>{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 opacity-70 hover:opacity-100">
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
