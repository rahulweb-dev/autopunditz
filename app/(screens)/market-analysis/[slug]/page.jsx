"use client";

import { useParams } from "next/navigation";
import useBlogs from "@/hooks/useBlogs";
import Image from "next/image";

function extractImage(html) {

  if (!html) {
    return "/placeholder.jpg";
  }

  const match =
    html.match(
      /<img[^>]+src="([^">]+)"/
    );

  return match
    ? match[1]
    : "/placeholder.jpg";

}

export default function AnalysisDetails() {

  const params =
    useParams();

  // ✅ USE SLUG
  const slug = Array.isArray(params?.slug)
    ? params.slug[0]
    : params?.slug;
  const {
    blogs,
    isLoading,
  } = useBlogs();

  // ✅ LOADING
  if (isLoading) {

    return (
      <p className="text-center py-20">
        Loading...
      </p>
    );

  }

  // ✅ FIND USING SLUG
  const article =
    blogs.find(
      (item) =>
        item.slug === slug
    );

  console.log(
    "SLUG:",
    slug
  );

  console.log(
    "ARTICLE:",
    article
  );

  // ✅ NOT FOUND
  if (!article) {

    return (
      <div className="text-center py-20 text-xl">
        Article Not Found
      </div>
    );

  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">

      {/* TITLE */}
      <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">

        {article.title}

      </h1>

      {/* DATE */}
      <p className="text-gray-500 mb-6">

        {article.createdAt
          ? new Date(
            article.createdAt
          ).toLocaleDateString(
            "en-IN",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          )
          : ""}

      </p>

      {/* IMAGE */}
      <div className="relative h-[300px] md:h-[450px] mb-8 rounded-2xl overflow-hidden">

        <Image
          src={extractImage(
            article.content
          )}
          fill
          alt={article.title}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
          priority
        />

      </div>

      {/* CONTENT */}
      <article
        className="
          prose
          prose-lg
          max-w-none
          prose-img:rounded-xl
          prose-img:w-full
          prose-img:h-auto
          prose-img:my-6
        "
        dangerouslySetInnerHTML={{
          __html:
            article.content
              ?.replace(
                /width="[^"]*"/g,
                ""
              )
              ?.replace(
                /height="[^"]*"/g,
                ""
              )
              ?.replace(
                /style="[^"]*"/g,
                ""
              ),
        }}
      />

    </section>
  );

}