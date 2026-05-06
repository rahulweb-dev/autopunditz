"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import {
  Search,
  Clock,
  X,
} from "lucide-react";

function extractImage(html = "") {

  const match = html.match(
    /<img[^>]+src="([^">]+)"/
  );

  return match?.[1] || "/placeholder.jpg";
}

export default function SearchModal({
  open,
  setOpen,
}) {

  const [query, setQuery] =
    useState("");

  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [recent, setRecent] =
    useState([]);

  // ✅ RECENT SEARCHES

  useEffect(() => {

    const stored =
      JSON.parse(
        localStorage.getItem(
          "recentSearches"
        )
      ) || [];

    setRecent(stored);

  }, []);

  // ✅ SEARCH

  useEffect(() => {

    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delay = setTimeout(
      async () => {

        try {

          setLoading(true);

          const res = await fetch(
            `/api/search?q=${query}`
          );

          const data =
            await res.json();

          setResults(data);

        } catch (err) {

          console.error(err);

        } finally {

          setLoading(false);

        }

      },
      400
    );

    return () => clearTimeout(delay);

  }, [query]);

  // ✅ SAVE RECENT

  const saveRecent = (text) => {

    let searches =
      JSON.parse(
        localStorage.getItem(
          "recentSearches"
        )
      ) || [];

    searches = [
      text,
      ...searches.filter(
        (i) => i !== text
      ),
    ].slice(0, 8);

    localStorage.setItem(
      "recentSearches",
      JSON.stringify(searches)
    );

  };

  // ✅ ROUTE

  const getRoute = (item) => {

    if (
      item.category === "News"
    ) {

      return `/${item.subCategory?.toLowerCase()
        }/${item._id}`;

    }

    if (
      item.category ===
      "MarketAnalysis"
    ) {

      return `/market-analysis/${item._id}`;

    }

    if (
      item.category === "Sales"
    ) {

      return `/sales-analysis/${item.subCategory
        ?.toLowerCase()
        .replace(/\s+/g, "-")
        }/${item._id}`;

    }

    if (
      item.category ===
      "Editorials"
    ) {

      return `/editorials/${item._id}`;

    }

    return "/";
  };

  if (!open) return null;

  return (

    <div className=" top-10 right-0 w-[95vw] md:w-[400px] bg-white   rounded-3xl overflow-hidden z-[999]">

      {/* SEARCH BAR */}

      <div className="flex items-center gap-3 px-5 py-4 border-b">

        <Search
          className="text-gray-400"
          size={20}
        />

        <input
          autoFocus
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          placeholder="Search news, editorials, sales..."
          className="flex-1 outline-none text-lg"
        />

        <button
          onClick={() => setOpen(false)}
        >
          <X />
        </button>

      </div>

      {/* RESULTS */}

      <div className="max-h-[70vh] overflow-y-auto">

        {/* RECENT */}

        {!query && recent.length > 0 && (

          <div className="p-5">

            <h3 className="font-semibold mb-4">

              Recent Searches

            </h3>

            <div className="space-y-3">

              {recent.map((item, i) => (

                <button
                  key={i}
                  onClick={() =>
                    setQuery(item)
                  }
                  className="flex items-center gap-3 text-gray-700 hover:text-black"
                >

                  <Clock size={16} />

                  {item}

                </button>

              ))}

            </div>

          </div>

        )}

        {/* LOADING */}

        {loading && (

          <div className="p-10 text-center">

            Searching...

          </div>

        )}

        {/* RESULTS */}

        <div className="divide-y">

          {results.map((item) => (

            <Link
              key={item._id}
              href={getRoute(item)}
              onClick={() => {
                saveRecent(query);
                setOpen(false);
              }}
              className="flex gap-4 p-4 hover:bg-gray-50 transition"
            >

              <div className="relative w-28 h-24 rounded-xl overflow-hidden flex-shrink-0">

                <Image
                  src={extractImage(
                    item.content
                  )}
                  fill
                  alt={item.title}
                  className="object-cover"
                />

              </div>

              <div>

                <span className="text-xs uppercase text-red-500 font-semibold">

                  {item.category}

                </span>

                <h3 className="font-bold line-clamp-2 mt-1">

                  {item.title}

                </h3>

                <p className="text-sm text-gray-500 mt-2">

                  {new Date(
                    item.createdAt
                  ).toDateString()}

                </p>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </div>

  );

}