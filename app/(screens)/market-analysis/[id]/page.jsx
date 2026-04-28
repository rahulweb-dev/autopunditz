"use client";

import { useParams } from "next/navigation";
import useBlogs from "@/hooks/useBlogs";
import Image from "next/image";

function extractImage(html) {
  if (!html) return "/placeholder.jpg";
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : "/placeholder.jpg";
}

export default function AnalysisDetails() {
  const params = useParams();
  const id = params?.id;
  const { blogs, isLoading } = useBlogs();

  if (isLoading) return <p className="text-center py-20">Loading...</p>;

  // ✅ FIXED HERE
  const article = blogs.find(
    (item) => item._id === id
  );
  console.log("ID:", id);
  console.log("Blogs:", blogs);
  if (!article) {
    return (
      <div className="text-center py-20 text-xl">
        Article Not Found
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold mb-4">
        {article.title}
      </h1>

      <p className="text-gray-500 mb-6">
        {new Date(article.createdAt).toDateString()}
      </p>

      <div className="relative h-[300px] md:h-[450px] mb-6">
        <Image
          src={extractImage(article.content)}
          fill
          alt={article.title}
          className="object-cover rounded-xl"
        />
      </div>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

    </section>
  );
}