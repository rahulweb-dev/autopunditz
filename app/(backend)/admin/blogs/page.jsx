"use client";

import { useEffect, useState } from "react";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
  });

  // ✅ Fetch blogs
  const fetchBlogs = async () => {
    const res = await fetch("/api/blog");
    const data = await res.json();
    setBlogs(data.data || data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ✅ Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Create or Update
  const handleSubmit = async () => {
    if (!form.title || !form.content) {
      alert("Fill all fields");
      return;
    }

    if (editing) {
      // UPDATE
      await fetch(`/api/blog/${editing._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      // CREATE
      await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    // Reset
    setForm({ title: "", category: "", content: "" });
    setShowForm(false);
    setEditing(null);

    fetchBlogs();
  };

  // ✅ Edit click
  const handleEdit = (blog) => {
    setEditing(blog);
    setForm({
      title: blog.title,
      category: blog.category,
      content: blog.content,
    });
    setShowForm(true);
  };

  // ✅ Delete
  const deleteBlog = async (id) => {
    if (!confirm("Delete this blog?")) return;

    await fetch(`/api/blog/${id}`, { method: "DELETE" });

    fetchBlogs();
  };

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Blogs</h1>

        <button
          onClick={() => {
            setShowForm(true);
            setEditing(null);
            setForm({ title: "", category: "", content: "" });
          }}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Create Blog
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="w-full text-left">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border-t">

                <td className="p-3">{blog.title}</td>
                <td className="p-3 capitalize">{blog.category}</td>
                <td className="p-3">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>

                <td className="p-3 space-x-3">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="text-blue-500"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteBlog(blog._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl w-full max-w-lg space-y-4">

            <h2 className="text-xl font-bold">
              {editing ? "Edit Blog" : "Create Blog"}
            </h2>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full border p-2"
            />

            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category (cars/bikes)"
              className="w-full border p-2"
            />

            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Content"
              className="w-full border p-2 h-32"
            />

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="bg-black text-white px-4 py-2"
              >
                {editing ? "Update" : "Create"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}