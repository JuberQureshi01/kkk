'use client';

import { useState } from 'react';
import { FiBell, FiSearch } from 'react-icons/fi';
import Link from 'next/link';

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav className="relative flex items-center justify-between px-4 md:px-6 py-3 bg-white shadow rounded-t-lg">
      
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <Link href="/" className="text-2xl font-bold text-black">
          Artistly
        </Link>
      </div>

      {/* Center: Search Bar - Hidden on small screens */}
      <div className="hidden md:flex flex-1 max-w-xl mx-6 relative">
        <FiSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search Your Performer"
          className="w-full pl-10 pr-4 py-2 border rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

  {/* Right Side */}
<div className="flex items-center gap-4 relative">
  {/* Explore Artists link */}
  <Link
    href="/artists"
    className="hidden sm:inline text-sm font-medium text-gray-600 hover:text-black transition"
  >
    Explore Artists
  </Link>

  {/* Dashboard link */}
  <Link
    href="/dashboard"
    className="hidden sm:inline text-sm font-medium text-gray-600 hover:text-black transition"
  >
    Dashboard
  </Link>

  {/* Notification Icon */}
  <div className="relative">
    <button onClick={() => setShowNotifications(!showNotifications)}>
      <FiBell className="text-gray-500 w-5 h-5 cursor-pointer" />
    </button>

    {/* Notification Dropdown */}
    <div
      className={`absolute right-0 mt-2 w-60 bg-white border rounded-md shadow-lg transition-all duration-300 ease-in-out origin-top z-50 ${
        showNotifications
          ? 'scale-100 opacity-100'
          : 'scale-95 opacity-0 pointer-events-none'
      }`}
    >
      <div className="p-4 text-sm text-gray-500 cursor-pointer">
        No new notifications
      </div>
    </div>
  </div>

  {/* Create Profile Button */}
  <Link
    href="/onboard"
    className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded-md"
  >
    Create Profile
  </Link>
</div>

    </nav>
  );
}
