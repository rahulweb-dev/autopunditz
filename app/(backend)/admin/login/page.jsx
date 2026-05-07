"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Mail,
  LockKeyhole,
  Eye,
} from "lucide-react";

export default function LoginPage() {

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  async function handleLogin(e) {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await fetch(
        "/api/admin/login",
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

        window.location.href =
          "/admin/dashboard";

      } else {

        alert(data.message);
      }

    } catch {

      alert(
        "Login Failed"
      );

    } finally {

      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#062b10] flex items-center justify-center ">

      <div className="w-full max-w-6xl bg-[#f5f5f5] rounded-[40px] overflow-hidden shadow-2xl grid lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="flex items-center justify-center p-8 md:p-16">

          <form
            onSubmit={handleLogin}
            className="w-full max-w-md"
          >

            {/* TITLE */}
            <div className="mb-10">

              <h1 className="text-5xl font-bold text-gray-800 leading-tight">
                Welcome back 👋
              </h1>

              <p className="text-gray-500 mt-4">
                Please enter your details.
              </p>

            </div>

            {/* EMAIL */}
            <div className="mb-5">

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  required
                  className="w-full h-14 rounded-full border border-gray-300 bg-white pl-14 pr-5 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email:
                        e.target.value,
                    })
                  }
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div className="mb-6">

              <div className="relative">

                <LockKeyhole
                  size={18}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  className="w-full h-14 rounded-full border border-gray-300 bg-white pl-14 pr-14 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password:
                        e.target.value,
                    })
                  }
                />

                <Eye
                  size={18}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                />

              </div>

            </div>

            {/* OPTIONS */}
            <div className="flex items-center justify-between text-sm mb-8">

              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" />
                Remember me
              </label>

              <button
                type="button"
                className="text-orange-500 hover:underline"
              >
                Forgot password?
              </button>

            </div>

            {/* LOGIN BUTTON */}
            <button
              disabled={loading}
              className="w-full h-14 rounded-full bg-orange-400 hover:bg-orange-500 text-white font-semibold text-lg transition-all shadow-lg hover:scale-[1.01]"
            >
              {loading
                ? "Logging..."
                : "Log In"}
            </button>

            {/* FOOTER */}
            <p className="text-center text-gray-500 mt-8">

              Protected Admin Access

            </p>

          </form>

        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="hidden lg:block relative min-h-[700px]">

          <Image
            src="https://images.unsplash.com/photo-1591738802175-709fedef8288?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FyJTIwaW1hZ2VzfGVufDB8fDB8fHww"
            alt="Luxury Car"
            fill
            priority
            className="object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/10" />

          {/* TEXT */}
          <div className="absolute bottom-10 left-10 text-white z-10">

            <h2 className="text-4xl font-bold max-w-sm leading-tight">
              Drive Your Admin Experience
            </h2>

            <p className="mt-4 text-white/80 max-w-md">
              Secure dashboard access for managing blogs,
              users, and content seamlessly.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}