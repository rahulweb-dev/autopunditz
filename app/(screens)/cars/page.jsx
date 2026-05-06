"use client";

import { useEffect, useState } from "react";
import NewsGrid from "@/app/components/NewsGrid";

export default function CarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();

        // ✅ Filter only Cars category
        const filtered = (data.data || data).filter(
          (item) =>
            item.category?.toLowerCase() ===
            "news" &&
            item.subCategory?.toLowerCase() ===
            "cars" &&
            item.status === "published"
        );

        setCars(filtered);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchCars();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading Cars...</p>;
  }

  return (
    <NewsGrid
      title="Cars News"
      subtitle="Latest cars updates"
      data={cars}
      basePath="/cars"
    />
  );
}