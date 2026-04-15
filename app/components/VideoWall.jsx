"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const videos = [
  {
    title: "AutoPunditz Exclusive Automotive Analysis",
    thumb: "https://img.youtube.com/vi/CTXBSxxweJ0/maxresdefault.jpg",
    previewMp4: "https://www.w3schools.com/html/mov_bbb.mp4",
    dur: "12:45",
    views: "245K",
    id: "CTXBSxxweJ0",
    featured: true,
  },
  {
    title: "2026 EV Charging Infrastructure Tour",
    thumb:
      "https://images.unsplash.com/photo-1760538978585-f82dc257ec15?w=600&q=80",
    previewMp4: "https://www.w3schools.com/html/movie.mp4",
    dur: "8:30",
    views: "128K",
    id: "CTXBSxxweJ0",
  },
  {
    title: "Luxury SUV Comparison: Top 5 Models",
    thumb:
      "https://images.unsplash.com/photo-1758795114772-ced07f7e5145?w=600&q=80",
    previewMp4: "https://www.w3schools.com/html/mov_bbb.mp4",
    dur: "15:20",
    views: "189K",
    id: "CTXBSxxweJ0",
  },
];

function VideoCard({ video, onPlay, featured }) {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      onClick={() => onPlay(video.id)}
      className="group relative overflow-hidden cursor-pointer bg-[#111] rounded-xl"
    >
      <div
        className={`relative ${featured ? "h-[510px]" : "aspect-[16/10]"
          }`}
      >
        <Image
          src={video.thumb}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
        />

        <video
          ref={videoRef}
          src={video.previewMp4}
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setIsLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? "group-hover:opacity-100 opacity-0" : "opacity-0"
            }`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        <div className="absolute top-3 right-3 text-xs bg-black/60 px-2 py-1 rounded text-white">
          {video.dur}
        </div>

        <div className="absolute bottom-0 p-4 text-white">
          <p className="text-xs text-gray-300">
            {video.views} views
          </p>

          <h3 className="text-sm md:text-base font-medium">
            {video.title}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default function VideoWall() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="py-8 md:py-12">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}

        <div className="flex justify-between items-end mb-6">

          <div>
            <h2 className="text-2xl md:text-4xl font-semibold">
              Video Wall
            </h2>

            <div className="bg-red-500 h-1 w-32 mt-2 rounded-full" />
          </div>


        </div>


        {/* Desktop Layout */}

        <div className="hidden lg:grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2">
            <VideoCard
              video={videos[0]}
              onPlay={setActiveVideo}
              featured
            />
          </div>

          <div className="space-y-4">

            {videos.slice(1).map((video, i) => (
              <VideoCard
                key={i}
                video={video}
                onPlay={setActiveVideo}
              />
            ))}
            <div className="flex justify-center">
              <Link
                href="/videowall"
                className="text-sm text-red-500 hover:text-red-400"
              >
                Explore More →
              </Link></div>

          </div>

        </div>


        {/* Mobile Layout */}

        <div className="lg:hidden">

          <Swiper
            modules={[Pagination]}
            spaceBetween={12}
            pagination={{ clickable: true }}
            slidesPerView={1.1}
          >
            {videos.map((video, i) => (
              <SwiperSlide key={i}>
                <VideoCard
                  video={video}
                  onPlay={setActiveVideo}
                />
              </SwiperSlide>
            ))}
          </Swiper>

        </div>


        {/* Video Modal */}

        {activeVideo && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >

            <div
              className="w-full max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >

              <iframe
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                allowFullScreen
              />

            </div>

          </div>
        )}
        <div className="pt-5 ml-4">
        <Link
          href="/videowall"
          className="text-sm text-red-500 hover:text-red-400 lg:hidden "
        >
          Explore More →
        </Link></div>


      </div>

    </section>
  );
}