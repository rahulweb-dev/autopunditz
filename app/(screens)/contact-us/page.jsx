"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Mail,
  Phone,
  Send,
  User,
  MessageSquare,
} from "lucide-react";

export default function ContactPage() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] =
    useState({});

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  // ✅ VALIDATION
  function validate() {

    const newErrors = {};

    // NAME
    if (!form.name.trim()) {

      newErrors.name =
        "Name is required";
    }

    // EMAIL
    if (!form.email.trim()) {

      newErrors.email =
        "Email is required";

    } else if (
      !/^\S+@\S+\.\S+$/.test(
        form.email
      )
    ) {

      newErrors.email =
        "Invalid email";
    }

    // PHONE
    if (!form.phone.trim()) {

      newErrors.phone =
        "Phone number is required";

    } else if (
      form.phone.length < 10
    ) {

      newErrors.phone =
        "Invalid phone number";
    }

    // MESSAGE
    if (!form.message.trim()) {

      newErrors.message =
        "Message is required";

    } else if (
      form.message.length < 10
    ) {

      newErrors.message =
        "Message should be at least 10 characters";
    }

    setErrors(newErrors);

    return Object.keys(
      newErrors
    ).length === 0;
  }

  // ✅ HANDLE CHANGE
  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

    // REMOVE ERROR LIVE
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  }

  // ✅ SUBMIT
  async function handleSubmit(e) {

    e.preventDefault();

    setSuccess("");

    if (!validate()) return;

    try {

      setLoading(true);

      const res = await fetch(
        "/api/contact",
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

        setSuccess(
          "Message sent successfully!"
        );

        setForm({
          name: "",
          email: "",
          phone: "",
          message: "",
        });

      } else {

        alert(data.message);
      }

    } catch (error) {

      console.log(error);

      alert(
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  }

  return (

    <div className="bg-gradient-to-b from-[#f5f7fb] to-white min-h-screen py-10 px-4">

      {/* MAIN */}
      <div className="max-w-7xl mx-auto">

        {/* HERO */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">

          {/* LEFT */}
          <div>

            <span className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm mb-5">

              Contact Support

            </span>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">

              Let’s Build
              Something Amazing

            </h1>

            <p className="text-gray-500 mt-6 text-lg leading-relaxed max-w-xl">

              Reach out to us for
              automotive insights,
              reports, partnerships,
              or any assistance.
              We usually reply within
              24 hours.

            </p>

            {/* INFO */}
            <div className="mt-10 space-y-5">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center">

                  <Phone size={20} />

                </div>

                <div>

                  <p className="font-semibold">
                    Call Us
                  </p>

                  <p className="text-gray-500">
                    +91 98765 43210
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center">

                  <Mail size={20} />

                </div>

                <div>

                  <p className="font-semibold">
                    Email
                  </p>

                  <p className="text-gray-500">
                    support@autopunditz.com
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="relative h-[500px] rounded-[32px] overflow-hidden shadow-2xl">

            <Image
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
              alt="Contact"
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 text-white">

              <p className="text-sm uppercase tracking-wider text-gray-200">

                Automotive Intelligence

              </p>

              <h3 className="text-2xl font-bold mt-2">

                Stay Connected With Industry Experts

              </h3>

            </div>

          </div>

        </div>

        {/* FORM CARD */}
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-[32px] p-6 md:p-10 border border-gray-100">

          <div className="text-center mb-10">

            <h2 className="text-3xl md:text-4xl font-bold">
              Send Us a Message
            </h2>

            <p className="text-gray-500 mt-3">
              Fill out the form below and our team will contact you shortly.
            </p>

          </div>

          {/* SUCCESS */}
          {success && (

            <div className="mb-6 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-xl">

              {success}

            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* NAME */}
            <div>

              <label className="font-medium mb-2 block">
                Full Name
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full h-14 pl-12 pr-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none"
                />

              </div>

              {errors.name && (

                <p className="text-red-500 text-sm mt-2">
                  {errors.name}
                </p>
              )}

            </div>

            {/* EMAIL + PHONE */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* EMAIL */}
              <div>

                <label className="font-medium mb-2 block">
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-4 text-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full h-14 pl-12 pr-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none"
                  />

                </div>

                {errors.email && (

                  <p className="text-red-500 text-sm mt-2">
                    {errors.email}
                  </p>
                )}

              </div>

              {/* PHONE */}
              <div>

                <label className="font-medium mb-2 block">
                  Phone Number
                </label>

                <div className="relative">

                  <Phone
                    size={18}
                    className="absolute left-4 top-4 text-gray-400"
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="w-full h-14 pl-12 pr-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none"
                  />

                </div>

                {errors.phone && (

                  <p className="text-red-500 text-sm mt-2">
                    {errors.phone}
                  </p>
                )}

              </div>

            </div>

            {/* MESSAGE */}
            <div>

              <label className="font-medium mb-2 block">
                Your Message
              </label>

              <div className="relative">

                <MessageSquare
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <textarea
                  name="message"
                  rows="6"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none resize-none"
                />

              </div>

              {errors.message && (

                <p className="text-red-500 text-sm mt-2">
                  {errors.message}
                </p>
              )}

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-black text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50"
            >

              {loading ? (
                "Sending Message..."
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}