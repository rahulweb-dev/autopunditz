"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, Search, ChevronLeft, ChevronRight, X, Calendar, FileText, Globe } from "lucide-react";
import Image from "next/image";
import Tiptap from "@/app/components/Tiptap";

const StatCard = ({ icon: Icon, label, value, accent }) => (
  <div className="stat-card animate-fadeUp bg-[#16161e] border border-[#2a2a38] rounded-xl p-[18px_22px] flex items-center gap-3.5 flex-1 min-w-[130px]">
    <div className={`bg-[${accent}20] rounded-lg p-2.5 flex-shrink-0`} style={{ backgroundColor: `${accent}20` }}>
      <Icon size={18} style={{ color: accent }} />
    </div>
    <div>
      <p className="text-2xl font-bold text-[#f0f0f5] leading-tight">{value}</p>
      <p className="text-[11px] text-[#6b6b80] mt-0.5 uppercase tracking-[0.06em] font-medium">{label}</p>
    </div>
  </div>
);

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [selected, setSelected] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [previewBlog, setPreviewBlog] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [editBlog, setEditBlog] = useState(null);
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    fetch("/api/blog").then((r) => r.json()).then(setBlogs);
  }, []);

  useEffect(() => {
    if (editBlog) setEditorContent(editBlog.content || "");
  }, [editBlog]);

  const stats = useMemo(() => ({
    total: blogs.length,
    published: blogs.filter((b) => b.status === "published").length,
    draft: blogs.filter((b) => b.status === "draft").length,
    scheduled: blogs.filter((b) => b.status === "scheduled").length,
  }), [blogs]);

  const categoryCounts = useMemo(() => {
    const c = { all: blogs.length };
    blogs.forEach((b) => { const k = (b.category || "other").toLowerCase(); c[k] = (c[k] || 0) + 1; });
    return c;
  }, [blogs]);

  const filtered = useMemo(() => {
    let data = blogs.filter((b) => {
      const matchStatus = statusFilter === "all" || b.status === statusFilter;
      const matchSearch = (b.title || "").toLowerCase().includes(search.toLowerCase());
      const matchCat = categoryFilter === "all" || (b.category || "").toLowerCase() === categoryFilter;
      const date = new Date(b.createdAt);
      const matchFrom = fromDate ? date >= new Date(fromDate) : true;
      const matchTo = toDate ? date <= new Date(toDate) : true;
      return matchStatus && matchSearch && matchCat && matchFrom && matchTo;
    });
    if (sortBy === "latest") data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (sortBy === "oldest") data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    else if (sortBy === "az") data.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    else if (sortBy === "views") data.sort((a, b) => (b.views || 0) - (a.views || 0));
    return data;
  }, [blogs, statusFilter, search, categoryFilter, fromDate, toDate, sortBy]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const toggleSelectAll = () =>
    setSelected(selected.length === paginated.length ? [] : paginated.map((b) => b._id));

  const toggleSelect = (id) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const bulkDelete = async (singleId = null) => {
    const ids = singleId ? [singleId] : selected;
    if (!ids.length || !confirm("Delete selected blog(s)?")) return;
    await Promise.all(ids.map((id) => fetch(`/api/blog/${id}`, { method: "DELETE" })));
    setBlogs((prev) => prev.filter((b) => !ids.includes(b._id)));
    if (!singleId) setSelected([]);
  };

  const bulkStatusChange = async (status) => {
    await Promise.all(selected.map((id) =>
      fetch(`/api/blog/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) })
    ));
    setBlogs((prev) => prev.map((b) => selected.includes(b._id) ? { ...b, status } : b));
    setSelected([]);
  };

  const updateStatus = async (id, status) => {
    await fetch(`/api/blog/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    setBlogs((prev) => prev.map((b) => b._id === id ? { ...b, status } : b));
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;0,700;1,300&family=DM+Sans:wght@300;400;500;600&display=swap');
        
        .blogs-root { font-family: 'DM Sans', sans-serif; }
        .blogs-root h1, .blogs-root h2 { font-family: 'Fraunces', serif; }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        .animate-fadeUp  { animation: fadeUp 0.4s ease both; }
        .animate-fadeIn  { animation: fadeIn 0.25s ease both; }
        .animate-slideIn { animation: slideIn 0.35s cubic-bezier(0.16,1,0.3,1) both; }
        
        .row-stagger:nth-child(1) { animation-delay:0.04s; }
        .row-stagger:nth-child(2) { animation-delay:0.08s; }
        .row-stagger:nth-child(3) { animation-delay:0.12s; }
        .row-stagger:nth-child(4) { animation-delay:0.16s; }
        .row-stagger:nth-child(5) { animation-delay:0.20s; }
        .row-stagger:nth-child(6) { animation-delay:0.24s; }
        
        .blog-row { transition: background 0.18s, box-shadow 0.18s; }
        .blog-row:hover { background: #1e1e2e !important; box-shadow: inset 3px 0 0 #6366f1; }
        
        .action-btn { opacity: 0; transition: opacity 0.15s, transform 0.15s; transform: translateX(4px); }
        .blog-row:hover .action-btn { opacity: 1; transform: translateX(0); }
        
        .stat-card { transition: transform 0.2s, box-shadow 0.2s; }
        .stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(99,102,241,0.18); }
        
        .pill-filter { transition: all 0.15s; }
        .pill-filter:hover:not(.active) { background: #2a2a42 !important; color: #c8c8e0 !important; }
        
        .status-badge {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 600; letter-spacing: 0.04em;
        }
        .status-published { background: rgba(16,185,129,0.12); color: #10b981; }
        .status-draft     { background: rgba(107,114,128,0.15); color: #9ca3af; }
        .status-scheduled { background: rgba(245,158,11,0.12); color: #f59e0b; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #2a2a3e; border-radius: 4px; }
        
        .thumbnail-wrap { overflow: hidden; border-radius: 8px; }
        .thumbnail-img { transition: transform 0.4s cubic-bezier(0.4,0,0.2,1); }
        .blog-row:hover .thumbnail-img { transform: scale(1.1); }
        
        .search-input::placeholder { color: #4b4b6a; }
        .search-input:focus { outline: none; border-color: #6366f1 !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }
        
        .modal-overlay { animation: fadeIn 0.2s ease; }
        .modal-card    { animation: slideIn 0.35s cubic-bezier(0.16,1,0.3,1); }
        
        select option { background: #1a1a28; color: #e2e2f0; }
        
        .indigo-btn { background: linear-gradient(135deg,#6366f1,#4f46e5); transition: all 0.2s; border: none; cursor: pointer; }
        .indigo-btn:hover { background: linear-gradient(135deg,#818cf8,#6366f1); box-shadow: 0 4px 20px rgba(99,102,241,0.4); transform: translateY(-1px); }
      `}</style>

      <div className="blogs-root min-h-screen bg-[#0d0d12] text-[#e2e2f0] p-8">

        {/* HEADER */}
        <div className="animate-fadeUp flex justify-between items-start mb-[30px]">
          <div>
            <p className="text-[11px] text-[#6366f1] tracking-[0.14em] font-semibold uppercase mb-1.5">
              Content Management
            </p>
            <h1 className="text-[34px] font-bold text-[#f0f0f5] leading-tight m-0">
              Blog Dashboard
            </h1>
            <p className="text-[13px] text-[#6b6b80] mt-1.5">
              {stats.total} posts · {stats.published} live
            </p>
          </div>
          <Link href="/admin/blogs/editor/new">
            <button className="indigo-btn text-white py-[11px] px-[22px] rounded-lg flex items-center gap-2 text-[13px] font-semibold font-['DM_Sans',sans-serif]">
              <Plus size={15} /> New Post
            </button>
          </Link>
        </div>

        {/* STAT CARDS */}
        <div className="flex gap-3 mb-7 flex-wrap">
          <StatCard icon={FileText} label="Total" value={stats.total} accent="#6366f1" />
          <StatCard icon={Globe} label="Published" value={stats.published} accent="#10b981" />
          <StatCard icon={FileText} label="Drafts" value={stats.draft} accent="#6b6b80" />
          <StatCard icon={Calendar} label="Scheduled" value={stats.scheduled} accent="#f59e0b" />
        </div>

        {/* FILTER BAR */}
        <div className="animate-fadeUp bg-[#16161e] border border-[#2a2a38] rounded-xl p-4 mb-4">
          {/* Row 1: Search + Sort + Per page */}
          <div className="flex gap-2.5 items-center flex-wrap mb-3.5">
            <div className="relative flex-1 min-w-[180px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4b4b6a]" />
              <input
                className="search-input w-full bg-[#0d0d12] border border-[#2a2a38] rounded-lg py-[9px] px-3 pl-8 text-[#e2e2f0] text-[13px] font-['DM_Sans',sans-serif] placeholder:text-[#4b4b6a] focus:outline-none focus:border-[#6366f1] focus:ring-3 focus:ring-[#6366f1]/20"
                placeholder="Search posts…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              />
            </div>

            <input 
              type="date" 
              onChange={(e) => setFromDate(e.target.value)} 
              className="bg-[#0d0d12] border border-[#2a2a38] rounded-lg py-[9px] px-3 text-[#e2e2f0] text-[13px] cursor-pointer" 
            />
            <input 
              type="date" 
              onChange={(e) => setToDate(e.target.value)}   
              className="bg-[#0d0d12] border border-[#2a2a38] rounded-lg py-[9px] px-3 text-[#e2e2f0] text-[13px] cursor-pointer" 
            />

            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)} 
              className="bg-[#0d0d12] border border-[#2a2a38] rounded-lg py-[9px] px-3 text-[#e2e2f0] text-[13px] cursor-pointer"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="az">A → Z</option>
              <option value="views">Most Views</option>
            </select>

            <select 
              value={perPage} 
              onChange={(e) => { setPerPage(Number(e.target.value)); setCurrentPage(1); }} 
              className="bg-[#0d0d12] border border-[#2a2a38] rounded-lg py-[9px] px-3 text-[#e2e2f0] text-[13px] cursor-pointer"
            >
              <option value={10}>10 / page</option>
              <option value={20}>20 / page</option>
              <option value={50}>50 / page</option>
            </select>
          </div>

          {/* Row 2: Category + Status pills */}
          <div className="flex gap-2 flex-wrap items-center">
            <span className="text-[11px] text-[#3a3a50] font-semibold uppercase tracking-[0.08em] mr-1">Cat</span>
            {["all", "cars", "bikes", "news", "analysis"].map((cat) => (
              <button
                key={cat}
                className={`pill-filter ${categoryFilter === cat ? "active" : ""} rounded-full px-[13px] py-[5px] text-[12px] font-medium cursor-pointer capitalize font-['DM_Sans',sans-serif] ${categoryFilter === cat 
                  ? "bg-[#6366f1] text-white border border-[#6366f1]" 
                  : "bg-[#1e1e2a] text-[#6b6b80] border border-[#2a2a38] hover:bg-[#2a2a42] hover:text-[#c8c8e0]"
                }`}
                onClick={() => { setCategoryFilter(cat); setCurrentPage(1); }}
              >
                {cat} <span className="opacity-55">({categoryCounts[cat] || 0})</span>
              </button>
            ))}

            <div className="w-px h-[18px] bg-[#2a2a38] mx-1.5" />

            <span className="text-[11px] text-[#3a3a50] font-semibold uppercase tracking-[0.08em] mr-1">Status</span>
            {["all", "published", "draft", "scheduled"].map((s) => (
              <button
                key={s}
                className={`pill-filter ${statusFilter === s ? "active" : ""} rounded-full px-[13px] py-[5px] text-[12px] font-medium cursor-pointer capitalize font-['DM_Sans',sans-serif] ${statusFilter === s 
                  ? "bg-[#6366f1] text-white border border-[#6366f1]" 
                  : "bg-[#1e1e2a] text-[#6b6b80] border border-[#2a2a38] hover:bg-[#2a2a42] hover:text-[#c8c8e0]"
                }`}
                onClick={() => { setStatusFilter(s); setCurrentPage(1); }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* BULK ACTION BAR */}
        {selected.length > 0 && (
          <div className="animate-fadeUp bg-[#6366f112] border border-[#6366f133] rounded-lg py-2.5 px-4 mb-3 flex items-center gap-3 flex-wrap">
            <span className="text-[13px] text-[#8b8ba8]">
              <b className="text-[#e2e2f0]">{selected.length}</b> selected
            </span>
            <div className="w-px h-4 bg-[#2a2a38]" />
            {[
              { label: "Publish", status: "published", c: "#10b981" }, 
              { label: "Draft", status: "draft", c: "#6b6b80" }
            ].map(({ label, status, c }) => (
              <button 
                key={status} 
                onClick={() => bulkStatusChange(status)} 
                className="rounded-md px-[14px] py-[5px] text-[12px] font-semibold cursor-pointer font-['DM_Sans',sans-serif]"
                style={{ backgroundColor: `${c}18`, color: c, border: `1px solid ${c}35` }}
              >
                {label}
              </button>
            ))}
            <button 
              onClick={() => bulkDelete()} 
              className="rounded-md px-[14px] py-[5px] text-[12px] font-semibold cursor-pointer font-['DM_Sans',sans-serif] bg-[#ef44441a] text-[#f87171] border border-[#ef444433]"
            >
              Delete
            </button>
            <button 
              onClick={() => setSelected([])} 
              className="ml-auto bg-none border-none text-[#4b4b6a] cursor-pointer flex"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* TABLE */}
        <div className="bg-[#16161e] border border-[#2a2a38] rounded-xl overflow-hidden">
          <div className="custom-scrollbar max-h-[520px] overflow-y-auto">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="bg-[#0d0d12] border-b border-[#2a2a38]">
                  <th className="py-[13px] px-4 w-10">
                    <input 
                      type="checkbox" 
                      onChange={toggleSelectAll}
                      checked={paginated.length > 0 && selected.length === paginated.length}
                      className="accent-[#6366f1] cursor-pointer" 
                    />
                  </th>
                  <th className="py-[13px] px-4 text-left text-[#3a3a54] text-[11px] font-semibold tracking-[0.08em] uppercase">Post</th>
                  <th className="py-[13px] px-4 text-center text-[#3a3a54] text-[11px] font-semibold tracking-[0.08em] uppercase">Category</th>
                  <th className="py-[13px] px-4 text-center text-[#3a3a54] text-[11px] font-semibold tracking-[0.08em] uppercase">Status</th>
                  <th className="py-[13px] px-4 text-center text-[#3a3a54] text-[11px] font-semibold tracking-[0.08em] uppercase">Views</th>
                  <th className="py-[13px] px-4 text-center text-[#3a3a54] text-[11px] font-semibold tracking-[0.08em] uppercase">Date</th>
                  <th className="py-[13px] px-4 text-center text-[#3a3a54] text-[11px] font-semibold tracking-[0.08em] uppercase"></th>
                </tr>
              </thead>

              <tbody>
                {paginated.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-[#3a3a54]">
                      <FileText size={30} className="mx-auto mb-2.5 opacity-25" />
                      <p className="text-[14px]">No posts found</p>
                    </td>
                  </tr>
                )}

                {paginated.map((b) => (
                  <tr key={b._id} className="blog-row row-stagger animate-fadeUp border-b border-[#1a1a24] bg-transparent">
                    <td className="py-3 px-4">
                      <input 
                        type="checkbox" 
                        checked={selected.includes(b._id)}
                        onChange={() => toggleSelect(b._id)}
                        className="accent-[#6366f1] cursor-pointer" 
                      />
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex gap-3 items-center">
                        <div className="thumbnail-wrap w-[62px] h-[42px] flex-shrink-0 relative rounded-lg overflow-hidden">
                          <Image
                            src={b.content?.match(/<img.*?src="(.*?)"/)?.[1] || "/placeholder.jpg"}
                            alt={b.title}
                            fill
                            className="thumbnail-img object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-[#e2e2f0] leading-tight mb-0.5 max-w-[280px]">
                            {b.title}
                          </p>
                          <p className="text-[11px] text-[#4b4b6a]">{b.author || "Admin"}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className="bg-[#1e1e2a] text-[#6b6b80] rounded-md py-[3px] px-2.5 text-[11px] font-medium capitalize">
                        {b.category || "–"}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <select
                        value={b.status}
                        onChange={(e) => updateStatus(b._id, e.target.value)}
                        className={`status-badge status-${b.status} bg-transparent border-none cursor-pointer font-['DM_Sans',sans-serif]`}
                      >
                        <option value="draft">draft</option>
                        <option value="published">published</option>
                        <option value="scheduled">scheduled</option>
                      </select>
                    </td>

                    <td className="py-3 px-4 text-center text-[#5a5a74]">
                      <div className="flex items-center justify-center gap-1.5">
                        <Eye size={12} /> {(b.views || 0).toLocaleString()}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center text-[#5a5a74] text-[12px]">
                      {new Date(b.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex gap-1.5 justify-end">
                        {[
                          { icon: Eye, color: "#6366f1", action: () => setPreviewBlog(b), title: "Preview" },
                          { icon: Pencil, color: "#10b981", action: () => setEditBlog(b), title: "Edit" },
                          { icon: Trash2, color: "#ef4444", action: () => bulkDelete(b._id), title: "Delete" },
                        ].map(({ icon: Icon, color, action, title }) => (
                          <button
                            key={title}
                            className="action-btn rounded-md p-1.5 cursor-pointer flex items-center"
                            title={title}
                            onClick={action}
                            style={{ backgroundColor: `${color}14`, border: `1px solid ${color}22`, color }}
                          >
                            <Icon size={13} />
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center py-3.5 px-5 border-t border-[#1a1a24]">
            <p className="text-[12px] text-[#3a3a54]">
              {filtered.length === 0 ? "No results" : (
                <>Showing <b className="text-[#6b6b80]">{(currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, filtered.length)}</b> of <b className="text-[#6b6b80]">{filtered.length}</b></>
              )}
            </p>
            <div className="flex gap-1.5 items-center">
              {[
                { icon: ChevronLeft, action: () => setCurrentPage((p) => Math.max(1, p - 1)), disabled: currentPage === 1 },
                { icon: ChevronRight, action: () => setCurrentPage((p) => Math.min(totalPages, p + 1)), disabled: currentPage === totalPages },
              ].map(({ icon: Icon, action, disabled }, i) => (
                <button
                  key={i}
                  onClick={action}
                  disabled={disabled}
                  className="bg-[#1e1e2a] border border-[#2a2a38] rounded-md py-1.5 px-2.5 cursor-pointer flex items-center disabled:cursor-not-allowed disabled:text-[#2a2a38] text-[#8b8ba8]"
                >
                  <Icon size={14} />
                </button>
              ))}
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`rounded-md py-1.5 px-3 text-[12px] font-semibold cursor-pointer font-['DM_Sans',sans-serif] ${
                    currentPage === i + 1
                      ? "bg-[#6366f1] text-white border border-[#6366f1]"
                      : "bg-[#1e1e2a] text-[#8b8ba8] border border-[#2a2a38]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PREVIEW MODAL */}
        {previewBlog && (
          <div
            className="modal-overlay fixed inset-0 bg-black/90 backdrop-blur-[14px] z-50 flex items-center justify-center p-6"
            onClick={(e) => e.target === e.currentTarget && setPreviewBlog(null)}
          >
            <div className="modal-card bg-[#13131b] border border-[#2a2a38] rounded-2xl w-full max-w-[780px] max-h-[90vh] overflow-hidden flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.7)]">
              <div className="py-4 px-6 border-b border-[#2a2a38] flex justify-between items-center flex-shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                  <span className="text-[12px] text-[#6b6b80] tracking-[0.07em] font-semibold uppercase">
                    Live Preview
                  </span>
                </div>
                <button
                  onClick={() => setPreviewBlog(null)}
                  className="bg-[#1e1e2a] border border-[#2a2a38] rounded-full w-[30px] h-[30px] cursor-pointer text-[#8b8ba8] flex items-center justify-center"
                >
                  <X size={13} />
                </button>
              </div>

              {previewBlog.content?.match(/<img.*?src="(.*?)"/)?.[1] && (
                <div className="h-[210px] flex-shrink-0 overflow-hidden relative">
                  <img
                    src={previewBlog.content.match(/<img.*?src="(.*?)"/)?.[1]}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13131b] via-transparent to-transparent" />
                </div>
              )}

              <div className="custom-scrollbar overflow-y-auto py-7 px-9">
                <div className="flex gap-1.5 mb-3.5 flex-wrap">
                  {[previewBlog.status, previewBlog.category].filter(Boolean).map((tag, i) => (
                    <span
                      key={i}
                      className={i === 0 ? `status-badge status-${previewBlog.status}` : "bg-[#1e1e2a] text-[#6b6b80] rounded-full py-[3px] px-2.5 text-[11px] font-medium capitalize"}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-[26px] font-bold text-[#f0f0f5] leading-tight mb-3 font-['Fraunces',serif]">
                  {previewBlog.title}
                </h1>
                <div className="flex gap-3.5 text-[#4b4b6a] text-[12px] mb-6 flex-wrap">
                  <span className="text-[#8b8ba8] font-medium">{previewBlog.author || "Admin"}</span>
                  <span>{new Date(previewBlog.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                  <span className="flex items-center gap-1"><Eye size={12} /> {previewBlog.views || 0}</span>
                </div>
                <div className="border-t border-[#2a2a38] pt-6">
                  <div className="text-[#b8b8cc] leading-relaxed text-[14px]" dangerouslySetInnerHTML={{ __html: previewBlog.content }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EDIT MODAL */}
        {editBlog && (
          <div
            className="modal-overlay fixed inset-0 bg-black/90 backdrop-blur-[14px] z-50 flex items-center justify-center p-6"
            onClick={(e) => e.target === e.currentTarget && setEditBlog(null)}
          >
            <div className="modal-card bg-[#F8FAFC] border border-[#2a2a38] rounded-2xl w-full max-w-[900px] max-h-[92vh] overflow-hidden flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.7)]">
              {/* Header */}
              <div className="py-4 px-6 border-b border-[#2a2a38] flex justify-between items-center flex-shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="bg-[#6366f115] rounded-lg p-1.5">
                    <Pencil size={14} className="text-[#6366f1]" />
                  </div>
                  <span className="font-semibold text-[#131314] text-[15px]">Edit Post</span>
                </div>
                <button
                  onClick={() => setEditBlog(null)}
                  className="bg-[#1e1e2a] border border-[#2a2a38] rounded-full w-[30px] h-[30px] cursor-pointer text-[#8b8ba8] flex items-center justify-center"
                >
                  <X size={13} />
                </button>
              </div>

              {/* Body */}
              <div className="custom-scrollbar overflow-y-auto py-6 px-7 flex flex-col gap-5">
                <div>
                  <label className="text-[11px] text-[#4b4b6a] tracking-[0.08em] font-semibold uppercase block mb-2">Title</label>
                  <input
                    value={editBlog.title}
                    onChange={(e) => setEditBlog({ ...editBlog, title: e.target.value })}
                    className="w-full bg-[#0d0d12] border border-[#2a2a38] rounded-lg py-3 px-4 text-[#e2e2f0] text-[19px] font-bold font-['Fraunces',serif] focus:outline-none focus:border-[#6366f1] focus:ring-3 focus:ring-[#6366f1]/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-[#4b4b6a] tracking-[0.08em] font-semibold uppercase block mb-2">Category</label>
                    <select
                      value={editBlog.category}
                      onChange={(e) => setEditBlog({ ...editBlog, category: e.target.value })}
                      className="w-full bg-[#0d0d12] border border-[#2a2a38] rounded-lg py-[9px] px-3 text-[#e2e2f0] text-[13px] cursor-pointer"
                    >
                      <option value="">Select Category</option>
                      {["Cars", "Bikes", "News", "Analysis"].map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-[#4b4b6a] tracking-[0.08em] font-semibold uppercase block mb-2">Schedule Publish</label>
                    <input
                      type="datetime-local"
                      value={editBlog.publishAt ? new Date(editBlog.publishAt).toISOString().slice(0, 16) : ""}
                      onChange={(e) => setEditBlog({ ...editBlog, publishAt: e.target.value })}
                      className="w-full bg-[#0d0d12] border border-[#2a2a38] rounded-lg py-[9px] px-3 text-[#e2e2f0] text-[13px] focus:outline-none focus:border-[#6366f1] focus:ring-3 focus:ring-[#6366f1]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-[#4b4b6a] tracking-[0.08em] font-semibold uppercase block mb-2">Content</label>
                  <div className="border border-[#2a2a38] rounded-lg overflow-hidden">
                    <Tiptap
                      key={editBlog._id}
                      initialContent={editBlog.content || ""}
                      setContent={setEditorContent}
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="py-4 px-7 border-t border-[#2a2a38] flex justify-end gap-2.5 flex-shrink-0">
                <button
                  onClick={() => setEditBlog(null)}
                  className="bg-[#1e1e2a] border border-[#2a2a38] rounded-lg py-2.5 px-5 text-[#8b8ba8] text-[13px] font-medium cursor-pointer font-['DM_Sans',sans-serif]"
                >
                  Cancel
                </button>

                <button
                  className="indigo-btn text-white rounded-lg py-2.5 px-6 text-[13px] font-semibold font-['DM_Sans',sans-serif]"
                  onClick={async () => {
                    try {
                      const updated = { ...editBlog, content: editorContent };
                      const res = await fetch(`/api/blog/${editBlog._id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updated),
                      });
                      if (!res.ok) throw new Error("Update failed");
                      setBlogs((prev) => prev.map((b) => b._id === editBlog._id ? updated : b));
                      setEditBlog(null);
                    } catch (err) {
                      console.error(err);
                      alert("Update failed");
                    }
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}