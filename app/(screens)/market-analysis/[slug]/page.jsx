import { analyses } from "@/app/constants/data/marketAnalysisData";
import Image from "next/image";

export default async function AnalysisDetails({ params }) {

  const { slug } = await params;

  // Find current index

  const currentIndex = analyses.findIndex(
    (item) => item.slug === slug
  );

  if (currentIndex === -1) {
    return (
      <div className="text-center py-20 text-xl">
        Article Not Found
      </div>
    );
  }

  // Get all remaining articles

  const articles = analyses.slice(currentIndex);

  return (

    <section className="max-w-5xl mx-auto px-4 py-10">

      {articles.map((article, index) => (

        <div key={article.slug} className="mb-16">

          <h1 className="text-3xl font-bold mb-4">
            {article.title}
          </h1>

          <p className="text-gray-500 mb-6">
            {article.date}
          </p>

          <div className="relative h-[300px] md:h-[450px] mb-6">

            <Image
              src={article.image}
              fill
              alt={article.title}
              className="object-cover rounded-xl"
            />

          </div>

          <p className="text-lg leading-relaxed">
            {article.description}
          </p>

          {/* Divider */}

          {index !== articles.length - 1 && (
            <hr className="mt-12 border-gray-300" />
          )}

        </div>

      ))}

    </section>

  );

}