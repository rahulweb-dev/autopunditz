"use client";

import { useState } from "react";
import Image from "next/image";
import { videoData } from "@/app/constants/data/videoData";

export default function VideoWallPage() {

  const [activeVideo, setActiveVideo] = useState(null);

  return (

    <section className="max-w-7xl mx-auto px-4 py-10">

      {/* Header */}

      <div className="flex justify-between items-end mb-10">

        <div>
          <h1 className="text-3xl md:text-4xl font-semibold">
            Video Wall
          </h1>

          <div className="bg-red-500 h-1 w-24 mt-2 rounded-full"/>

          <p className="text-gray-500 mt-3">
            Latest automotive videos, comparisons and reviews
          </p>
        </div>

      </div>


      {/* Featured Layout */}

      <div className="grid lg:grid-cols-3 gap-6 mb-12">

        {/* Featured Video */}

        {videoData[0] && (

          <div
            onClick={() => setActiveVideo(videoData[0].id)}
            className="lg:col-span-2 relative aspect-video cursor-pointer group rounded-xl overflow-hidden"
          >

            <Image
              src={videoData[0].thumb}
              fill
              alt={videoData[0].title}
              className="object-cover group-hover:scale-105 transition duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"/>

            <div className="absolute bottom-0 p-6 text-white">

              <p className="text-sm text-gray-300">
                {videoData[0].views} views
              </p>

              <h2 className="text-xl md:text-2xl font-semibold">
                {videoData[0].title}
              </h2>

            </div>

          </div>

        )}


        {/* Side Videos */}

        <div className="space-y-4">

          {videoData.slice(1,4).map((video, i) => (

            <div
              key={i}
              onClick={() => setActiveVideo(video.id)}
              className="flex gap-3 cursor-pointer group"
            >

              <div className="relative w-36 h-24 rounded-lg overflow-hidden">

                <Image
                  src={video.thumb}
                  fill
                  alt={video.title}
                  className="object-cover group-hover:scale-105 transition"
                />

              </div>

              <div>

                <p className="text-xs text-gray-500 mb-1">
                  {video.views} views
                </p>

                <h3 className="text-sm font-medium line-clamp-2">
                  {video.title}
                </h3>

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* Videos Grid */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {videoData.slice(4).map((video, i) => (

          <div
            key={i}
            onClick={() => setActiveVideo(video.id)}
            className="cursor-pointer group"
          >

            <div className="relative aspect-video rounded-lg overflow-hidden">

              <Image
                src={video.thumb}
                fill
                alt={video.title}
                className="object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/>

              <div className="absolute top-3 right-3 text-xs bg-black/70 px-2 py-1 rounded text-white">
                {video.dur}
              </div>

              <div className="absolute bottom-0 p-3 text-white">

                <p className="text-xs text-gray-300">
                  {video.views} views
                </p>

                <h3 className="text-sm font-medium line-clamp-2">
                  {video.title}
                </h3>

              </div>

            </div>

          </div>

        ))}

      </div>


      {/* Modal */}

      {activeVideo && (

        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >

          <div
            className="w-full max-w-6xl aspect-video"
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

    </section>

  );

}