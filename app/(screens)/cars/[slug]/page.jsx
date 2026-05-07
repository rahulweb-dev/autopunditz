"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import useBlogs from "@/hooks/useBlogs";

export default function CarDetails() {

  const params = useParams();

  const slug = params.slug;

  const {
    blogs,
    isLoading,
    isError,
  } = useBlogs();

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center">
        Failed to load
      </div>
    );
  }

  const blog = blogs.find(
    (item) => item.slug === slug
  );

  if (!blog) {
    return (
      <div className="py-20 text-center">
        Article Not Found
      </div>
    );
  }

  const imgMatch =
    blog.content?.match(
      /<img.*?src="(.*?)"/
    );

  let image =
    blog.image || imgMatch?.[1];

  if (
    !image ||
    !image.startsWith("http")
  ) {
    image = "/placeholder.jpg";
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">

      <h1 className="text-4xl font-bold mb-4">
        {blog.title}
      </h1>

      <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
        <Image
          src={image}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: blog.content,
        }}
      />

    </section>
  );
}