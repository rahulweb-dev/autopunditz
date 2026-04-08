"use client";

import { useState } from "react";
import Image from "next/image";

const videos = [
  {
    title: "Inside Tesla's Gigafactory: Production at Scale",
    thumbnail:
      "https://images.unsplash.com/photo-1758411897919-16fea4759066?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    duration: "12:45",
    views: "245K",
    featured: true,
  },
  {
    title: "2026 EV Charging Infrastructure Tour",
    thumbnail:
      "https://images.unsplash.com/photo-1760538978585-f82dc257ec15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    duration: "8:30",
    views: "128K",
  },
  {
    title: "Luxury SUV Comparison: Top 5 Models",
    thumbnail:
      "https://images.unsplash.com/photo-1758795114772-ced07f7e5145?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    duration: "15:20",
    views: "189K",
  },
];

const tickerItems = [
  "Autonomous Driving: Real-World Testing — 312K views",
  "Luxury SUV Comparison: Top 5 Models — 189K views",
  "Inside Tesla's Gigafactory — 245K views",
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
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 1.5L11 7L1 12.5V1.5Z" />
      </svg>
    </div>
  );
}

function VideoCard({ video, featured = false }) {
  return (
    <div
      className={`relative overflow-hidden cursor-pointer group bg-[#111] ${
        featured ? "col-span-2" : ""
      }`}
    >
      {/* Thumbnail */}
      <div className={`relative overflow-hidden ${featured ? "h-[400px]" : "h-[220px]"}`}>
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent group-hover:opacity-90 transition-opacity duration-300" />
      </div>

      {/* Content layer */}
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        {/* Top row */}
        <div className="flex items-start justify-between">
          {featured ? (
            <span className="text-[10px] tracking-[0.12em] uppercase font-medium px-2.5 py-1 rounded-sm bg-[#c8ff00] text-[#0a0a0a]">
              Featured
            </span>
          ) : (
            <span />
          )}
          <span className="text-[10px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-sm bg-black/60 text-white/80 border border-white/15">
            {video.duration}
          </span>
        </div>

        {/* Bottom row */}
        <div>
          <p className="text-[11px] tracking-[0.08em] uppercase text-white/45 mb-1.5">
            {video.views} views
          </p>
          <h3
            className={`font-serif font-normal text-white leading-tight ${
              featured ? "text-[1.75rem]" : "text-[1.1rem]"
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
  return (
    <section className="container mx-auto px-6  py-12 font-sans">
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#666] mb-2">
            Latest from the studio
          </p>
          <h2 className="font-serif text-[3rem] font-normal leading-none ">
            Video{" "}
            <em className="italic text-[#c8ff00] not-italic" style={{ fontStyle: "italic" }}>
              Wall
            </em>
          </h2>
        </div>
        <button className="text-[12px] tracking-[0.1em] uppercase text-[#666] border-b border-[#333] pb-0.5 hover:text-[#c8ff00] hover:border-[#c8ff00] transition-colors duration-200">
          All Videos →
        </button>
      </div>

      {/* Grid — 2px gap gives the film-strip effect */}
      <div className="grid grid-cols-2 gap-[2px]">
        {videos.map((video, i) => (
          <VideoCard key={i} video={video} featured={video.featured} />
        ))}
      </div>

      {/* Trending ticker */}
      <div className="mt-10 border-t border-[#222] pt-5 flex items-center gap-8 overflow-hidden">
        <span className="text-[10px] tracking-[0.15em] uppercase text-[#c8ff00] whitespace-nowrap shrink-0">
          Now trending
        </span>
        <div className="overflow-hidden flex-1">
          <div className="flex gap-12 animate-ticker whitespace-nowrap">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="text-[12px] text-[#555] tracking-[0.06em] shrink-0">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}