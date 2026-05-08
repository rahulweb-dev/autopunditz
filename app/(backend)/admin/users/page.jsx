"use client";

import { useEffect, useState } from "react";
import {
  Trash2,
  UserPlus,
  Shield,
  PenSquare,
} from "lucide-react";

export default function UsersPage() {

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "writer",
    });

  // ✅ FETCH USERS
  async function fetchUsers() {

    try {

      const res = await fetch(
        "/api/admin/users"
      );

      const data =
        await res.json();

      setUsers(data);

    } catch (error) {

      console.log(error);
    }
  }

  useEffect(() => {

    fetchUsers();

  }, []);

  // ✅ CREATE USER
  async function handleSubmit(e) {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await fetch(
        "/api/admin/users/create",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            form
          ),
        }
      );

      const data =
        await res.json();

      if (data.success) {

        alert(
          "User Created"
        );

        setForm({
          name: "",
          email: "",
          password: "",
          role: "writer",
        });

        fetchUsers();

      } else {

        alert(data.message);
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  async function deleteUser(id) {

    console.log(id);

    const confirmDelete =
      confirm(
        "Delete this user?"
      );

    if (!confirmDelete) return;

    try {

      const res = await fetch(
        `/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await res.json();

      console.log(data);

      if (data.success) {

        fetchUsers();

      } else {

        alert(data.message);
      }

    } catch (error) {

      console.log(error);
    }
  }

  return (

    <div className="p-4 md:p-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            User Management
          </h1>

          <p className="text-gray-500 mt-1">
            Create and manage
            admin panel users
          </p>

        </div>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* FORM */}
        <div className="xl:col-span-1">

          <div className="bg-white rounded-2xl border shadow-sm p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center">

                <UserPlus
                  className="text-red-500"
                  size={22}
                />

              </div>

              <div>

                <h2 className="font-bold text-lg">
                  Add User
                </h2>

                <p className="text-sm text-gray-500">
                  Create new admin/writer
                </p>

              </div>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* NAME */}
              <div>

                <label className="text-sm font-medium mb-2 block">
                  Full Name
                </label>

                <input
                  type="text"
                  required
                  value={form.name}
                  placeholder="Enter name"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name:
                        e.target.value,
                    })
                  }
                  className="w-full h-12 rounded-xl border px-4 outline-none focus:ring-2 focus:ring-red-400"
                />

              </div>

              {/* EMAIL */}
              <div>

                <label className="text-sm font-medium mb-2 block">
                  Email
                </label>

                <input
                  type="email"
                  required
                  value={form.email}
                  placeholder="Enter email"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email:
                        e.target.value,
                    })
                  }
                  className="w-full h-12 rounded-xl border px-4 outline-none focus:ring-2 focus:ring-red-400"
                />

              </div>

              {/* PASSWORD */}
              <div>

                <label className="text-sm font-medium mb-2 block">
                  Password
                </label>

                <input
                  type="password"
                  required
                  value={form.password}
                  placeholder="Enter password"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password:
                        e.target.value,
                    })
                  }
                  className="w-full h-12 rounded-xl border px-4 outline-none focus:ring-2 focus:ring-red-400"
                />

              </div>

              {/* ROLE */}
              <div>

                <label className="text-sm font-medium mb-2 block">
                  Role
                </label>

                <select
                  value={form.role}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      role:
                        e.target.value,
                    })
                  }
                  className="w-full h-12 rounded-xl border px-4 outline-none focus:ring-2 focus:ring-red-400"
                >

                  <option value="writer">
                    Writer
                  </option>

                  <option value="admin">
                    Admin
                  </option>

                </select>

              </div>

              {/* BUTTON */}
              <button
                disabled={loading}
                className="w-full h-12 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition"
              >

                {loading
                  ? "Creating..."
                  : "Create User"}

              </button>

            </form>

          </div>

        </div>

        {/* USERS LIST */}
        <div className="xl:col-span-2">

          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

            {/* TOP */}
            <div className="p-6 border-b">

              <h2 className="text-xl font-bold">
                All Users
              </h2>

            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-50">

                  <tr>

                    <th className="text-left p-4 font-semibold">
                      User
                    </th>

                    <th className="text-left p-4 font-semibold">
                      Role
                    </th>

                    <th className="text-left p-4 font-semibold">
                      Created
                    </th>

                    <th className="text-right p-4 font-semibold">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {users.map((user) => (

                    <tr
                      key={user._id}
                      className="border-t hover:bg-gray-50 transition"
                    >

                      {/* USER */}
                      <td className="p-4">

                        <div className="flex items-center gap-3">

                          <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center">

                            {user.role ===
                              "admin" ? (

                              <Shield
                                className="text-red-500"
                                size={18}
                              />

                            ) : (

                              <PenSquare
                                className="text-blue-500"
                                size={18}
                              />

                            )}

                          </div>

                          <div>

                            <p className="font-semibold">
                              {user.name}
                            </p>

                            <p className="text-sm text-gray-500">
                              {user.email}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* ROLE */}
                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role ===
                            "admin"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                            }`}
                        >

                          {user.role}

                        </span>

                      </td>

                      {/* DATE */}
                      <td className="p-4 text-sm text-gray-500">

                        {new Date(
                          user.createdAt
                        ).toLocaleDateString(
                          "en-IN"
                        )}

                      </td>

                      {/* ACTION */}
                      <td className="p-4 text-right">

                        <button
                          onClick={() =>
                            deleteUser(
                              user._id
                            )
                          }
                          className="w-10 h-10 rounded-xl hover:bg-red-100 flex items-center justify-center ml-auto transition"
                        >

                          <Trash2
                            size={18}
                            className="text-red-500"
                          />

                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}