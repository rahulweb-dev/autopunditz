"use client";

import {
  useState,
  useMemo,
  useEffect,
} from "react";

import Link from "next/link";

import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  FileText,
} from "lucide-react";

import Image from "next/image";
import Tiptap from "@/app/components/Tiptap";
import useSWR from "swr";

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const fetcher = (u) =>
  fetch(u).then((r) =>
    r.json()
  );

const CATS = [
  "all",
  "cars",
  "bikes",
  "news",
  "market analysis",
];

const STATUSES = [
  "all",
  "published",
  "draft",
  "scheduled",
];

const SORTS = {
  latest: "Latest",
  oldest: "Oldest",
  az: "A → Z",
  views: "Most Views",
};

const STATUS_CLR = {
  published: "#10b981",
  draft: "#9ca3af",
  scheduled: "#f59e0b",
};

const sel =
  "bg-white border border-[#2a2a38] rounded-lg py-[9px] px-3 text-black text-[13px] cursor-pointer";

const darkInput =
  "w-full bg-[#0d0d12] border border-[#2a2a38] rounded-lg py-[9px] px-3 text-[#e2e2f0] text-[13px] focus:outline-none focus:border-[#6366f1]";

const lbl =
  "text-[11px] text-[#4b4b6a] tracking-[0.08em] font-semibold uppercase block mb-2";

const thumb = (c) =>
  c?.match(
    /<img.*?src="(.*?)"/
  )?.[1] ||
  "/placeholder.jpg";

// ✅ FIXED
const apiPut = (
  slug,
  body
) =>
  fetch(
    `/api/blog/${slug}`,
    {
      method: "PUT",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(
        body
      ),
    }
  );

const fmt = (d, o) =>
  new Date(
    d
  ).toLocaleDateString(
    "en-US",
    o
  );
// ─────────────────────────────────────────────────────────────
// MICRO COMPONENTS
// ─────────────────────────────────────────────────────────────

const Pill = ({
  v,
  active,
  onClick,
  count,
}) => (

  <button
    onClick={onClick}
    className={`pill-filter rounded-full px-[13px] py-[5px] text-[12px] font-medium cursor-pointer capitalize ${active
      ? "bg-[#6366f1] text-white border border-[#6366f1]"
      : "bg-[#1e1e2a] text-[#6b6b80] border border-[#2a2a38]"
      }`}
  >

    {v}

    {count != null && (
      <span className="opacity-55">
        {" "}
        ({count})
      </span>
    )}

  </button>
);

const CloseBtn = ({
  onClick,
}) => (

  <button
    onClick={onClick}
    className="bg-[#1e1e2a] border border-[#2a2a38] rounded-full w-[30px] h-[30px] cursor-pointer text-[#8b8ba8] flex items-center justify-center"
  >

    <X size={13} />

  </button>
);

const Modal = ({
  onClose,
  maxW = "780px",
  bg = "#13131b",
  children,
}) => (

  <div
    className="modal-overlay fixed inset-0 bg-black/90 backdrop-blur-[14px] z-50 flex items-center justify-center p-6"
    onClick={(e) =>
      e.target ===
      e.currentTarget &&
      onClose()
    }
  >

    <div
      className="modal-card border border-[#2a2a38] rounded-2xl w-full overflow-hidden flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.7)]"
      style={{
        maxWidth: maxW,
        maxHeight: "92vh",
        background: bg,
      }}
    >

      {children}

    </div>

  </div>
);

