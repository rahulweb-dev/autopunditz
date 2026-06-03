"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const tabs = ["Cars", "Bikes"];

export default function LatestNews() {
  const [active, setActive] = useState("Cars");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog/public");
        const data = await res.json();
        setBlogs(data.data || data);
        setLoading(false);
      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // ✅ Filter based on active tab
  const filtered = blogs.filter(
    (item) =>
      item.category === "News" &&
      item.subCategory?.toLowerCase() === active.toLowerCase()
  );

  const formatData = filtered.map((item) => {
    const image =
      item.ogImage?.startsWith("http")
        ? item.ogImage
        : item.content?.match(/<img[^>]+src="([^"]+)"/)?.[1] || "/placeholder.jpg";
    return {
      ...item,
      image,
      desc: item.metaDescription || item.content?.replace(/<[^>]+>/g, "").slice(0, 100) || "",
      slug: item.slug,
      date: new Date(item.createdAt).toLocaleDateString("en-IN"),
    };
  });

  const handleExplore = () => {
    router.push(`/${active.toLowerCase()}`);
  };

  if (loading) {

    return (

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">

        {/* Header */}
        <div className="mb-6 md:mb-8">

          <Skeleton
            height={42}
            width={240}
            borderRadius={10}
          />

          <Skeleton
            height={18}
            width={180}
            className="mt-3"
            borderRadius={8}
          />

        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b mb-6 pb-3">

          {[1, 2].map((i) => (

            <Skeleton
              key={i}
              height={28}
              width={70}
              borderRadius={8}
            />

          ))}

        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8">

          {/* Featured Card */}
          <div className="lg:col-span-2">

            <div className="relative h-48 sm:h-56 md:h-72 lg:h-90 rounded-xl overflow-hidden">

              <Skeleton
                height="100%"
                width="100%"
                borderRadius={16}
              />

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 w-full p-4 md:p-6">

                <Skeleton
                  height={30}
                  width="80%"
                  borderRadius={8}
                />

                <Skeleton
                  height={18}
                  width="95%"
                  className="mt-3"
                  borderRadius={8}
                />

                <Skeleton
                  height={18}
                  width="75%"
                  className="mt-2"
                  borderRadius={8}
                />

                <Skeleton
                  height={18}
                  width={110}
                  className="mt-4"
                  borderRadius={8}
                />

              </div>

            </div>

          </div>

          {/* Right Side Cards */}
          <div className="flex flex-col h-full">

            <div className="h-65 sm:h-75 lg:h-90 overflow-hidden space-y-3 pr-2">

              {[1, 2, 3, 4].map((i) => (

                <div
                  key={i}
                  className="flex gap-3 bg-white rounded-xl border p-2 md:p-3"
                >

                  {/* Image */}
                  <div className="w-24 h-20 shrink-0">

                    <Skeleton
                      height={80}
                      width={96}
                      borderRadius={10}
                    />

                  </div>

                  {/* Content */}
                  <div className="flex-1">

                    <Skeleton
                      height={12}
                      width={70}
                      borderRadius={6}
                    />

                    <Skeleton
                      height={18}
                      width="95%"
                      className="mt-2"
                      borderRadius={6}
                    />

                    <Skeleton
                      height={18}
                      width="80%"
                      className="mt-2"
                      borderRadius={6}
                    />

                    <Skeleton
                      height={14}
                      width={90}
                      className="mt-3"
                      borderRadius={6}
                    />

                  </div>

                </div>
              ))}

            </div>

            {/* Explore Button */}
            <div className="mt-4">

              <Skeleton
                height={20}
                width={120}
                borderRadius={8}
              />

            </div>

          </div>

        </div>

      </section>
    );
  }

  if (formatData.length === 0) {
    return (
      <section id="latest-auto-news" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Latest News</h2>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base">Breaking vehicle updates</p>
        </div>
        <div className="flex gap-4 sm:gap-6 overflow-x-auto border-b mb-6 pb-1">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActive(tab)}
              className={`pb-2 text-xs sm:text-sm md:text-base whitespace-nowrap transition ${active === tab ? "border-b-2 border-red-500 text-red-500 font-medium" : "text-gray-500 hover:text-black"}`}>
              {tab}
            </button>
          ))}
        </div>
        <p className="text-gray-400 text-sm py-10 text-center">No {active} news available yet.</p>
      </section>
    );
  }

  return (
    <section id="latest-auto-news" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">

      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
          Latest News
        </h2>

        <p className="text-gray-500 text-xs sm:text-sm md:text-base">
          Breaking vehicle updates
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 sm:gap-6 overflow-x-auto border-b mb-6 pb-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`pb-2 text-xs sm:text-sm md:text-base whitespace-nowrap transition ${active === tab
              ? "border-b-2 border-red-500 text-red-500 font-medium"
              : "text-gray-500 hover:text-black"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8">

        {/* Featured */}
        <Link
          href={`/${active.toLowerCase()}/${formatData[0].slug}`}
          className="lg:col-span-2"
        >
          <div className="relative h-48 sm:h-56 md:h-72 lg:h-90 rounded-xl overflow-hidden group cursor-pointer">

            <Image
              src={formatData[0].image}
              fill
              priority
              alt={formatData[0].title}
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover group-hover:scale-105 transition duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="absolute bottom-0 p-3 sm:p-4 md:p-6 text-white w-full">

              <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold mb-1">
                {formatData[0].title}
              </h3>

              <p className="text-xs sm:text-sm text-white/90 line-clamp-2">
                {formatData[0].desc}
              </p>

              <span className="text-sm text-red-300 mt-2 inline-block">
                Read More →
              </span>

            </div>

          </div>
        </Link>

        {/* Side Scroll */}
        <div className="flex flex-col h-full">

          <div className="h-[260px] sm:h-[300px] lg:h-[360px] overflow-y-auto space-y-3 pr-2">

            {formatData.slice(1).map((item, i) => (
              <Link
                key={i}
                href={`/${active.toLowerCase()}/${item.slug}`}
              >
                <div className="flex gap-3 bg-white rounded-xl border p-2 md:p-3 hover:shadow-md transition cursor-pointer">

                  <div className="relative w-24 h-20 flex-shrink-0">
                    <Image
                      src={item.image}
                      fill
                      alt={item.title}
                      sizes="96px"
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex flex-col justify-center">

                    <p className="text-xs text-gray-500">
                      {item.date}
                    </p>

                    <p className="text-sm font-semibold line-clamp-2">
                      {item.title}
                    </p>

                    <p className="text-xs text-gray-500 line-clamp-2">
                      {item.desc}
                    </p>

                    <span className="text-red-500 text-xs mt-1">
                      Read More →
                    </span>

                  </div>

                </div>
              </Link>
            ))}

          </div>

          {/* Explore Button */}
          <button
            onClick={handleExplore}
            className="mt-4 text-red-500 text-sm font-medium hover:text-red-600"
          >
            Explore {active} →
          </button>

        </div>

      </div>

    </section>
  );
}