"use client";

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-800">

      {/* 🔥 HERO SECTION */}
      <section className="bg-gradient-to-r from-black to-gray-800 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          About Auto Punditz
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Not just another Automotive Website — We deliver insights, analytics,
          and expert opinions on the Indian Automobile Industry.
        </p>
      </section>

      {/* 🚀 STATS SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-black">3M+</h2>
          <p className="text-gray-500">Website Visits</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-black">4+ Years</h2>
          <p className="text-gray-500">Industry Experience</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-black">5 Segments</h2>
          <p className="text-gray-500">Covered</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-black">100%</h2>
          <p className="text-gray-500">Data Driven</p>
        </div>
      </section>

      {/* 🧠 ABOUT CONTENT */}
      <section className="max-w-4xl mx-auto px-6 py-10 space-y-6 leading-relaxed">
        <h2 className="text-2xl font-semibold">Who We Are</h2>

        <p>
          Auto Punditz has been India’s most trusted Automotive Content creators
          in terms of analytics & reports on the Indian Automotive scene. We
          have been working relentlessly for years to present our readers with
          detailed insights into the automotive industry.
        </p>

        <p>
          As the name suggests, we have a great set of ‘Pundit’z managing the
          show here. A pundit is an expert in a particular field who is
          frequently called upon to share opinions — and we strive to ensure
          those opinions are always insightful and data-driven.
        </p>

        <p className="font-medium text-black">
          Our Tagline – “Not just another Automotive Website!”
        </p>

        <p>
          We aim to build a platform where content is king and accurate reporting
          is our foundation. Our mission is to provide reliable analytics across
          all major automotive segments including Passenger Vehicles, Commercial
          Vehicles, Two Wheelers, Three Wheelers, and Tractors.
        </p>
      </section>

      {/* 🌍 SOCIAL PROOF */}
      <section className="bg-gray-50 py-12 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-semibold">
            Our Growing Community
          </h2>

          <p className="text-gray-600">
            We are grateful for our amazing audience who follow and support us
            across platforms.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">

            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="font-bold text-lg">Facebook</h3>
              <p className="text-gray-500">7.5k+ Followers</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="font-bold text-lg">Instagram</h3>
              <p className="text-gray-500">1.5k+ Followers</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="font-bold text-lg">YouTube</h3>
              <p className="text-gray-500">380+ Subscribers</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="font-bold text-lg">Twitter</h3>
              <p className="text-gray-500">1.5k+ Followers</p>
            </div>

          </div>
        </div>
      </section>

      {/* 🔥 CTA */}
      <section className="text-center py-12 px-6">
        <h2 className="text-2xl font-semibold">
          Join Our Journey 🚗
        </h2>
        <p className="text-gray-500 mt-2">
          Stay updated with the latest automotive insights and analytics.
        </p>

        <button className="mt-4 px-6 py-3 bg-black text-white rounded-lg hover:opacity-90">
          Follow Us
        </button>
      </section>

    </div>
  );
}