const MHead = ({
  label,
  icon: Icon,
  onClose,
}) => (

  <div className="py-4 px-6 border-b border-[#2a2a38] flex justify-between items-center flex-shrink-0">

    <div className="flex items-center gap-2.5">

      {Icon ? (
        <>

          <div className="bg-[#6366f115] rounded-lg p-1.5">

            <Icon
              size={14}
              className="text-[#6366f1]"
            />

          </div>

          <span className="font-semibold text-[#131314] text-[15px]">

            {label}

          </span>

        </>
      ) : (
        <>

          <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />

          <span className="text-[12px] text-[#6b6b80] tracking-[0.07em] font-semibold uppercase">

            {label}

          </span>

        </>
      )}

    </div>

    <CloseBtn
      onClick={onClose}
    />

  </div>
);
// ─────────────────────────────────────────────────────────────
// CSS
// ─────────────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;0,700;1,300&family=DM+Sans:wght@300;400;500;600&display=swap');
.br{font-family:'DM Sans',sans-serif} .br h1,.br h2{font-family:'Fraunces',serif}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideIn{from{opacity:0;transform:translateY(24px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
.afu{animation:fadeUp .4s ease both} .afi{animation:fadeIn .25s ease both} .asi{animation:slideIn .35s cubic-bezier(.16,1,.3,1) both}
.rs:nth-child(1){animation-delay:.04s}.rs:nth-child(2){animation-delay:.08s}.rs:nth-child(3){animation-delay:.12s}
.rs:nth-child(4){animation-delay:.16s}.rs:nth-child(5){animation-delay:.20s}.rs:nth-child(6){animation-delay:.24s}
.br tr.row{transition:background .18s,box-shadow .18s}
.br tr.row:hover{background:#1e1e2e!important;box-shadow:inset 3px 0 0 #6366f1}
.ab{opacity:0;transition:opacity .15s,transform .15s;transform:translateX(4px)}
.row:hover .ab{opacity:1;transform:translateX(0)}
.pill-filter{transition:all .15s} .pill-filter:hover:not(.active){background:#2a2a42!important;color:#c8c8e0!important}
.sb{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:600;letter-spacing:.04em}
.sc::-webkit-scrollbar{width:4px} .sc::-webkit-scrollbar-track{background:transparent} .sc::-webkit-scrollbar-thumb{background:#2a2a3e;border-radius:4px}
.tw{overflow:hidden;border-radius:8px} .ti{transition:transform .4s cubic-bezier(.4,0,.2,1)} .row:hover .ti{transform:scale(1.1)}
.si::placeholder{color:#4b4b6a} .si:focus{outline:none;border-color:#6366f1!important;box-shadow:0 0 0 3px rgba(99,102,241,.12)}
.modal-overlay{animation:fadeIn .2s ease} .modal-card{animation:slideIn .35s cubic-bezier(.16,1,.3,1)}
select option{background:#1a1a28;color:#e2e2f0}
.ib{background:linear-gradient(135deg,#6366f1,#4f46e5);transition:all .2s;border:none;cursor:pointer}
.ib:hover{background:linear-gradient(135deg,#818cf8,#6366f1);box-shadow:0 4px 20px rgba(99,102,241,.4);transform:translateY(-1px)}
`;

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

export default function BlogsPage() {

  const {
    data,
    mutate,
  } = useSWR(
    "/api/blog",
    fetcher,
    {
      revalidateOnFocus:
        false,

      dedupingInterval:
        60000,
    }
  );

  const blogs =
    Array.isArray(data)
      ? data
      : data?.data || [];

  const [sel2, setSel2] =
    useState([]);

  const [statusF, setStatusF] =
    useState("all");

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [perPage, setPerPage] =
    useState(10);

  const [catF, setCatF] =
    useState("all");

  const [from, setFrom] =
    useState("");

  const [to, setTo] =
    useState("");

  const [preview, setPreview] =
    useState(null);

  const [edit, setEdit] =
    useState(null);

  const [
    editorContent,
    setEditorContent,
  ] = useState("");

  const [sortBy, setSortBy] =
    useState("latest");

  const [
    delConfirm,
    setDelConfirm,
  ] = useState(null);

  useEffect(() => {

    if (edit) {

      setEditorContent(
        edit.content || ""
      );

    }

  }, [edit]);

  // ─────────────────────────────────────────────────────────────
  // STATS
  // ─────────────────────────────────────────────────────────────

  const stats =
    useMemo(
      () => ({

        total:
          blogs.length,

        published:
          blogs.filter(
            (b) =>
              b.status ===
              "published"
          ).length,

      }),
      [blogs]
    );

  const catCounts =
    useMemo(() => {

      const c = {
        all:
          blogs.length,
      };

      blogs.forEach(
        (b) => {

          const k =
            (
              b.category ||
              "other"
            ).toLowerCase();

          c[k] =
            (c[k] || 0) +
            1;
        }
      );

      return c;

    }, [blogs]);

  // ─────────────────────────────────────────────────────────────
  // FILTERS
  // ─────────────────────────────────────────────────────────────

  const filtered =
    useMemo(() => {

      const sorters = {

        latest:
          (a, b) =>
            new Date(
              b.createdAt
            ) -
            new Date(
              a.createdAt
            ),

        oldest:
          (a, b) =>
            new Date(
              a.createdAt
            ) -
            new Date(
              b.createdAt
            ),

        az:
          (a, b) =>
            (
              a.title ||
              ""
            ).localeCompare(
              b.title ||
              ""
            ),

        views:
          (a, b) =>
            (
              b.views || 0
            ) -
            (
              a.views || 0
            ),

      };

      return blogs
        .filter(
          (b) =>

            (statusF ===
              "all" ||
              b.status ===
              statusF) &&

            (
              b.title || ""
            )
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) &&

            (catF ===
              "all" ||
              (
                b.category ||
                ""
              ).toLowerCase() ===
              catF) &&

            (from
              ? new Date(
                b.createdAt
              ) >=
              new Date(
                from
              )
              : true) &&

            (to
              ? new Date(
                b.createdAt
              ) <=
              new Date(
                to
              )
              : true)
        )
        .sort(
          sorters[
          sortBy
          ]
        );

    }, [
      blogs,
      statusF,
      search,
      catF,
      from,
      to,
      sortBy,
    ]);

  const totalPages =
    Math.ceil(
      filtered.length /
      perPage
    );

  const paged =
    filtered.slice(
      (page - 1) *
      perPage,
      page * perPage
    );

  // ─────────────────────────────────────────────────────────────
  // SELECTION
  // ─────────────────────────────────────────────────────────────

  const toggleAll = () =>
    setSel2(
      sel2.length ===
        paged.length
        ? []
        : paged.map(
          (b) =>
            b.slug
        )
    );

  const toggle = (
    slug
  ) =>
    setSel2((p) =>
      p.includes(slug)
        ? p.filter(
          (x) =>
            x !== slug
        )
        : [...p, slug]
    );


  const rp =
    (fn) =>
      (...a) => {

        fn(...a);

        setPage(1);

      };
  // ─────────────────────────────────────────────────────────────
  // STATUS UPDATE
  // ─────────────────────────────────────────────────────────────

  const updateStatus =
    async (
      slug,
      status
    ) => {

      try {

        await apiPut(
          slug,
          {
            status,
          }
        );

        mutate(
          (prev) => {

            const arr =
              Array.isArray(
                prev
              )
                ? prev
                : prev?.data ||
                [];

            return arr.map(
              (b) =>
                b.slug ===
                  slug
                  ? {
                    ...b,
                    status,
                  }
                  : b
            );

          },
          false
        );

      } catch (err) {

        console.error(
          err
        );

        alert(
          "Status update failed"
        );

      }
    };

  // ─────────────────────────────────────────────────────────────
  // BULK STATUS
  // ─────────────────────────────────────────────────────────────

  const bulkStatus =
    async (
      status
    ) => {

      try {

        await Promise.all(
          sel2.map(
            (
              slug
            ) =>
              apiPut(
                slug,
                {
                  status,
                }
              )
          )
        );

        mutate(
          (prev) => {

            const arr =
              Array.isArray(
                prev
              )
                ? prev
                : prev?.data ||
                [];

            return arr.map(
              (b) =>
                sel2.includes(
                  b.slug
                )
                  ? {
                    ...b,
                    status,
                  }
                  : b
            );

          },
          false
        );

        setSel2([]);

      } catch (err) {

        console.error(
          err
        );

        alert(
          "Bulk update failed"
        );

      }
    };

  // ─────────────────────────────────────────────────────────────
  // BULK DELETE
  // ─────────────────────────────────────────────────────────────

  const bulkDelete =
    async () => {

      if (
        !sel2.length ||
        !confirm(
          "Delete selected?"
        )
      ) return;

      try {

        await Promise.all(
          sel2.map(
            (
              slug
            ) =>
              fetch(
                `/api/blog/${slug}`,
                {
                  method:
                    "DELETE",
                }
              )
          )
        );

        mutate(
          (prev) => {

            const arr =
              Array.isArray(
                prev
              )
                ? prev
                : prev?.data ||
                [];

            return arr.filter(
              (b) =>
                !sel2.includes(
                  b.slug
                )
            );

          },
          false
        );

        setSel2([]);

      } catch (err) {

        console.error(
          err
        );

        alert(
          "Delete failed"
        );

      }
    };

  // ─────────────────────────────────────────────────────────────
  // DELETE SINGLE
  // ─────────────────────────────────────────────────────────────

  const handleDelete =
    async () => {

      try {

        const res =
          await fetch(
            `/api/blog/${delConfirm}`,
            {
              method:
                "DELETE",
            }
          );

        const data =
          await res.json();

        console.log(
          data
        );

        if (!res.ok) {

          throw new Error(
            data.error ||
            "Delete failed"
          );

        }

        mutate(
          (prev) => {

            const arr =
              Array.isArray(
                prev
              )
                ? prev
                : prev?.data ||
                [];

            return arr.filter(
              (b) =>
                b.slug !==
                delConfirm
            );

          },
          false
        );

        setDelConfirm(
          null
        );

      } catch (err) {

        console.error(
          err
        );

        alert(
          err.message
        );

      }
    };

  // ─────────────────────────────────────────────────────────────
  // SAVE EDIT
  // ─────────────────────────────────────────────────────────────

  const saveEdit =
    async () => {

      try {

        const updated = {
          ...edit,

          content:
            editorContent,
        };

        const res =
          await fetch(
            `/api/blog/${edit.slug}`,
            {
              method:
                "PUT",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  updated
                ),
            }
          );

        if (
          !res.ok
        ) {

          throw new Error();

        }

        mutate(
          (prev) => {

            const arr =
              Array.isArray(
                prev
              )
                ? prev
                : prev?.data ||
                [];

            return arr.map(
              (b) =>
                b.slug ===
                  edit.slug
                  ? updated
                  : b
            );

          },
          false
        );

        setEdit(null);

      } catch {

        alert(
          "Update failed"
        );

      }
    };


  return (
    <>
      <style jsx global>{CSS}</style>
      <div className="br min-h-screen text-black p-8">

        {/* HEADER */}
        <div className="afu flex justify-between items-start mb-[30px]">
          <div>
            <p className="text-[11px] text-[#6366f1] tracking-[0.14em] font-semibold uppercase mb-1.5">Content Management</p>
            <h1 className="text-[34px] font-bold leading-tight m-0">Blog Dashboard</h1>
            <p className="text-[13px] text-[#6b6b80] mt-1.5">{stats.total} posts · {stats.published} live</p>
          </div>
          <Link href="/admin/blogs/editor/new">
            <button className="ib text-white py-[11px] px-[22px] rounded-lg flex items-center gap-2 text-[13px] font-semibold"><Plus size={15} /> New Post</button>
          </Link>
        </div>

        {/* FILTERS */}
        <div className="afu bg-[#16161e] border border-[#2a2a38] rounded-xl p-4 mb-4">
          <div className="flex gap-2.5 items-center flex-wrap mb-3.5">
            <div className="relative flex-1 min-w-[180px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4b4b6a]" />
              <input className="si w-full bg-white border border-[#2a2a38] rounded-lg py-[9px] px-3 pl-8 text-black text-[13px]"
                placeholder="Search posts…" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
            </div>
            <input type="date" onChange={(e) => setFrom(e.target.value)} className={sel} />
            <input type="date" onChange={(e) => setTo(e.target.value)} className={sel} />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={sel}>
              {Object.entries(SORTS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
            <select value={perPage} onChange={(e) => { setPerPage(+e.target.value); setPage(1); }} className={sel}>
              {[10, 20, 50].map((n) => <option key={n} value={n}>{n} / page</option>)}
            </select>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            {[{ label: "Cat", items: CATS, active: catF, set: rp(setCatF), counts: catCounts },
            { label: "Status", items: STATUSES, active: statusF, set: rp(setStatusF) }].map(({ label, items, active, set, counts }, gi) => (
              <div key={label} className="flex items-center gap-2 flex-wrap">
                {gi > 0 && <div className="w-px h-[18px] bg-[#2a2a38] mx-1" />}
                <span className="text-[11px] text-white font-semibold uppercase tracking-[0.08em]">{label}</span>
                {items.map((v) => <Pill key={v} v={v} active={active === v} onClick={() => set(v)} count={counts?.[v]} />)}
              </div>
            ))}
          </div>
        </div>

        {/* BULK BAR */}
        {sel2.length > 0 && (
          <div className="afu bg-[#6366f112] border border-[#6366f133] rounded-lg py-2.5 px-4 mb-3 flex items-center gap-3 flex-wrap">
            <span className="text-[13px] text-[#8b8ba8]"><b className="text-[#e2e2f0]">{sel2.length}</b> selected</span>
            <div className="w-px h-4 bg-[#2a2a38]" />
            {[["Publish", "published", "#10b981"], ["Draft", "draft", "#6b6b80"]].map(([l, s, c]) => (
              <button key={s} onClick={() => bulkStatus(s)} className="rounded-md px-[14px] py-[5px] text-[12px] font-semibold cursor-pointer"
                style={{ backgroundColor: `${c}18`, color: c, border: `1px solid ${c}35` }}>{l}</button>
            ))}
            <button onClick={bulkDelete} className="rounded-md px-[14px] py-[5px] text-[12px] font-semibold cursor-pointer bg-[#ef44441a] text-[#f87171] border border-[#ef444433]">Delete</button>
            <button onClick={() => setSel2([])} className="ml-auto text-[#4b4b6a] cursor-pointer flex"><X size={14} /></button>
          </div>
        )}

        {/* TABLE */}
        <div className="bg-[#16161e] border border-[#2a2a38] rounded-xl overflow-hidden">
          <div className="sc max-h-[520px] overflow-y-auto">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="bg-[#0d0d12] border-b border-[#2a2a38]">
                  <th className="py-[13px] px-4 w-10">
                    <input type="checkbox" className="accent-[#6366f1] cursor-pointer"
                      onChange={toggleAll} checked={paged.length > 0 && sel2.length === paged.length} />
                  </th>
                  {["Post", "Category", "subCategory", "Status", "Views", "Date", ""].map((h, i) => (
                    <th key={i} className={`py-[13px] px-4 text-white text-[11px] font-semibold tracking-[0.08em] uppercase ${i === 0 ? "text-left" : "text-center"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paged.length === 0 && (
                  <tr><td colSpan={7} className="py-16 text-center text-[#3a3a54]">
                    <FileText size={30} className="mx-auto mb-2.5 opacity-25" /><p className="text-[14px]">No posts found</p>
                  </td></tr>
                )}
                {paged.map((b) => (
                  <tr key={b.slug} className="row rs afu border-b border-[#1a1a24] bg-transparent">
                    <td className="py-3 px-4">
                      <input type="checkbox" className="accent-[#6366f1] cursor-pointer" checked={sel2.includes(b.slug)} onChange={() => toggle(b.slug)} />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-3 items-center">
                        <div className="tw w-[62px] h-[42px] flex-shrink-0 relative">
                          <Image src={thumb(b.content)} alt={b.title} fill className="ti object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#e2e2f0] leading-tight mb-0.5 max-w-[280px]">{b.title}</p>
                          <p className="text-[11px] text-[#4b4b6a]">{b.author || "Admin"}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className="bg-[#1e1e2a] text-[#6b6b80] rounded-md py-[3px] px-2.5 text-[11px] font-medium capitalize">{b.category || "–"}</span>
                    </td>   <td className="py-3 px-4 text-center">
                      <span className="bg-[#1e1e2a] text-[#6b6b80] rounded-md py-[3px] px-2.5 text-[11px] font-medium capitalize">{b.subCategory || "–"}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <select value={b.status} onChange={(e) => updateStatus(b.slug, e.target.value)}
                        className="sb bg-transparent border-none cursor-pointer"
                        style={{ color: STATUS_CLR[b.status], background: `${STATUS_CLR[b.status]}20` }}>
                        {["draft", "published", "scheduled"].map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="py-3 px-4 text-center text-[#5a5a74]">
                      <div className="flex items-center justify-center gap-1.5"><Eye size={12} />{(b.views || 0).toLocaleString()}</div>
                    </td>
                    <td className="py-3 px-4 text-center text-[#5a5a74] text-[12px]">{fmt(b.createdAt, { month: "short", day: "numeric", year: "numeric" })}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1.5 justify-end">
                        {[[Eye, "#6366f1", () => setPreview(b)], [Pencil, "#10b981", () => setEdit(b)], [Trash2, "#ef4444", () => setDelConfirm(b.slug)]].map(([Icon, c, fn], i) => (
                          <button key={i} onClick={fn} className="ab rounded-md p-1.5 cursor-pointer flex items-center"
                            style={{ backgroundColor: `${c}14`, border: `1px solid ${c}22`, color: c }}>
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

          {/* PAGINATION */}
          <div className="flex justify-between items-center py-3.5 px-5 border-t border-[#1a1a24]">
            <p className="text-[12px] text-[#3a3a54]">
              {filtered.length === 0 ? "No results" : <>Showing <b className="text-[#6b6b80]">{(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)}</b> of <b className="text-[#6b6b80]">{filtered.length}</b></>}
            </p>
            <div className="flex gap-1.5 items-center">
              {[[ChevronLeft, () => setPage((p) => Math.max(1, p - 1)), page === 1],
              [ChevronRight, () => setPage((p) => Math.min(totalPages, p + 1)), page === totalPages]].map(([Icon, fn, dis], i) => (
                <button key={i} onClick={fn} disabled={dis}
                  className="bg-[#1e1e2a] border border-[#2a2a38] rounded-md py-1.5 px-2.5 cursor-pointer flex items-center disabled:cursor-not-allowed disabled:text-[#2a2a38] text-[#8b8ba8]">
                  <Icon size={14} />
                </button>
              ))}
              {[...Array(totalPages)].map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)}
                  className={`rounded-md py-1.5 px-3 text-[12px] font-semibold cursor-pointer ${page === i + 1 ? "bg-[#6366f1] text-white border border-[#6366f1]" : "bg-[#1e1e2a] text-[#8b8ba8] border border-[#2a2a38]"}`}>
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PREVIEW MODAL */}
        {preview && (
          <Modal onClose={() => setPreview(null)}>
            <MHead label="Live Preview" onClose={() => setPreview(null)} />
            {thumb(preview.content) !== "/placeholder.jpg" && (
              <div className="h-[210px] flex-shrink-0 relative overflow-hidden">
                <img src={thumb(preview.content)} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13131b] via-transparent to-transparent" />
              </div>
            )}
            <div className="sc overflow-y-auto py-7 px-9">
              <div className="flex gap-1.5 mb-3.5">
                {[preview.status, preview.category].filter(Boolean).map((t, i) => (
                  <span key={i} className={i === 0 ? "sb" : "bg-[#1e1e2a] text-[#6b6b80] rounded-full py-[3px] px-2.5 text-[11px] capitalize"}
                    style={i === 0 ? { color: STATUS_CLR[preview.status], background: `${STATUS_CLR[preview.status]}20` } : {}}>{t}</span>
                ))}
              </div>
              <h1 className="text-[26px] font-bold text-[#f0f0f5] leading-tight mb-3">{preview.title}</h1>
              <div className="flex gap-3.5 text-[#4b4b6a] text-[12px] mb-6">
                <span className="text-[#8b8ba8] font-medium">{preview.author || "Admin"}</span>
                <span>{fmt(preview.createdAt, { month: "long", day: "numeric", year: "numeric" })}</span>
                <span className="flex items-center gap-1"><Eye size={12} />{preview.views || 0}</span>
              </div>
              <div className="border-t border-[#2a2a38] pt-6 text-[#b8b8cc] leading-relaxed text-[14px]" dangerouslySetInnerHTML={{ __html: preview.content }} />
            </div>
          </Modal>
        )}

        {/* EDIT MODAL */}
        {edit && (
          <Modal onClose={() => setEdit(null)} maxW="900px" bg="#F8FAFC">
            <MHead label="Edit Post" icon={Pencil} onClose={() => setEdit(null)} />
            <div className="sc overflow-y-auto py-6 px-7 flex flex-col gap-5">
              <div>
                <p className={lbl}>Title</p>
                <input value={edit.title} onChange={(e) => setEdit({ ...edit, title: e.target.value })}
                  className="w-full bg-[#0d0d12] border border-[#2a2a38] rounded-lg py-3 px-4 text-[#e2e2f0] text-[19px] font-bold focus:outline-none focus:border-[#6366f1]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className={lbl}>Category</p>
                  <select value={edit.category} onChange={(e) => setEdit({ ...edit, category: e.target.value })} className={darkInput + " cursor-pointer"}>
                    <option value="">Select Category</option>
                    {["Cars", "Bikes", "News", "Market Analysis"].map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <p className={lbl}>Schedule Publish</p>
                  <input type="datetime-local" className={darkInput}
                    value={edit.publishAt ? new Date(edit.publishAt).toISOString().slice(0, 16) : ""}
                    onChange={(e) => setEdit({ ...edit, publishAt: e.target.value })} />
                </div>
              </div>
              <div>
                <p className={lbl}>Content</p>
                <div className="border border-[#2a2a38] rounded-lg overflow-hidden">
                  <Tiptap key={edit.slug} initialContent={edit.content || ""} setContent={setEditorContent} />
                </div>
              </div>
            </div>
            <div className="py-4 px-7 border-t border-[#2a2a38] flex justify-end gap-2.5 flex-shrink-0">
              <button onClick={() => setEdit(null)} className="bg-[#1e1e2a] border border-[#2a2a38] rounded-lg py-2.5 px-5 text-[#8b8ba8] text-[13px] cursor-pointer">Cancel</button>
              <button onClick={saveEdit} className="ib text-white rounded-lg py-2.5 px-6 text-[13px] font-semibold">Save Changes</button>
            </div>
          </Modal>
        )}

        {/* DELETE CONFIRM */}
        {delConfirm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[360px] shadow-2xl afi">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">Delete Post?</h2>
              <p className="text-sm text-gray-500 mb-5">This action cannot be undone.</p>
              <div className="flex justify-end gap-2">
                <button onClick={() => setDelConfirm(null)} className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition">Cancel</button>
                <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Yes, Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}