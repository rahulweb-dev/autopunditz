import { posts } from "@/app/constants/data/latestPostsData";
import Image from "next/image";

export default async function PostDetails({ params }) {

  const { slug } = await params;

  const index = posts.findIndex(
    (item) => item.slug === slug
  );

  const articles = posts.slice(index);

  return (

    <section className="max-w-4xl mx-auto px-4 py-10">

      {articles.map((post) => (

        <div key={post.slug} className="mb-16">

          <h1 className="text-3xl font-bold mb-4">
            {post.title}
          </h1>

          <p className="text-gray-500 mb-6">
            {post.date} • {post.readTime}
          </p>

          <div className="relative h-[300px] md:h-[450px] mb-6">

            <Image
              src={post.image}
              fill
              alt=""
              className="object-cover rounded-xl"
            />

          </div>

          <p className="text-lg leading-relaxed">
            {post.content}
          </p>

          <hr className="mt-12" />

        </div>

      ))}

    </section>

  )

}