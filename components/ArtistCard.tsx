'use client';

import React from 'react';
import { Artist } from '@/types/artist';
import Image from 'next/image';
import { FiMapPin, FiTag, FiDollarSign, FiMessageSquare } from 'react-icons/fi';

type Props = {
  artist: Artist;
};

const ArtistCard: React.FC<Props> = ({ artist }) => {
  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border">
      {/* Artist Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={artist.image}
          alt={artist.name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900">{artist.name}</h2>

        <div className="flex items-center text-sm text-gray-500 mt-1 gap-2">
          <FiTag className="w-4 h-4" />
          <span>{artist.category}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500 mt-1 gap-2">
          <FiMapPin className="w-4 h-4" />
          <span>{artist.location}</span>
        </div>

        <div className="flex items-center text-sm text-gray-700 mt-2 font-medium gap-2">
          <FiDollarSign className="w-4 h-4" />
          <span>{artist.fee}</span>
        </div>

        {/* Ask Quote Button */}
        <button className="mt-4 w-full flex items-center justify-center gap-2 py-2 bg-black text-white text-sm font-medium rounded-full transition hover:opacity-90">
          <FiMessageSquare className="w-4 h-4" />
          Ask for Quote
        </button>
      </div>
    </div>
  );
};

export default ArtistCard;
