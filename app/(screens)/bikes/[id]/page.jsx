import Image from "next/image";

export default async function BikeDetails({ params }) {
  const { id } = params;

  // ✅ Fetch all blogs
  const res = await fetch("http://localhost:3000/api/blog", {
    cache: "no-store",
  });

  const data = await res.json();
  const blogs = Array.isArray(data) ? data : data.data || [];

  // ✅ Find clicked bike blog
  const blog = blogs.find(
    (item) => item._id?.toString() === id
  );

  if (!blog) {
    return (
      <div className="text-center py-20 text-xl">
        Bike Article Not Found
      </div>
    );
  }

  // ✅ Image extract
  const imgMatch = blog.content?.match(/<img.*?src="(.*?)"/);
  const image = blog.image || imgMatch?.[1] || "/placeholder.jpg";

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">

      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        {blog.title}
      </h1>

      <p className="text-gray-500 mb-6">
        {new Date(blog.createdAt).toLocaleDateString("en-IN")}
      </p>

      <div className="relative h-[300px] md:h-[450px] mb-6 rounded-xl overflow-hidden">
        <Image
          src={image}
          fill
          alt={blog.title}
          className="object-cover"
        />
      </div>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

    </section>
  );
}