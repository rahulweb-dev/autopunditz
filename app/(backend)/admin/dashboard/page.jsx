"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  Car,
  Bike,
  Newspaper, BarChart3
} from "lucide-react";

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => setBlogs(data.data || data));
  }, []);

  const total = blogs.length;
  const cars = blogs.filter((b) => b.category === "Cars").length;
  const bikes = blogs.filter((b) => b.category === "Bikes").length;
  const news = blogs.filter((b) => b.category === "News").length;
  const marketanalysis = blogs.filter((b) => b.category === "Market Analysis").length;
  const cards = [
    {
      title: "Total Blogs",
      value: total,
      icon: <FileText size={28} />,
      color: "bg-gradient-to-r from-purple-500 to-indigo-500",
    },
    {
      title: "Cars News",
      value: cars,
      icon: <Car size={28} />,
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    },
    {
      title: "Bikes News",
      value: bikes,
      icon: <Bike size={28} />,
      color: "bg-gradient-to-r from-orange-500 to-red-500",
    },
    {
      title: "News Blogs",
      value: news,
      icon: <Newspaper size={28} />,
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
    },
    {
      title: "Market Analysis",
      value: marketanalysis,

      icon: <BarChart3 size={28} />,
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="p-6 space-y-6">

      {/* Heading */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">
          Dashboard
        </h1>
        <p className="text-gray-500">
          Overview of your blog performance
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`rounded-2xl p-5 text-white shadow-lg transition transform hover:-translate-y-1 hover:shadow-xl ${card.color}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-sm opacity-80">
                  {card.title}
                </h2>
                <p className="text-3xl font-bold mt-1">
                  {card.value}
                </p>
              </div>

              <div className="bg-white/20 p-3 rounded-xl backdrop-blur">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}