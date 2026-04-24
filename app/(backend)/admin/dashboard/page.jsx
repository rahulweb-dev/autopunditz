
"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blog")
      .then(res => res.json())
      .then(data => setBlogs(data.data || data));
  }, []);

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Total Blogs</h2>
          <p className="text-3xl font-bold">{blogs.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Cars News</h2>
          <p className="text-3xl font-bold">
            {blogs.filter(b => b.category === "Cars").length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Bikes News</h2>
          <p className="text-3xl font-bold">
            {blogs.filter(b => b.category === "Bikes").length}
          </p>
        </div>
         <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">News Blogs</h2>
          <p className="text-3xl font-bold">
            {blogs.filter(b => b.category === "News").length}
          </p>
        </div>

      </div>

    </div>
  );
}