'use client';

import Link from 'next/link';
import { FaMicrophoneAlt, FaMusic, FaUserTie, FaMale } from 'react-icons/fa';

const categories = [
  { label: 'Singers', icon: <FaMicrophoneAlt />, value: 'Singers' },
  { label: 'Dancers', icon: <FaMale />, value: 'Dancers' },
  { label: 'DJs', icon: <FaMusic />, value: 'DJs' },
  { label: 'Speakers', icon: <FaUserTie />, value: 'Speakers' },
];

export default function HomePage() {
  return (
    <main className="relative w-full h-full text-white bg-black">
      {/*  Hero Section with Background Video */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/sapphire.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            Book the Best Performers for Your Events 
          </h1>
          <p className="text-lg max-w-2xl text-gray-200">
            Explore top artists including singers, DJs, dancers, and speakers. Hassle-free booking for your special occasion.
          </p>
          <Link href="/artists">
            <button className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition">
              Explore Artists
            </button>
          </Link>
        </div>
      </section>

      {/* 🔍 Browse Talent by Category Section */}
      <section className="bg-white text-black py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header row */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Browse talent by category</h2>
            <Link href="/artists">
              <button className="text-purple-600 hover:underline font-medium text-sm">
                Explore More →
              </button>
            </Link>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 transition smooth sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link key={cat.value} href="/artists" className='hover:scale-125 hover:px-5' >
                <div className="bg-gray-100 hover:bg-purple-50 transition p-6 rounded-lg shadow text-center cursor-pointer group">
                  <div className="text-3xl text-purple-600   mb-2">
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{cat.label}</h3>
                  <p className="text-sm text-gray-500 mt-1">Top {cat.label.toLowerCase()} available</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
