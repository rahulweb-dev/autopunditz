"use client";

import { useState } from "react";
import Image from "next/image";

const videos = [
  {
    title: "AutoPunditz Exclusive Automotive Analysis",
    thumbnail: "https://img.youtube.com/vi/CTXBSxxweJ0/maxresdefault.jpg",
    duration: "12:45",
    views: "245K",
    videoId: "CTXBSxxweJ0",
    featured: true,
  },
  {
    title: "2026 EV Charging Infrastructure Tour",
    thumbnail:
      "https://images.unsplash.com/photo-1760538978585-f82dc257ec15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    duration: "8:30",
    views: "128K",
    videoId: "CTXBSxxweJ0",
  },
  {
    title: "Luxury SUV Comparison: Top 5 Models",
    thumbnail:
      "https://images.unsplash.com/photo-1758795114772-ced07f7e5145?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    duration: "15:20",
    views: "189K",
    videoId: "CTXBSxxweJ0",
  },
];

const tickerItems = [
  "Autonomous Driving: Real-World Testing — 312K views",
  "Luxury SUV Comparison: Top 5 Models — 189K views",
  "AutoPunditz Exclusive Analysis — 245K views",
  "2026 EV Charging Infrastructure Tour — 128K views",
];

function PlayIcon({ size = "md" }) {
  const dim = size === "lg" ? "w-11 h-11" : "w-9 h-9";

  return (
    <div
      className={`${dim} rounded-full border border-white/60 flex items-center justify-center mt-3 transition-all duration-200 group-hover:bg-[#c8ff00] group-hover:border-[#c8ff00]`}
    >
      <svg
        width="10"
        height="12"
        viewBox="0 0 12 14"
        className="fill-white/90 group-hover:fill-[#0a0a0a] transition-colors duration-200 ml-0.5"
      >
        <path d="M1 1.5L11 7L1 12.5V1.5Z" />
      </svg>
    </div>
  );
}

function VideoCard({ video, featured = false, setActiveVideo }) {
  return (
    <div
      onClick={() => setActiveVideo(video.videoId)}
      className={`relative overflow-hidden cursor-pointer group bg-[#111] ${
        featured ? "col-span-2" : ""
      }`}
    >
      {/* Thumbnail */}
      <div
        className={`relative overflow-hidden ${
          featured ? "h-[400px]" : "h-[220px]"
        }`}
      >
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <div className="flex justify-between">
          {featured ? (
            <span className="text-[10px] px-2 py-1 bg-[#c8ff00] text-black">
              Featured
            </span>
          ) : (
            <span />
          )}

          <span className="text-[10px] bg-black/60 px-2 py-1 text-white">
            {video.duration}
          </span>
        </div>

        <div>
          <p className="text-xs text-white/60 mb-1">{video.views} views</p>

          <h3
            className={`text-white ${
              featured ? "text-2xl" : "text-lg"
            }`}
          >
            {video.title}
          </h3>

          <PlayIcon size={featured ? "lg" : "md"} />
        </div>
      </div>
    </div>
  );
}

export default function VideoWall() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex justify-between mb-10">
        <h2 className="text-3xl font-bold">
          Video <span className="text-lime-400">Wall</span>
        </h2>

        <button className="text-sm text-gray-500 hover:text-lime-400">
          All Videos →
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-2">
        {videos.map((video, i) => (
          <VideoCard
            key={i}
            video={video}
            featured={video.featured}
            setActiveVideo={setActiveVideo}
          />
        ))}
      </div>

      {/* Modal */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6">
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-6 text-white text-2xl"
          >
            ✕
          </button>

          <div className="w-full max-w-6xl aspect-video">
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="YouTube Video"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Ticker */}
      <div className="mt-10 overflow-hidden">
        <div className="flex gap-10 animate-pulse text-sm text-gray-400">
          {tickerItems.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}