"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Search } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white border-b shadow-sm"
    >
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">

        <div className="flex justify-between items-center py-3">

          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.avif"
              width={150}
              height={40}
              alt="AutoPunditz"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-8">

            <Link
              href="/"
              className="text-sm font-semibold hover:text-blue-600 transition"
            >
              HOME
            </Link>

            {/* SALES ANALYSIS */}
            <div className="relative group">

              <div className="flex items-center gap-1 text-sm font-semibold cursor-pointer hover:text-blue-600">
                SALES ANALYSIS
                <ChevronDown size={16} />
              </div>

              <div className="absolute left-0 top-8 bg-white shadow-xl rounded-xl w-[280px] p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">

                <div className="space-y-2 text-sm">

                  <Link href="/sales/car-sales" className="dropdownLink">
                    Car Sales Figures
                  </Link>

                  <Link href="/sales/two-wheeler" className="dropdownLink">
                    Two Wheeler Sales Figures
                  </Link>

                  <Link href="/sales/three-wheeler" className="dropdownLink">
                    Three Wheeler Sales Statistics
                  </Link>

                  <Link href="/sales/tractor" className="dropdownLink">
                    Tractor Sales
                  </Link>

                  <Link href="/sales/commercial" className="dropdownLink">
                    Commercial Vehicle Sales
                  </Link>

                  <Link href="/sales/electric" className="dropdownLink">
                    Electric Vehicle Sales
                  </Link>

                  <Link href="/sales/yearly" className="dropdownLink">
                    Yearly Sales Analysis
                  </Link>

                  <Link href="/sales/statewise" className="dropdownLink">
                    Statewise Sales Figures
                  </Link>

                  <Link href="/sales/registration" className="dropdownLink">
                    Vehicle Registration Data
                  </Link>

                  <Link href="/sales/production" className="dropdownLink">
                    Production Statistics
                  </Link>

                  <Link href="/sales/export" className="dropdownLink">
                    Export Statistics
                  </Link>

                </div>

              </div>

            </div>

            {/* NEWS */}

            <div className="relative group">

              <div className="flex items-center gap-1 text-sm font-semibold cursor-pointer hover:text-blue-600">
                NEWS
                <ChevronDown size={16} />
              </div>

              <div className="absolute left-0 top-8 bg-white shadow-xl rounded-xl w-[200px] p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">

                <Link href="/cars" className="dropdownLink">
                  Cars
                </Link>

                <Link href="/bikes" className="dropdownLink">
                  Bikes
                </Link>

                <Link href="/news/offers" className="dropdownLink">
                  Offers Of Month
                </Link>

              </div>

            </div>

            {/* AUTOPEDIA */}

            <div className="relative group">

              <div className="flex items-center gap-1 text-sm font-semibold cursor-pointer hover:text-blue-600">
                AUTOPEDIA
                <ChevronDown size={16} />
              </div>

              <div className="absolute left-0 top-8 bg-white shadow-xl rounded-xl w-[260px] p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">

                <Link href="/autopedia/dealerships" className="dropdownLink">
                  Automobile Dealerships
                </Link>

                <Link href="/autopedia/lifecycle" className="dropdownLink">
                  Product Lifecycle Analysis
                </Link>

                <Link href="/autopedia/gone" className="dropdownLink">
                  Gone But Not Forgotten
                </Link>

                <Link href="/autopedia/facts" className="dropdownLink">
                  Interesting Facts Series
                </Link>

                <Link href="/autopedia/editorials" className="dropdownLink">
                  Editorials
                </Link>

                <Link href="/autopedia/punditz" className="dropdownLink">
                  Punditz Gyan
                </Link>

              </div>

            </div>

            <Link
              href="/about"
              className="text-sm font-semibold hover:text-blue-600"
            >
              ABOUT US
            </Link>

            <Link
              href="/contact"
              className="text-sm font-semibold hover:text-blue-600"
            >
              CONTACT US
            </Link>

          </nav>

          {/* Right Section */}

          <div className="flex items-center gap-3">

            <button className="hidden md:flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200">
              <Search size={18} />
              <span className="text-sm">Search</span>
            </button>

            {/* Mobile Button */}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden"
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>

          </div>

        </div>

      </div>

      {/* Mobile Menu */}

      <AnimatePresence>

        {mobileOpen && (

          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="lg:hidden bg-white border-t"
          >

            <div className="p-4 space-y-4">

              <Link href="/">HOME</Link>

              <MobileDropdown
                title="SALES ANALYSIS"
                menu="sales"
                openDropdown={openDropdown}
                toggleDropdown={toggleDropdown}
                links={[
                  { name: "Car Sales Figures", href: "/sales/car-sales" },
                  { name: "Two Wheeler", href: "/sales/two-wheeler" },
                  { name: "Three Wheeler", href: "/sales/three-wheeler" },
                  { name: "Tractor", href: "/sales/tractor" },
                ]}
              />

              <MobileDropdown
                title="NEWS"
                menu="news"
                openDropdown={openDropdown}
                toggleDropdown={toggleDropdown}
                links={[
                  { name: "Cars", href: "/news/cars" },
                  { name: "Bikes", href: "/news/bikes" },
                  { name: "Offers", href: "/news/offers" },
                ]}
              />

              <MobileDropdown
                title="AUTOPEDIA"
                menu="autopedia"
                openDropdown={openDropdown}
                toggleDropdown={toggleDropdown}
                links={[
                  { name: "Dealerships", href: "/autopedia/dealerships" },
                  { name: "Editorials", href: "/autopedia/editorials" },
                ]}
              />

              <Link href="/about">ABOUT</Link>

              <Link href="/contact">CONTACT</Link>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </motion.header>
  );
}

function MobileDropdown({
  title,
  menu,
  openDropdown,
  toggleDropdown,
  links,
}) {
  return (
    <div>

      <button
        onClick={() => toggleDropdown(menu)}
        className="flex justify-between w-full"
      >
        {title}
        <ChevronDown size={16} />
      </button>

      {openDropdown === menu && (
        <div className="pl-4 mt-2 space-y-2">

          {links.map((link, index) => (
            <Link key={index} href={link.href}>
              {link.name}
            </Link>
          ))}

        </div>
      )}

    </div>
  );
}