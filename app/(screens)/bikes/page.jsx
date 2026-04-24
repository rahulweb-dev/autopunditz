"use client";

import { useEffect, useState } from "react";
import NewsGrid from "@/app/components/NewsGrid";

export default function BikesPage() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();

        // ✅ Filter Bikes category
        const filtered = (data.data || data).filter(
          (item) => item.category?.toLowerCase() === "bikes"
        );

        setBikes(filtered);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchBikes();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading Bikes...</p>;
  }

  return (
    <NewsGrid
      title="Bikes News"
      subtitle="Latest bikes updates and news"
      data={bikes}
      basePath="/bikes"
    />
  );
}