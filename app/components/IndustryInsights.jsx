"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const insights = [
  {
    title: "Most Valuable Tyre Brands",
    image:
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1600",
    link: "#",
  },
  {
    title: "Electric Vehicle Market Growth",
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1600",
    link: "#",
  },
  {
    title: "Top SUV Trends 2026",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1600",
    link: "#",
  },
];

export default function IndustryInsights() {
  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-red-600">
            Industry Insights
          </h2>
          <div className="w-48 h-[3px] bg-red-600 mt-2"></div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{ delay: 4000 }}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          className="rounded-lg overflow-hidden"
        >
          {insights.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative group">

                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[320px] object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-red-600/60 flex items-center justify-between px-8">

                  <div className="text-white">
                    <h3 className="text-3xl font-bold mb-3 uppercase">
                      {item.title}
                    </h3>

                    <a
                      href={item.link}
                      className="border border-white px-6 py-2 hover:bg-white hover:text-red-600 transition"
                    >
                      Click Here To Read
                    </a>
                  </div>

                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}