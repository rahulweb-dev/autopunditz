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

  // LOAD RECENT

  useEffect(() => {

    const stored =
      JSON.parse(
        localStorage.getItem(
          "recentSearches"
        )
      ) || [];

    setRecent(stored);

  }, []);

  // SEARCH API

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

  // SAVE RECENT

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

  // ROUTES

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

  return (

    <div className="bg-white">

      {/* SEARCH INPUT */}

      <div className="flex items-center gap-3 px-4 py-4 border-b">

        <Search
          className="text-gray-400"
          size={18}
        />

        <input
          autoFocus
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          placeholder="Search..."
          className="
            flex-1  outline-none  text-sm
          "
        />

        <button
          onClick={() => setOpen(false)}
          className="
            p-1  rounded-lg hover:bg-gray-100"
        >
          <X size={18} />
        </button>

      </div>

      {/* CONTENT */}

      <div className="max-h-125 overflow-y-auto">

        {/* RECENT */}

        {!query && recent.length > 0 && (

          <div className="p-4">

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
                  className="
                    flex  items-center  gap-3   text-gray-700 hover:text-black
                  "
                >

                  <Clock size={15} />

                  <span className="text-sm">
                    {item}
                  </span>

                </button>

              ))}

            </div>

          </div>

        )}

        {/* LOADING */}

        {loading && (

          <div className="p-6 text-center text-sm text-gray-500">

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
              className="  flex gap-3  p-4  hover:bg-gray-50 transition  "
            >

              <div
                className="
                  relative  w-20  h-16  rounded-xl  overflow-hidden shrink-0 "
              >

                <Image
                  src={extractImage(
                    item.content
                  )}
                  fill
                  alt={item.title}
                  className="object-cover"
                />

              </div>

              <div className="min-w-0">

                <span className="text-xs text-red-500 font-semibold uppercase">

                  {item.category}

                </span>

                <h3 className="text-sm font-semibold line-clamp-2 mt-1">

                  {item.title}

                </h3>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </div>

  );

}