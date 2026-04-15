"use client";

import React from "react";

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-900">

      {/* HERO SECTION */}
      <section className="relative py-20 px-6 md:px-16 bg-gradient-to-r from-gray-100 to-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-red-500 tracking-widest uppercase mb-2">
            Auto Punditz
          </p>
          <h1 className="text-4xl md:text-6xl font-bold">
            About <span className="text-red-500">Us</span>
          </h1>
          <p className="mt-6 max-w-2xl text-gray-600">
            Not just another Automotive Website!
          </p>

          <button className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
            Explore Reports
          </button>
        </div>
      </section>

      {/* PERKS / HIGHLIGHTS */}
      <section className="py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">

          {/* LEFT */}
          <div>
            <p className="text-sm text-blue-600 uppercase tracking-widest mb-2">
              About Us
            </p>
            <h2 className="text-4xl font-bold mb-4">
              All the <span className="text-red-500">Perks</span>
            </h2>
            <p className="text-gray-600">
              We provide deep analytics, accurate automotive reports, and
              industry insights across all vehicle segments in India.
            </p>
          </div>

          {/* RIGHT GRID */}
          <div className="grid grid-cols-2 gap-6 border p-6 rounded-xl shadow-sm">
            {[
              "Investment Charts",
              "Used Car Marketplace",
              "Industry Analytics",
              "Accurate Reports",
              "Expert Opinions",
              "Market Trends",
            ].map((item, i) => (
              <div key={i}>
                <h4 className="font-semibold">{item}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Trusted insights for automotive decisions.
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-16 px-6 md:px-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-red-500 uppercase tracking-widest mb-3">
            Our Story
          </p>

          <p className="text-gray-700 leading-8 mb-6">
            Auto Punditz has been India’s most trusted Automotive Content creators
            in terms of Analytics & Reports on the Indian Automotive scene. We have
            been working relentlessly since years to present our readers detailed
            insight on the automotive industry.
          </p>

          <p className="text-gray-700 leading-8 mb-6">
            As the name says we have a great set of ‘Pundit’z managing the show here.
            PS: the definition of Pundit is ‘an expert in a particular subject or
            field who is frequently called upon to give their opinions’. And we
            rightly hope that our experts share sensible opinion on the site.
          </p>

          <p className="text-gray-700 leading-8 mb-6">
            Our Tagline – ‘Not just another Automotive Website!’. We are just not any
            automotive site! Auto Punditz will strive to become a platform where
            content will be the king and accurate reporting will be our endeavor.
          </p>

          <p className="text-gray-700 leading-8">
            Auto Punditz has become the most trusted source about the analytics of
            the Indian Automobile Industry. We have covered almost all segments
            (PVs, CVs, 2W, 3W, Tractors) and crossed 3 million visits in just over
            4 years.
          </p>
        </div>
      </section>

      {/* SOCIAL STATS */}
      <section className="py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-red-500 uppercase mb-2">
            Our Reach
          </p>

          <h2 className="text-4xl font-bold mb-10">
            Why Choose <span className="text-red-500">Us</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Facebook", value: "7.5K+ Followers" },
              { title: "Instagram", value: "1.5K+ Followers" },
              { title: "YouTube", value: "380+ Subscribers" },
              { title: "Twitter", value: "1.5K+ Followers" },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 border rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center bg-gradient-to-r from-red-500 to-pink-500 text-white">
        <h2 className="text-3xl font-bold mb-4">
          Explore Automotive Insights
        </h2>
        <button className="px-8 py-3 bg-white text-red-500 rounded-lg font-semibold hover:bg-gray-100 transition">
          View Reports
        </button>
      </section>

    </div>
  );
}