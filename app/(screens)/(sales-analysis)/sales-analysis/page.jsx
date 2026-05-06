import Image from "next/image";
import Link from "next/link";

const salesCategories = [
  {
    title: "Car Sales Figures",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Two Wheeler Sales Figures",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Three Wheeler Sales Statistics",
    image:
      "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Tractor Sales",
    image:
      "https://images.unsplash.com/photo-1592982537447-6f2a6a0c8e3b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Commercial Vehicle Sales",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Electric Vehicle Sales",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Yearly Sales Analysis",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Statewise Sales Figures",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Vehicle Registration Data",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Production Statistics",
    image:
      "https://images.unsplash.com/photo-1567789884554-0b844b597180?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Export Statistics",
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop",
  },
];

function slugify(text = "") {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export default function SalesAnalysisHome() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white min-h-screen">

      {/* HERO */}
      <div className="relative overflow-hidden">

        <div className="absolute inset-0 bg-black/50 z-10" />

        <Image
          src="https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=1800&auto=format&fit=crop"
          alt="Sales Analysis"
          width={1800}
          height={800}
          className="w-full h-[320px] md:h-[420px] object-cover"
          priority
        />

        <div className="absolute inset-0 z-20 flex items-center">

          <div className="max-w-7xl mx-auto px-4 w-full">

            <div className="max-w-3xl">

              <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-1 rounded-full text-sm inline-block mb-5">
                Automobile Market Intelligence
              </span>

              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-5">

                Sales Analysis &
                <br />
                Market Reports

              </h1>

              <p className="text-white/80 text-base md:text-lg leading-relaxed">

                Explore the latest automobile sales reports,
                market insights, registration data,
                EV growth statistics, and yearly trends.

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-14">

        {/* SECTION TITLE */}
        <div className="flex items-center justify-between mb-10">

          <div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">

              Explore Categories

            </h2>

            <p className="text-gray-500">

              Browse all automobile sales analysis segments

            </p>

          </div>

        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

          {salesCategories.map((item, index) => (

            <Link
              key={index}
              href={`/sales-analysis/${slugify(item.title)}`}
              className="group"
            >

              <div className="relative rounded-3xl overflow-hidden h-[320px] shadow-md hover:shadow-2xl transition-all duration-500">

                {/* IMAGE */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-700"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* CONTENT */}
                <div className="absolute bottom-0 p-6 text-white w-full">

                  <div className="mb-4">

                    <span className="text-xs uppercase tracking-widest text-white/70">
                      Sales Analysis
                    </span>

                  </div>

                  <h3 className="text-2xl font-bold leading-snug mb-3 group-hover:text-red-400 transition">

                    {item.title}

                  </h3>

                  <div className="flex items-center justify-between">

                    <span className="text-sm text-white/70">
                      Explore Reports
                    </span>

                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-red-500 transition">

                      →
                      
                    </div>

                  </div>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}