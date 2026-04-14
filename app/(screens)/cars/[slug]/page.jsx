import { newsData } from "@/app/constants/data/newsData";
import Image from "next/image";

export default async function CarDetails({ params }) {

  const { slug } = await params;

  // Find index
  const currentIndex = newsData.Cars.findIndex(
    (item) => item.slug === slug
  );

  if (currentIndex === -1) {
    return (
      <div className="text-center py-20 text-xl">
        Article Not Found
      </div>
    );
  }

  // Get all articles from selected to end
  const articles = newsData.Cars.slice(currentIndex);

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">

      {articles.map((car, index) => (
        <div key={car.slug} className="mb-16">

          <h1 className="text-3xl font-bold mb-4">
            {car.title}
          </h1>

          <p className="text-gray-500 mb-6">
            {car.date}
          </p>

          <div className="relative h-[300px] md:h-[450px] mb-6">
            <Image
              src={car.image}
              fill
              alt={car.title}
              className="object-cover rounded-xl"
            />
          </div>

          <p className="text-lg leading-relaxed">
            {car.content}
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