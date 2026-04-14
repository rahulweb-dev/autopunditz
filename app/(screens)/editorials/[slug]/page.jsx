import Image from "next/image";

import { editorials } from "@/app/constants/data/editorialData";

export default async function EditorialDetails({ params }) {

  const { slug } = await params;

  const index = editorials.findIndex(
    (item) => item.slug === slug
  );

  const articles = editorials.slice(index);

  return (

    <section className="max-w-4xl mx-auto px-4 py-10">

      {articles.map((item) => (

        <div key={item.slug} className="mb-16">

          <h1 className="text-3xl font-bold mb-4">
            {item.title}
          </h1>

          <p className="text-gray-500 mb-6">
            {item.date}
          </p>

          <div className="relative h-[300px] md:h-[450px] mb-6">

            <Image
              src={item.image}
              fill
              alt=""
              className="object-cover rounded-xl"
            />

          </div>

          <p className="text-lg">
            {item.excerpt}
          </p>

          <hr className="mt-12" />

        </div>

      ))}

    </section>

  );

}