"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Car, Bike, Truck, Zap, BarChart3, Calendar } from "lucide-react";

const salesCategories = [
  {
    title: "Car Sales Figures",
    icon: Car,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
    link: "/sales-analysis/car-sales-figures",
  },
  {
    title: "Two Wheeler Sales",
    icon: Bike,
    image:
      "https://plus.unsplash.com/premium_photo-1661963005592-182d602c6a3f?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/sales-analysis/two-wheeler-sales-figures",
  },
  {
    title: "Three Wheeler Sales",
    icon: Truck,
    image:
      "https://images.unsplash.com/photo-1677981316525-53d7d56d7a04?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/sales-analysis/three-wheeler-sales-statistics",
  },
  {
    title: "Commercial Vehicle Sales",
    icon: BarChart3,
    image:
      "https://images.unsplash.com/photo-1763067036683-00e8491af467?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29tbWVyY2lhbCUyMHZlaGljbGVzfGVufDB8fDB8fHww",
    link: "/sales-analysis/commercial-vehicle-sales",
  },
  {
    title: "Electric Vehicle Sales",
    icon: Zap,
    image:
      "https://images.unsplash.com/photo-1666919643134-d97687c1826c?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/sales-analysis/electric-vehicle-sales",
  },
  {
    title: "Yearly Sales",
    icon: Calendar,
    image:
      "https://plus.unsplash.com/premium_photo-1742395281482-7e970c1f6057?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8eWVhcmx5JTIwc2FsZXN8ZW58MHx8MHx8fDA%3D",
    link: "/sales-analysis/yearly-sales-analysis",
  },
];

export default function SalesPage() {
  return (
    <section id="sales-data" className="py-16 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}

        <div className="mb-12 ">

          <h1 className="text-3xl md:text-4xl font-bold">
            Sales Analysis
          </h1>

          <p className="text-gray-500 mt-3">
            Explore Automobile Market Sales Data & Insights
          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {salesCategories.map((item, index) => {
            const Icon = item.icon;

            return (

              <Link href={item.link} key={index}>

                <motion.div
                  whileHover={{ y: -8 }}
                  className="relative h-[260px] rounded-2xl overflow-hidden group cursor-pointer shadow-md"
                >

                  {/* Background Image */}

                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition duration-500"
                    style={{
                      backgroundImage: `url(${item.image})`,
                    }}
                  />

                  {/* Overlay */}

                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition" />

                  {/* Content */}

                  <div className="relative h-full flex flex-col justify-end p-6 text-white">

                    <Icon size={28} className="mb-3" />

                    <h3 className="text-xl font-semibold">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-200 mt-1">
                      View Detailed Sales Analysis
                    </p>

                  </div>

                </motion.div>

              </Link>

            );
          })}

        </div>

      </div>

    </section>
  );
}