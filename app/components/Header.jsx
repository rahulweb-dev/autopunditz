'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import SearchModal from './SearchModal';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className='sticky top-0 z-50 bg-white border-b shadow-sm'
    >
      <div className='max-w-350 mx-auto px-4 lg:px-6'>
        <div className='flex justify-between items-center py-3'>
          {/* Logo */}
          <Link href='/'>
            <Image
              src='/logo.avif'
              width={150}
              height={40}
              alt='AutoPunditz'
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <nav className='hidden lg:flex items-center gap-8'>
            <Link
              href='/'
              className='text-sm font-semibold hover:text-[#E53935] transition'
            >
              HOME
            </Link>

            {/* SALES ANALYSIS */}
            <div className='relative group'>
              <div className='flex items-center gap-1 text-sm font-semibold cursor-pointer hover:text-[#E53935]'>
                SALES ANALYSIS
                <ChevronDown size={16} />
              </div>

              <div className='absolute left-0 top-8 bg-white shadow-xl rounded-xl w-70 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all'>
                <div className='space-y-2 text-sm'>
                  <Link
                    href='/sales-analysis/car-sales-figures'
                    className='dropdownLink '
                  >
                    Car Sales Figures
                  </Link>

                  <Link
                    href='/sales-analysis/two-wheeler-sales-figures'
                    className='dropdownLink'
                  >
                    Two Wheeler Sales Figures
                  </Link>

                  <Link
                    href='/sales-analysis/three-wheeler-sales-statistics'
                    className='dropdownLink'
                  >
                    Three Wheeler Sales Statistics
                  </Link>

                  <Link
                    href='/sales-analysis/tractor-sales'
                    className='dropdownLink'
                  >
                    Tractor Sales
                  </Link>

                  <Link
                    href='/sales-analysis/commercial-vehicle-sales'
                    className='dropdownLink'
                  >
                    Commercial Vehicle Sales
                  </Link>

                  <Link
                    href='/sales-analysis/electric-vehicle-sales'
                    className='dropdownLink'
                  >
                    Electric Vehicle Sales
                  </Link>

                  <Link
                    href='/sales-analysis/yearly-sales-analysis'
                    className='dropdownLink'
                  >
                    Yearly Sales Analysis
                  </Link>

                  <Link
                    href='/sales-analysis/statewise-sales-figures'
                    className='dropdownLink'
                  >
                    Statewise Sales Figures
                  </Link>

                  <Link
                    href='/sales-analysis/vehicle-registration-data'
                    className='dropdownLink'
                  >
                    Vehicle Registration Data
                  </Link>

                  <Link
                    href='/sales-analysis/production-statistics'
                    className='dropdownLink'
                  >
                    Production Statistics
                  </Link>

                  <Link
                    href='/sales-analysis/export-statistics'
                    className='dropdownLink'
                  >
                    Export Statistics
                  </Link>
                </div>
              </div>
            </div>

            {/* NEWS */}

            <div className='relative group'>
              <div className='flex items-center gap-1 text-sm font-semibold cursor-pointer hover:text-[#E53935]'>
                NEWS
                <ChevronDown size={16} />
              </div>

              <div className='absolute left-0 top-8 bg-white shadow-xl rounded-xl w-50 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all'>
                <Link href='/cars' className='dropdownLink'>
                  Cars
                </Link>

                <Link href='/bikes' className='dropdownLink'>
                  Bikes
                </Link>

                <Link href='/news/offers' className='dropdownLink'>
                  Offers Of Month
                </Link>
              </div>
            </div>

            {/* AUTOPEDIA */}

            <div className='relative group'>
              <div className='flex items-center gap-1 text-sm font-semibold cursor-pointer hover:text-[#E53935]'>
                AUTOPEDIA
                <ChevronDown size={16} />
              </div>

              <div className='absolute left-0 top-8 bg-white shadow-xl rounded-xl w-65 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all'>
                <Link href='/autopedia/dealerships' className='dropdownLink'>
                  Automobile Dealerships
                </Link>

                <Link href='/autopedia/lifecycle' className='dropdownLink'>
                  Product Lifecycle Analysis
                </Link>

                <Link href='/autopedia/gone' className='dropdownLink'>
                  Gone But Not Forgotten
                </Link>

                <Link href='/autopedia/facts' className='dropdownLink'>
                  Interesting Facts Series
                </Link>

                <Link href='/autopedia/editorials' className='dropdownLink'>
                  Editorials
                </Link>

                <Link href='/autopedia/punditz' className='dropdownLink'>
                  Punditz Gyan
                </Link>
              </div>
            </div>

            <Link
              href='/about-us'
              className='text-sm font-semibold hover:text-[#E53935]'
            >
              ABOUT US
            </Link>

            <Link
              href='/contact-us'
              className='text-sm font-semibold hover:text-[#E53935]'
            >
              CONTACT US
            </Link>
          </nav>

          {/* Right Section */}

          <div className='flex items-center gap-2 lg:gap-4 shrink-0'>
            <div className='relative'>
              {/* DESKTOP SEARCH BUTTON */}

              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="hidden md:flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-all duration-200"
              >
                <Search size={18} />

                <span className='text-sm font-medium'>Search</span>
              </button>

              {/* MOBILE SEARCH BUTTON */}

              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition"
              >
                <Search size={20} />
              </button>

              {/* SEARCH DROPDOWN */}

              {searchOpen && (
                <>
                  {/* MOBILE OVERLAY */}

                  <div
                    onClick={() => setSearchOpen(false)}
                    className="fixed inset-0 bg-black/30 z-9998 md:hidden"
                  />

                  {/* SEARCH DROPDOWN */}

                  <div className="absolute top-full right-0 mt-3 z-[9999] hidden md:block w-105 max-w-105 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
                    <SearchModal setOpen={setSearchOpen} />
                  </div>

                  {/* MOBILE SEARCH */}

                  <div className="fixed top-17.5 left-1/2 -translate-x-1/2 z-9999 w-[94vw] max-w-125 md:hidden bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
                    <SearchModal setOpen={setSearchOpen} />
                  </div>
                </>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className='lg:hidden flex items-center justify-center  w-10  h-10  rounded-xl  hover:bg-gray-100 transition shrink-0 '
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* 🔥 BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className='fixed inset-0 bg-black/40 backdrop-blur-sm z-40'
            />

            {/* 🔥 SIDE PANEL */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 25 }}
              className='fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-50 shadow-2xl flex flex-col'
            >
              {/* HEADER */}
              <div className='flex items-center justify-between p-5 border-b'>
                <h2 className='font-bold text-lg tracking-wide'>AutoPunditz</h2>

                <button onClick={() => setMobileOpen(false)}>
                  <X size={22} />
                </button>
              </div>

              {/* MENU CONTENT */}
              <div className='flex-1 overflow-y-auto p-5 space-y-5'>
                {/* HOME */}
                <Link
                  href='/'
                  onClick={() => setMobileOpen(false)}
                  className='block text-lg font-semibold'
                >
                  Home
                </Link>

                {/* DROPDOWNS */}
                <MobileDropdown
                  title='Sales Analysis'
                  menu='sales'
                  openDropdown={openDropdown}
                  toggleDropdown={toggleDropdown}
                  links={[
                    {
                      name: 'Car Sales Figures',
                      href: '/sales-analysis/car-sales-figures',
                    },
                    {
                      name: 'Two Wheeler',
                      href: '/sales-analysis/two-wheeler-sales-figures',
                    },
                    {
                      name: 'Three Wheeler',
                      href: '/sales-analysis/three-wheeler-sales-statistics',
                    },
                    { name: 'Tractor', href: '/sales-analysis/tractor-sales' },
                    {
                      name: 'Commercial Vehicle Sales',
                      href: '/sales-analysis/commercial-vehicle-sales',
                    },
                    {
                      name: 'Electric Vehicle Sales',
                      href: '/sales-analysis/electric-vehicle-sales',
                    },
                    {
                      name: 'Yearly Sales Analysis',
                      href: '/sales-analysis/yearly-sales-analysis',
                    },
                    {
                      name: 'Statewise Sales Figures',
                      href: '/sales-analysis/statewise-sales-figures',
                    },
                    {
                      name: 'Vehicle Registration Data',
                      href: '/sales-analysis/vehicle-registration-data',
                    },
                    {
                      name: 'Production Statistics',
                      href: '/sales-analysis/production-statistics',
                    },
                    {
                      name: 'Export Statistics',
                      href: '/sales-analysis/export-statistics',
                    },
                  ]}
                />

                <MobileDropdown
                  title='News'
                  menu='news'
                  openDropdown={openDropdown}
                  toggleDropdown={toggleDropdown}
                  links={[
                    { name: 'Cars', href: '/news/cars' },
                    { name: 'Bikes', href: '/news/bikes' },
                    { name: 'Offers', href: '/news/offers' },
                  ]}
                />

                <MobileDropdown
                  title='Autopedia'
                  menu='autopedia'
                  openDropdown={openDropdown}
                  toggleDropdown={toggleDropdown}
                  links={[
                    { name: 'Dealerships', href: '/autopedia/dealerships' },
                    { name: 'Editorials', href: '/autopedia/editorials' },
                  ]}
                />

                {/* SIMPLE LINKS */}
                <Link href='/about' className='block text-lg font-medium'>
                  About
                </Link>

                <Link href='/contact' className='block text-lg font-medium'>
                  Contact
                </Link>
              </div>

              {/* 🔥 FOOTER */}
              <div className='p-5 border-t text-sm text-gray-500'>
                © AutoPunditz
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function MobileDropdown({ title, menu, openDropdown, toggleDropdown, links }) {
  const isOpen = openDropdown === menu;

  return (
    <div className='border-b pb-3'>
      <button
        onClick={() => toggleDropdown(menu)}
        className='flex justify-between items-center w-full text-lg font-medium py-2'
      >
        {title}

        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
            }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='pl-3 mt-2 space-y-2 text-gray-600'
          >
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className='block py-1 hover:text-black'
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
