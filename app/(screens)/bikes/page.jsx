
"use client";

import NewsGrid from "@/app/components/NewsGrid";
import Image from "next/image";
import { newsData } from "@/app/constants/data/newsData";

export default function CarsPage() {
  return (
    <NewsGrid
      title="Bikes News"
      subtitle="Latest bikes updates and news"
      data={newsData.Bikes}
      basePath="/bikes"
    />
  );
}