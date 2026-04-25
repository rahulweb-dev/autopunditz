import Image from "next/image";
import { headers } from "next/headers";

export default async function BikeDetails({ params }) {
  const { id } = await params;

  // ✅ Fix fetch
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/blog`, {
    cache: "no-store",
  });

  const data = await res.json();
  const blogs = Array.isArray(data) ? data : data.data || [];

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

  const imgMatch = blog.content?.match(/<img.*?src="(.*?)"/);
  let image = blog.image || imgMatch?.[1];

  if (!image || !image.startsWith("http")) {
    image = "/placeholder.jpg";
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">

      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        {blog.title}
      </h1>

      <p className="text-gray-500 mb-6">
        {new Date(blog.createdAt).toLocaleDateString("en-IN")}
      </p>

      <div className="relative h-[300px] md:h-[450px] mb-6 rounded-xl overflow-hidden">
        {image.startsWith("http") ? (
          <Image
            src={image}
            fill
            alt={blog.title}
            className="object-cover"
          />
        ) : (
          <img
            src={image}
            alt="placeholder"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div
        className="prose max-w-none whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

    </section>
  );
}