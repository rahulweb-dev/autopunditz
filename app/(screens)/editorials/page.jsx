"use client";

import Image from "next/image";
import Link from "next/link";
import { editorials } from "@/app/constants/data/editorialData";

export default function EditorialsPage() {

  return (

    <section className="max-w-7xl mx-auto px-4 py-10">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl md:text-4xl font-semibold">
          Editorials
        </h1>

        <p className="text-gray-500 mt-2">
          Expert opinions, analysis and insights
        </p>

      </div>




      {/* Grid */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {editorials.map((item, i) => (

          <Link
            key={i}
            href={`/editorials/${item.slug}`}
          >

            <div className="border rounded-xl overflow-hidden hover:shadow-lg transition">

              <div className="relative h-[200px]">

                <Image
                  src={item.image}
                  fill
                  alt=""
                  className="object-cover"
                />

              </div>

              <div className="p-4">

                <span className="text-xs text-red-500">
                  {item.category}
                </span>

                <h3 className="font-semibold mt-1 line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {item.date}
                </p>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>

  );

}