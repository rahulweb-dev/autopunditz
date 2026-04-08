"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Menu, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-200 shadow-sm"
    >
      <div className="max-w-[1400px] mx-auto px-6 py-3">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.avif"
              alt="AutoPunditz Logo"
              width={140}
              height={40}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">

            <Link
              href="/news"
              className="text-sm font-medium text-neutral-700 hover:text-blue-600 transition-all"
            >
              News
            </Link>

            <Link
              href="/insights"
              className="text-sm font-medium text-neutral-700 hover:text-blue-600 transition-all"
            >
              Insights
            </Link>

            <Link
              href="/sales-data"
              className="text-sm font-medium text-neutral-700 hover:text-blue-600 transition-all"
            >
              Sales Data
            </Link>

            <Link
              href="/reviews"
              className="text-sm font-medium text-neutral-700 hover:text-blue-600 transition-all"
            >
              Reviews
            </Link>

            {/* Dropdown */}
            <div className="relative group cursor-pointer">
              <div className="flex items-center gap-1 text-sm font-medium text-neutral-700 hover:text-blue-600">
                Analysis
                <ChevronDown size={16} />
              </div>

              {/* Dropdown Menu */}
              <div className="absolute top-8 left-0 bg-white shadow-lg rounded-lg p-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">

                <Link href="#" className="block py-2 text-sm hover:text-blue-600">
                  Market Analysis
                </Link>

                <Link href="#" className="block py-2 text-sm hover:text-blue-600">
                  Brand Comparison
                </Link>

                <Link href="#" className="block py-2 text-sm hover:text-blue-600">
                  EV Analysis
                </Link>

              </div>
            </div>

          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">

            {/* Search */}
            <button className="flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 px-3 py-2 rounded-lg transition">
              <Search size={18} />
              <span className="hidden md:block text-sm">
                Search
              </span>
            </button>

            {/* Mobile Menu */}
            <button className="lg:hidden w-10 h-10 rounded-lg hover:bg-neutral-100 flex items-center justify-center transition">
              <Menu size={22} />
            </button>

          </div>

        </div>

      </div>
    </motion.header>
  );
}