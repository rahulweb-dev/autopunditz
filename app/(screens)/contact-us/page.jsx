"use client";

import Image from "next/image";
import { useState } from "react";
export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: "",
    date: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#f7f7f7] min-h-screen p-6">

      {/* 🔥 CONTAINER */}
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-sm p-10 space-y-10">

        {/* 🔥 TITLE */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm text-gray-400 mb-2">Get in Touch</p>
            <h1 className="text-5xl font-bold leading-tight">
              Contact Us
            </h1>
          </div>

          <p className="text-gray-500">
            Tell us your query or feedback and we’ll respond within 24 hours
            with insights or assistance.
          </p>
        </div>

        {/* 🧾 FORM + IMAGE */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* 📝 FORM */}
          <div className="bg-[#fafafa] p-6 rounded-2xl space-y-4">

            <div className="grid grid-cols-2 gap-4">
              <input
                name="name"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                className="p-3 rounded-lg bg-white border"
              />
              <input
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="p-3 rounded-lg bg-white border"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                name="phone"
                placeholder="Phone number"
                value={form.phone}
                onChange={handleChange}
                className="p-3 rounded-lg bg-white border"
              />
              <input
                name="travelers"
                placeholder="Number of Users"
                value={form.travelers}
                onChange={handleChange}
                className="p-3 rounded-lg bg-white border"
              />
            </div>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="p-3 rounded-lg bg-white border w-full"
            />

            <textarea
              name="message"
              rows="4"
              placeholder="Your message..."
              value={form.message}
              onChange={handleChange}
              className="p-3 rounded-lg bg-white border w-full"
            />

            {/* BUTTON */}
            <div className="flex items-center gap-3">
              <button className="bg-black text-white px-6 py-3 rounded-full hover:opacity-90">
                Send Message
              </button>

              <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                →
              </button>
            </div>

          </div>

          {/* 🖼 IMAGE CARD */}
          <div className="rounded-2xl overflow-hidden relative">

            <Image
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
              alt="contact"
              fill
              className="object-cover"
            />


            <span className="absolute top-4 right-4 bg-white/80 px-3 py-1 text-xs rounded-full">
              Your Journey
            </span>
          </div>

        </div>

        {/* 📞 INFO SECTION */}
        <div className="grid md:grid-cols-3 gap-8 text-center pt-6">

          <div>
            <p className="text-2xl mb-2">📞</p>
            <h3 className="font-semibold">Call & WhatsApp</h3>
            <p className="text-gray-500 text-sm">
              +91 98765 43210 <br /> +91 87654 32109
            </p>
          </div>

          <div>
            <p className="text-2xl mb-2">⏰</p>
            <h3 className="font-semibold">Working Hours</h3>
            <p className="text-gray-500 text-sm">
              Daily: 9am - 6pm <br /> Sunday: Closed
            </p>
          </div>

          <div>
            <p className="text-2xl mb-2">📧</p>
            <h3 className="font-semibold">Write to Us</h3>
            <p className="text-gray-500 text-sm">
              support@autopunditz.com
            </p>
          </div>

        </div>

      </div>

      {/* 🔥 CTA SECTION */}
      <div className="max-w-6xl mx-auto mt-10 bg-white rounded-3xl p-10 flex flex-col md:flex-row justify-between items-center gap-6">

        <div>
          <p className="text-sm text-gray-400">Start now</p>
          <h2 className="text-3xl font-bold">
            Discover automotive insights
          </h2>
          <p className="text-gray-500 mt-2">
            Stay updated with analytics and reports from the auto industry.
          </p>
        </div>

        <div className="flex gap-4">
          <img
            src="https://images.unsplash.com/photo-1549921296-3a6b0e7f9a72"
            className="w-32 h-32 rounded-xl object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
            className="w-32 h-32 rounded-xl object-cover"
          />
        </div>

      </div>

    </div>
  );
}