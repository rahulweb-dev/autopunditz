"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function resolveImage(blog) {
  if (blog.ogImage?.startsWith("http")) return blog.ogImage;
  const m = blog.content?.match(/<img[^>]+src="([^"]+)"/);
  return m?.[1] || null;
}

function ArticleBody({ blog, priority = false }) {
  const image = resolveImage(blog);
  const date = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
        {blog.title}
      </h1>

      <p className="text-gray-500 text-sm mb-6">
        {date}
        {blog.subCategory && (
          <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
            {blog.subCategory}
          </span>
        )}
      </p>

      {image && (
        <div className="relative h-[280px] md:h-[450px] mb-8 rounded-2xl overflow-hidden bg-gray-100">
          <Image
            src={image}
            alt={blog.imageAlt || blog.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </div>
      )}

      <div
        className="prose prose-lg max-w-none prose-img:rounded-xl prose-img:w-full prose-img:h-auto prose-img:my-6 prose-a:text-red-600"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </section>
  );
}

export default function ContinuousReader({ initialBlog, category, subCategory, basePath }) {
  const [articles, setArticles] = useState([initialBlog]);
  const [loadingNext, setLoadingNext] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const sentinelRef = useRef(null);
  const loadedSlugs = useRef([initialBlog.slug]);
  // track current URL slug (for back-navigation awareness)
  const fetchingRef = useRef(false);

  const fetchNext = useCallback(async () => {
    if (fetchingRef.current || noMore) return;
    fetchingRef.current = true;
    setLoadingNext(true);

    const params = new URLSearchParams();
    params.set("slug", loadedSlugs.current[loadedSlugs.current.length - 1]);
    if (category) params.set("category", category);
    if (subCategory) params.set("subCategory", subCategory);
    loadedSlugs.current.forEach((s) => params.append("loaded", s));

    try {
      const res = await fetch(`/api/blog/next?${params.toString()}`);
      if (!res.ok) { setNoMore(true); return; }
      const blog = await res.json();
      if (!blog || !blog.slug) { setNoMore(true); return; }
      loadedSlugs.current.push(blog.slug);
      setArticles((prev) => [...prev, blog]);
    } catch {
      setNoMore(true);
    } finally {
      fetchingRef.current = false;
      setLoadingNext(false);
    }
  }, [noMore, category, subCategory]);

  // Load next article when sentinel enters viewport
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNext();
      },
      { rootMargin: "500px" }
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, [fetchNext]);

  // Update browser URL + document title as each article scrolls into view
  useEffect(() => {
    const observers = [];
    articles.forEach((blog) => {
      const el = document.getElementById(`cr-article-${blog.slug}`);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            window.history.replaceState({}, "", `${basePath}/${blog.slug}`);
            document.title = blog.metaTitle || blog.title;
          }
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((io) => io.disconnect());
  }, [articles, basePath]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {articles.map((blog, i) => (
        <div key={blog.slug} id={`cr-article-${blog.slug}`}>
          {/* Divider between articles */}
          {i > 0 && (
            <div className="max-w-4xl mx-auto px-4 py-8">
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase px-4 py-1.5 rounded-full border border-gray-200 bg-white">
                  Next Article
                </span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
            </div>
          )}

          <ArticleBody blog={blog} priority={i === 0} />
        </div>
      ))}

      {/* Sentinel + loading indicator */}
      <div ref={sentinelRef} className="max-w-4xl mx-auto px-4 pb-16 flex justify-center">
        {loadingNext && (
          <div className="flex items-center gap-3 text-gray-400 text-sm py-8">
            <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            Loading next article…
          </div>
        )}
        {noMore && !loadingNext && (
          <div className="text-center py-10">
            <p className="text-sm text-gray-400 mb-4">You've read everything in this section</p>
            <Link
              href={(basePath || "").replace(/\/[^/]+$/, "") || "/"}
              className="text-sm font-semibold text-red-500 hover:text-red-600 underline underline-offset-2"
            >
              ← Back to listing
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
