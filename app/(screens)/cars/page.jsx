"use client";

import NewsGrid from "@/app/components/NewsGrid";
import Image from "next/image";
import { newsData } from "@/app/constants/data/newsData";

export default function CarsPage() {
  return (
    <NewsGrid
      title="Cars News"
      subtitle="Latest cars updates"
      data={newsData.Cars}
      basePath="/cars"
    />
  );
}