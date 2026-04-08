"use client";

import Link from "next/link";
import { BarChart3 } from "lucide-react";
import Image from 'next/image'
import {
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaEnvelope
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Logo + About */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
          

              <div>
                <Image
                  src="/logo.avif"
                  alt="AutoPunditz Logo"
                  width={190}
                  height={40}
                />
              </div>
            </div>

            <p className="text-neutral-400 leading-relaxed mb-6 max-w-md">
              Your trusted source for automotive industry data, insights, and
              analysis. Empowering professionals with real-time market intelligence.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">

              <Link
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-blue-500 rounded-lg flex items-center justify-center transition"
              >
                <FaTwitter size={16} />
              </Link>

              <Link
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-blue-700 rounded-lg flex items-center justify-center transition"
              >
                <FaLinkedinIn size={16} />
              </Link>

              <Link
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-lg flex items-center justify-center transition"
              >
                <FaYoutube size={16} />
              </Link>

              <Link
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-green-600 rounded-lg flex items-center justify-center transition"
              >
                <FaEnvelope size={16} />
              </Link>

            </div>
          </div>

          {/* Content */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Content</h4>
            <ul className="space-y-3 text-neutral-400">
              <li><Link href="#">Latest News</Link></li>
              <li><Link href="#">Industry Insights</Link></li>
              <li><Link href="#">Sales Data</Link></li>
              <li><Link href="#">Product Reviews</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Resources</h4>
            <ul className="space-y-3 text-neutral-400">
              <li><Link href="#">Market Reports</Link></li>
              <li><Link href="#">Editorials</Link></li>
              <li><Link href="#">Video Library</Link></li>
              <li><Link href="#">Archives</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Company</h4>
            <ul className="space-y-3 text-neutral-400">
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">Contact</Link></li>
              <li><Link href="#">Advertise</Link></li>
              <li><Link href="#">Privacy Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-neutral-400 text-sm">
            © 2026 AutoPunditz. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-neutral-400">
            <Link href="#">Terms</Link>
            <Link href="#">Privacy</Link>
            <Link href="#">Cookies</Link>
          </div>

        </div>

      </div>
    </footer>
  );
}