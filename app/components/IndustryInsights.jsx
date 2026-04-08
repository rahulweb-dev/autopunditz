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
      "https://static.wixstatic.com/media/eb3040_c9074aa03ccb4eb384668253d5b43eca~mv2.jpg/v1/fill/w_846,h_265,al_c,lg_1,q_80,enc_avif,quality_auto/eb3040_c9074aa03ccb4eb384668253d5b43eca~mv2.jpg",
    link: "#",
  },
  {
    title: "Electric Vehicle Market Growth",
    image:
      "https://static.wixstatic.com/media/eb3040_4f2f9ae0a1f64e00b2de8f344c706ff8~mv2.jpg/v1/fill/w_846,h_265,al_c,lg_1,q_80,enc_avif,quality_auto/eb3040_4f2f9ae0a1f64e00b2de8f344c706ff8~mv2.jpg",
    link: "#",
  },
  // {
  //   title: "Top SUV Trends 2026",
  //   image:
  //     "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1600",
  //   link: "#",
  // },
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
                <div className="absolute inset-0  flex items-center justify-between px-8">

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