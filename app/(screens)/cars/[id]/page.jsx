import Image from "next/image";

export default async function CarDetails({ params }) {
  const { id } = params;

  // ✅ Use relative fetch (works in all environments)
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/blog`, {
    cache: "no-store",
  });

  const data = await res.json();
  const blogs = Array.isArray(data) ? data : data.data || [];

  // ✅ Safe ID match
  const blog = blogs.find((item) => item._id?.toString() === id);

  if (!blog) {
    return (
      <div className="text-center py-20 text-xl">
        Article Not Found
      </div>
    );
  }

  // ✅ Safe image handling
  const imgMatch = blog.content?.match(/<img.*?src="(.*?)"/);

  let image = blog.image || imgMatch?.[1];

  // fallback if broken or invalid
  if (!image || !image.startsWith("http")) {
    image = "/placeholder.jpg";
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">

      {/* TITLE */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        {blog.title}
      </h1>

      {/* DATE */}
      <p className="text-gray-500 mb-6">
        {new Date(blog.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>

      {/* IMAGE */}
      <div className="relative h-[300px] md:h-[450px] mb-6 rounded-xl overflow-hidden">
        <Image
          src={image}
          alt={blog.title}
          fill
          priority   // ✅ Fix LCP warning
          sizes="(max-width: 768px) 100vw, 800px" // ✅ Fix Next.js warning
          className="object-cover"
        />
      </div>

      {/* CONTENT */}
      <div
        className="prose max-w-none prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

    </section>
  );
}