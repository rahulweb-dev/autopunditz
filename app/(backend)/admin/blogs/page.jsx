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
  "sales",
  "news",
  "marketanalysis",
  "editorials"
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
    className="modal-overlay fixed inset-0  backdrop-blur-[14px] z-50 flex items-center justify-center p-6"
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
  const [toast, setToast] =
    useState(null);

  const [subF, setSubF] =
    useState("all");

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

          if (k) {

            c[k] =
              (c[k] || 0) +
              1;

          }
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

            (subF ===
              "all" ||
              (
                b.subCategory ||
                ""
              ) === subF) &&

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
      subF,
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

        // ✅ SUCCESS TOAST
        setToast({
          type: "success",
          message:
            "Blog deleted successfully",
        });

        // ✅ AUTO HIDE
        setTimeout(() => {

          setToast(null);

        }, 3000);

      } catch (err) {

        console.error(
          err
        );

        setToast({
          type: "error",
          message:
            err.message ||
            "Delete failed",
        });

        setTimeout(() => {

          setToast(null);

        }, 3000);

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

          {/* TOP FILTERS */}
          <div className="flex gap-2.5 items-center flex-wrap mb-3.5">

            <div className="relative flex-1 min-w-[180px]">

              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4b4b6a]"
              />

              <input
                className="si w-full bg-[#0d0d12] border border-[#2a2a38] rounded-lg py-[9px] px-3 pl-8 text-[#e2e2f0] text-[13px]"
                placeholder="Search posts…"
                value={search}
                onChange={(e) => {

                  setSearch(
                    e.target.value
                  );

                  setPage(1);

                }}
              />

            </div>

            <input
              type="date"
              value={from}
              onChange={(e) =>
                setFrom(
                  e.target.value
                )
              }
              className={`${sel} text-[#e2e2f0] bg-[#0d0d12]`}
            />

            <input
              type="date"
              value={to}
              onChange={(e) =>
                setTo(
                  e.target.value
                )
              }
              className={`${sel} text-[#e2e2f0] bg-[#0d0d12]`}
            />

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value
                )
              }
              className={`${sel} bg-[#0d0d12] text-[#e2e2f0]`}
            >

              {Object.entries(
                SORTS
              ).map(
                ([v, l]) => (

                  <option
                    key={v}
                    value={v}
                  >
                    {l}
                  </option>

                )
              )}

            </select>

            <select
              value={perPage}
              onChange={(e) => {

                setPerPage(
                  +e.target.value
                );

                setPage(1);

              }}
              className={`${sel} bg-[#0d0d12] text-[#e2e2f0]`}
            >

              {[10, 20, 50].map(
                (n) => (

                  <option
                    key={n}
                    value={n}
                  >
                    {n} / page
                  </option>

                )
              )}

            </select>

          </div>

          {/* CATEGORY + STATUS */}
          <div className="flex gap-2 flex-wrap items-center"> {[
              {
                label: "Cat",
                items: CATS,
                active: catF,
                set: rp(setCatF),
                counts: catCounts,
              },

              {
                label: "Status",
                items: STATUSES,
                active: statusF,
                set: rp(setStatusF),
              },

            ].map(
              ({
                label,
                items,
                active,
                set,
                counts,
              }, gi) => (

                <div
                  key={label}
                  className="flex items-center gap-2 flex-wrap"
                >

                  {gi > 0 && (
                    <div className="w-px h-[18px] bg-[#2a2a38] mx-1" />
                  )}

                  <span className="text-[11px] text-white font-semibold uppercase tracking-[0.08em]">

                    {label}

                  </span>

                  {items.map(
                    (v) => (

                      <Pill
                        key={v}
                        v={v}
                        active={
                          active === v
                        }
                        onClick={() =>
                          set(v)
                        }
                        count={
                          counts?.[v]
                        }
                      />

                    )
                  )}

                </div>

              )
            )}

            {/* SUB CATEGORY */}
            {catF !== "all" && (

              <div className="flex items-center gap-2 flex-wrap ml-3">

                <div className="w-px h-[18px] bg-[#2a2a38]" />

                <span className="text-[11px] text-white font-semibold uppercase tracking-[0.08em]">

                  Sub

                </span>

                <Pill
                  v="all"
                  active={
                    subF === "all"
                  }
                  onClick={() =>
                    rp(setSubF)(
                      "all"
                    )
                  }
                />

                {[
                  ...new Set(
                    blogs
                      .filter(
                        (b) =>
                          (
                            b.category ||
                            ""
                          ).toLowerCase() ===
                          catF
                      )
                      .map(
                        (b) =>
                          b.subCategory
                      )
                      .filter(Boolean)
                  ),
                ].map(
                  (s) => (

                    <Pill
                      key={s}
                      v={s}
                      active={
                        subF === s
                      }
                      onClick={() =>
                        rp(setSubF)(
                          s
                        )
                      }
                    />

                  )
                )}

              </div>

            )}

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
        <div className="relative overflow-hidden rounded-3xl border border-[#262637] bg-[#111118]/95 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">

          {/* TOP GLOW */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#6366f1] to-transparent opacity-70" />

          <div className="overflow-x-auto">

            <div className="max-h-[650px] overflow-y-auto">

              <table className="w-full border-collapse min-w-[1100px]">

                {/* HEADER */}
                <thead className="sticky top-0 z-20">

                  <tr className="bg-[#0b0b11]/95 backdrop-blur-xl border-b border-[#232332]">

                    <th className="py-4 px-5 w-[50px]">

                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-[#6366f1] cursor-pointer rounded"
                        onChange={toggleAll}
                        checked={
                          paged.length >
                          0 &&
                          sel2.length ===
                          paged.length
                        }
                      />

                    </th>

                    {[
                      "Post",
                      "Category",
                      "Sub Category",
                      "Status",
                      "Views",
                      "Published",
                      "Actions",
                    ].map((h, i) => (

                      <th
                        key={i}
                        className={`py-4 px-5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#8b8ba7] ${i === 0
                            ? "text-left"
                            : i === 6
                              ? "text-right"
                              : "text-center"
                          }`}
                      >

                        {h}

                      </th>

                    ))}

                  </tr>

                </thead>

                {/* BODY */}
                <tbody>

                  {paged.length ===
                    0 && (

                      <tr>

                        <td
                          colSpan={7}
                          className="py-24 text-center"
                        >

                          <div className="flex flex-col items-center">

                            <div className="w-16 h-16 rounded-2xl bg-[#1a1a28] border border-[#2a2a38] flex items-center justify-center mb-4">

                              <FileText
                                size={28}
                                className="text-[#4b4b6a]"
                              />

                            </div>

                            <h3 className="text-[#d1d1de] font-semibold text-[16px] mb-1">

                              No Posts Found

                            </h3>

                            <p className="text-[#5b5b75] text-[13px]">

                              Try changing filters or create a new blog post

                            </p>

                          </div>

                        </td>

                      </tr>

                    )}

                  {paged.map((b) => (

                    <tr
                      key={b.slug}
                      className="group border-b border-[#1a1a24] hover:bg-[#171722]/80 transition-all duration-200"
                    >

                      {/* CHECKBOX */}
                      <td className="py-4 px-5">

                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-[#6366f1] cursor-pointer rounded"
                          checked={sel2.includes(
                            b.slug
                          )}
                          onChange={() =>
                            toggle(
                              b.slug
                            )
                          }
                        />

                      </td>

                      {/* POST */}
                      <td className="py-4 px-5">

                        <div className="flex items-center gap-4">

                          {/* IMAGE */}
                          <div className="relative w-[90px] h-[60px] rounded-2xl overflow-hidden border border-[#2a2a38] bg-[#1a1a28] shadow-md flex-shrink-0">

                            <Image
                              src={thumb(
                                b.content
                              )}
                              alt={
                                b.title
                              }
                              fill
                              className="object-cover group-hover:scale-105 transition duration-300"
                            />

                          </div>

                          {/* CONTENT */}
                          <div className="min-w-0">

                            <h3 className="text-[#f3f3fa] font-semibold text-[14px] leading-snug line-clamp-2 mb-1 max-w-[320px]">

                              {b.title}

                            </h3>

                            <div className="flex items-center gap-2 text-[11px] text-[#666681]">

                              <span className="font-medium text-[#9c9cb7]">

                                {b.author ||
                                  "Admin"}

                              </span>

                              <span>
                                •
                              </span>

                              <span className="truncate max-w-[180px]">

                                /blog/
                                {b.slug}

                              </span>

                            </div>

                          </div>

                        </div>

                      </td>

                      {/* CATEGORY */}
                      <td className="py-4 px-5 text-center">

                        <span className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold bg-[#1c1c29] border border-[#2d2d40] text-[#b8b8cc]">

                          {b.category ||
                            "—"}

                        </span>

                      </td>

                      {/* SUB CATEGORY */}
                      <td className="py-4 px-5 text-center">

                        <span className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold bg-[#151520] border border-[#29293b] text-[#8f8fa8]">

                          {b.subCategory ||
                            "—"}

                        </span>

                      </td>

                      {/* STATUS */}
                      <td className="py-4 px-5 text-center">

                        <select
                          value={
                            b.status
                          }
                          onChange={(
                            e
                          ) =>
                            updateStatus(
                              b.slug,
                              e.target
                                .value
                            )
                          }
                          className="rounded-xl border px-3 py-1.5 text-[12px] font-semibold outline-none cursor-pointer transition"
                          style={{
                            color:
                              STATUS_CLR[
                              b.status
                              ],

                            background:
                              `${STATUS_CLR[
                              b.status
                              ]}15`,

                            borderColor:
                              `${STATUS_CLR[
                              b.status
                              ]}35`,
                          }}
                        >

                          {[
                            "draft",
                            "published",
                            "scheduled",
                          ].map((s) => (

                            <option
                              key={s}
                              value={s}
                            >
                              {s}
                            </option>

                          ))}

                        </select>

                      </td>

                      {/* VIEWS */}
                      <td className="py-4 px-5 text-center">

                        <div className="inline-flex items-center gap-1.5 text-[#b8b8cc] text-[13px] font-medium">

                          <Eye
                            size={14}
                            className="text-[#6366f1]"
                          />

                          {(b.views ||
                            0).toLocaleString()}

                        </div>

                      </td>

                      {/* DATE */}
                      <td className="py-4 px-5 text-center">

                        <div className="text-[#d1d1de] text-[13px] font-medium">

                          {fmt(
                            b.createdAt,
                            {
                              month:
                                "short",

                              day:
                                "numeric",

                              year:
                                "numeric",
                            }
                          )}

                        </div>

                        <div className="text-[#5f5f77] text-[11px] mt-1">

                          {fmt(
                            b.createdAt,
                            {
                              hour:
                                "numeric",

                              minute:
                                "2-digit",
                            }
                          )}

                        </div>

                      </td>

                      {/* ACTIONS */}
                      <td className="py-4 px-5">

                        <div className="flex justify-end gap-2">

                          {[
                            [
                              Eye,
                              "#6366f1",
                              () =>
                                setPreview(
                                  b
                                ),
                            ],

                            [
                              Pencil,
                              "#10b981",
                              () =>
                                setEdit(
                                  b
                                ),
                            ],

                            [
                              Trash2,
                              "#ef4444",
                              () =>
                                setDelConfirm(
                                  b.slug
                                ),
                            ],

                          ].map(
                            (
                              [
                                Icon,
                                c,
                                fn,
                              ],
                              i
                            ) => (

                              <button
                                key={i}
                                onClick={
                                  fn
                                }
                                className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200 hover:scale-105"
                                style={{
                                  backgroundColor:
                                    `${c}12`,

                                  borderColor:
                                    `${c}25`,

                                  color:
                                    c,
                                }}
                              >

                                <Icon
                                  size={
                                    15
                                  }
                                />

                              </button>

                            )
                          )}

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* PAGINATION */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center px-6 py-5 border-t border-[#1c1c29] bg-[#0c0c12]">

            <div className="text-[13px] text-[#7a7a95]">

              {filtered.length ===
                0 ? (
                "No results found"
              ) : (
                <>
                  Showing
                  {" "}
                  <span className="font-semibold text-[#d7d7e5]">

                    {(page - 1) *
                      perPage +
                      1}

                    –
                    {Math.min(
                      page *
                      perPage,
                      filtered.length
                    )}

                  </span>
                  
                  of
                 
                  <span className="font-semibold text-[#d7d7e5]">

                    {
                      filtered.length
                    }

                  </span>
                  {" "}
                  posts
                </>
              )}

            </div>

            <div className="flex items-center gap-2">

              {/* PREV */}
              <button
                onClick={() =>
                  setPage((p) =>
                    Math.max(
                      1,
                      p - 1
                    )
                  )
                }
                disabled={
                  page === 1
                }
                className="w-10 h-10 rounded-xl border border-[#2a2a38] bg-[#16161e] text-[#8b8ba8] flex items-center justify-center disabled:opacity-40 hover:bg-[#1d1d29] transition"
              >

                <ChevronLeft
                  size={16}
                />

              </button>

              {/* PAGES */}
              {[...Array(
                Math.min(
                  totalPages,
                  5
                )
              )].map((_, i) => (

                <button
                  key={i}
                  onClick={() =>
                    setPage(i + 1)
                  }
                  className={`min-w-[40px] h-10 rounded-xl text-[13px] font-semibold transition ${page ===
                      i + 1
                      ? "bg-[#6366f1] text-white shadow-lg shadow-[#6366f155]"
                      : "bg-[#16161e] border border-[#2a2a38] text-[#8b8ba8] hover:bg-[#1d1d29]"
                    }`}
                >

                  {i + 1}

                </button>

              ))}

              {/* NEXT */}
              <button
                onClick={() =>
                  setPage((p) =>
                    Math.min(
                      totalPages,
                      p + 1
                    )
                  )
                }
                disabled={
                  page ===
                  totalPages
                }
                className="w-10 h-10 rounded-xl border border-[#2a2a38] bg-[#16161e] text-[#8b8ba8] flex items-center justify-center disabled:opacity-40 hover:bg-[#1d1d29] transition"
              >

                <ChevronRight
                  size={16}
                />

              </button>

            </div>

          </div>

        </div>

        {/* PREVIEW MODAL */}
        {preview && (

          <Modal
            onClose={() =>
              setPreview(null)
            }
            maxW="1000px"
            bg="#ffffff"
          >

            {/* HEADER */}
            <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-7 py-5 flex items-center justify-between">

              <div>

                <h2 className="text-[22px] font-bold text-gray-900">

                  Blog Preview

                </h2>

                <p className="text-[13px] text-gray-500 mt-1">

                  Live article preview before publishing

                </p>

              </div>

              <button
                onClick={() =>
                  setPreview(null)
                }
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
              >

                <X
                  size={16}
                  className="text-gray-600"
                />

              </button>

            </div>

            {/* BODY */}
            <div className="overflow-y-auto max-h-[88vh] bg-[#f8fafc]">

              {/* HERO IMAGE */}
              {thumb(
                preview.content
              ) !==
                "/placeholder.jpg" && (

                  <div className="relative h-[340px] overflow-hidden">

                    <img
                      src={thumb(
                        preview.content
                      )}
                      className="w-full h-full object-cover"
                      alt=""
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* OVERLAY CONTENT */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">

                      <div className="flex gap-2 flex-wrap mb-4">

                        {preview.status && (

                          <span
                            className="px-3 py-1 rounded-full text-[12px] font-semibold capitalize backdrop-blur-md"
                            style={{
                              background:
                                `${STATUS_CLR[
                                preview.status
                                ]}25`,

                              color:
                                STATUS_CLR[
                                preview.status
                                ],

                              border: `1px solid ${STATUS_CLR[
                                preview.status
                              ]}40`,
                            }}
                          >

                            {preview.status}

                          </span>

                        )}

                        {preview.category && (

                          <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-white/15 border border-white/20 backdrop-blur-md">

                            {
                              preview.category
                            }

                          </span>

                        )}

                        {preview.subCategory && (

                          <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-white/15 border border-white/20 backdrop-blur-md">

                            {
                              preview.subCategory
                            }

                          </span>

                        )}

                      </div>

                      <h1 className="text-[38px] font-bold leading-tight max-w-[850px]">

                        {preview.title}

                      </h1>

                    </div>

                  </div>

                )}

              {/* ARTICLE BODY */}
              <div className="max-w-[850px] mx-auto px-7 py-10">

                {/* ARTICLE META */}
                <div className="flex flex-wrap items-center gap-5 text-[13px] text-gray-500 border-b border-gray-200 pb-5 mb-8">

                  <div className="flex items-center gap-2">

                    <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-[14px]">

                      {(
                        preview.author ||
                        "A"
                      )
                        .charAt(0)
                        .toUpperCase()}

                    </div>

                    <div>

                      <div className="font-semibold text-gray-800">

                        {preview.author ||
                          "Admin"}

                      </div>

                      <div className="text-[12px] text-gray-400">

                        Author

                      </div>

                    </div>

                  </div>

                  <div>

                    <div className="font-medium text-gray-700">

                      {fmt(
                        preview.createdAt,
                        {
                          month:
                            "long",

                          day:
                            "numeric",

                          year:
                            "numeric",
                        }
                      )}

                    </div>

                    <div className="text-[12px] text-gray-400">

                      Published Date

                    </div>

                  </div>

                  <div>

                    <div className="font-medium text-gray-700 flex items-center gap-1.5">

                      <Eye size={14} />

                      {preview.views ||
                        0}

                    </div>

                    <div className="text-[12px] text-gray-400">

                      Views

                    </div>

                  </div>

                </div>

                {/* SEO URL */}
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-5 py-4 mb-8">

                  <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-indigo-500 mb-1">

                    SEO URL

                  </div>

                  <div className="text-[14px] text-indigo-700 font-medium break-all">

                    /blog/
                    {preview.slug}

                  </div>

                </div>

                {/* CONTENT */}
                <div
                  className={`
    prose
    prose-lg
    max-w-none
    prose-headings:text-gray-900
    prose-p:text-gray-700
    prose-p:leading-8
    prose-li:text-gray-700
    prose-strong:text-gray-900
    prose-img:rounded-2xl
    prose-img:shadow-md
    prose-a:text-indigo-600
  `}
                  dangerouslySetInnerHTML={{
                    __html:
                      preview.content,
                  }}
                />


              </div>

            </div>

            {/* FOOTER */}
            <div className="border-t border-gray-200 px-7 py-4 bg-white flex justify-between items-center">

              <div className="text-[12px] text-gray-500">

                Preview Mode

              </div>

              <button
                onClick={() =>
                  setPreview(null)
                }
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-[14px] font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
              >

                Close Preview

              </button>

            </div>

          </Modal>

        )}

        {/* EDIT MODAL */}
        {edit && (

          <Modal
            onClose={() =>
              setEdit(null)
            }
            maxW="980px"
            bg="#ffffff"
          >

            {/* HEADER */}
            <div className="border-b border-gray-200 px-7 py-5 flex items-center justify-between bg-white sticky top-0 z-10">

              <div>

                <h2 className="text-[22px] font-bold text-gray-900">

                  Edit Blog Post

                </h2>

                <p className="text-[13px] text-gray-500 mt-1">

                  Update blog content, SEO slug, category and publishing details

                </p>

              </div>

              <button
                onClick={() =>
                  setEdit(null)
                }
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
              >

                <X
                  size={16}
                  className="text-gray-600"
                />

              </button>

            </div>

            {/* BODY */}
            <div className="overflow-y-auto max-h-[78vh] px-7 py-6 bg-[#f8fafc]">

              <div className="space-y-6">

                {/* TITLE */}
                <div>

                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">

                    Blog Title

                  </label>

                  <input
                    value={edit.title}
                    onChange={(e) =>
                      setEdit({
                        ...edit,
                        title:
                          e.target.value,
                      })
                    }
                    placeholder="Enter blog title..."
                    className="w-full bg-white border border-gray-300 rounded-xl py-3.5 px-4 text-[18px] font-semibold text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
                  />

                </div>

                {/* SLUG */}
                <div>

                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">

                    SEO Slug

                  </label>

                  <input
                    value={edit.slug || ""}
                    onChange={(e) =>
                      setEdit({
                        ...edit,
                        slug:
                          e.target.value
                            .toLowerCase()
                            .replaceAll(
                              " ",
                              "-"
                            ),
                      })
                    }
                    placeholder="seo-friendly-url"
                    className="w-full bg-white border border-gray-300 rounded-xl py-3 px-4 text-[14px] text-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
                  />

                  <p className="text-[12px] text-gray-500 mt-2">

                    Example:
                    <span className="text-indigo-600 ml-1">

                      /blog/
                      {edit.slug}

                    </span>

                  </p>

                </div>

                {/* CATEGORY GRID */}
                <div className="grid md:grid-cols-3 gap-5">

                  {/* CATEGORY */}
                  <div>

                    <label className="block text-[13px] font-semibold text-gray-700 mb-2">

                      Category

                    </label>

                    <select
                      value={
                        edit.category ||
                        ""
                      }
                      onChange={(e) =>
                        setEdit({
                          ...edit,
                          category:
                            e.target
                              .value,
                        })
                      }
                      className="w-full bg-white border border-gray-300 rounded-xl py-3 px-4 text-[14px] text-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
                    >

                      <option value="">
                        Select Category
                      </option>

                      {[
                        "Cars",
                        "Bikes",
                        "News",
                        "Market Analysis",
                      ].map((c) => (

                        <option
                          key={c}
                          value={c}
                        >
                          {c}
                        </option>

                      ))}

                    </select>

                  </div>

                  {/* SUB CATEGORY */}
                  <div>

                    <label className="block text-[13px] font-semibold text-gray-700 mb-2">

                      Sub Category

                    </label>

                    <input
                      value={
                        edit.subCategory ||
                        ""
                      }
                      onChange={(e) =>
                        setEdit({
                          ...edit,
                          subCategory:
                            e.target
                              .value,
                        })
                      }
                      placeholder="Enter sub category"
                      className="w-full bg-white border border-gray-300 rounded-xl py-3 px-4 text-[14px] text-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
                    />

                  </div>

                  {/* DATE */}
                  <div>

                    <label className="block text-[13px] font-semibold text-gray-700 mb-2">

                      Publish Date

                    </label>

                    <input
                      type="datetime-local"
                      value={
                        edit.publishAt
                          ? new Date(
                            edit.publishAt
                          )
                            .toISOString()
                            .slice(
                              0,
                              16
                            )
                          : ""
                      }
                      onChange={(e) =>
                        setEdit({
                          ...edit,
                          publishAt:
                            e.target
                              .value,
                        })
                      }
                      className="w-full bg-white border border-gray-300 rounded-xl py-3 px-4 text-[14px] text-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
                    />

                  </div>

                </div>

                {/* STATUS */}
                <div>

                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">

                    Status

                  </label>

                  <select
                    value={
                      edit.status ||
                      "draft"
                    }
                    onChange={(e) =>
                      setEdit({
                        ...edit,
                        status:
                          e.target
                            .value,
                      })
                    }
                    className="w-full md:w-[240px] bg-white border border-gray-300 rounded-xl py-3 px-4 text-[14px] text-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
                  >

                    <option value="draft">
                      Draft
                    </option>

                    <option value="published">
                      Published
                    </option>

                    <option value="scheduled">
                      Scheduled
                    </option>

                  </select>

                </div>

                {/* CONTENT */}
                <div>

                  <div className="flex items-center justify-between mb-3">

                    <label className="text-[13px] font-semibold text-gray-700">

                      Blog Content

                    </label>

                    <div className="text-[12px] text-gray-400">

                      Rich Text Editor

                    </div>

                  </div>

                  <div className="border border-gray-300 rounded-2xl overflow-hidden bg-white shadow-sm">

                    <Tiptap
                      key={edit.slug}
                      initialContent={
                        edit.content ||
                        ""
                      }
                      setContent={
                        setEditorContent
                      }
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* FOOTER */}
            <div className="border-t border-gray-200 px-7 py-5 flex items-center justify-between bg-white">

              <div className="text-[12px] text-gray-500">

                Last updated:
                {" "}
                {edit.updatedAt
                  ? new Date(
                    edit.updatedAt
                  ).toLocaleString()
                  : "Now"}

              </div>

              <div className="flex items-center gap-3">

                <button
                  onClick={() =>
                    setEdit(null)
                  }
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-[14px] font-medium hover:bg-gray-100 transition"
                >

                  Cancel

                </button>

                <button
                  onClick={saveEdit}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-[14px] font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
                >

                  Save Changes

                </button>

              </div>

            </div>

          </Modal>

        )}
        {/* TOAST */}
        {toast && (

          <div className="fixed top-5 right-5 z-[9999] animate-in slide-in-from-top-5 duration-300">

            <div
              className={`min-w-[300px] rounded-2xl shadow-2xl border px-5 py-4 flex items-start gap-3 backdrop-blur-xl ${toast.type ===
                "success"
                ? "bg-emerald-500 text-white border-emerald-400"
                : "bg-red-500 text-white border-red-400"
                }`}
            >

              <div className="mt-0.5">

                {toast.type ===
                  "success" ? (

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />

                  </svg>

                ) : (

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />

                  </svg>

                )}

              </div>

              <div className="flex-1">

                <p className="font-semibold text-[14px]">

                  {toast.type ===
                    "success"
                    ? "Success"
                    : "Error"}

                </p>

                <p className="text-[13px] opacity-90 mt-0.5">

                  {toast.message}

                </p>

              </div>

              <button
                onClick={() =>
                  setToast(null)
                }
                className="opacity-80 hover:opacity-100"
              >

                <X size={16} />

              </button>

            </div>

          </div>

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