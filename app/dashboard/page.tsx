'use client';

import { useEffect, useState } from 'react';
import { Artist } from '@/types/artist';

export default function ManagerDashboard() {
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('artists');
    if (stored) {
      setArtists(JSON.parse(stored));
    }
  }, []);

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manager Dashboard</h1>

      {artists.length === 0 ? (
        <p className="text-gray-500">No submissions yet.</p>
      ) : (
        <table className="w-full border text-sm bg-white shadow-md rounded overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Category</th>
              <th className="p-3 border-b">Location</th>
              <th className="p-3 border-b">Fee</th>
              <th className="p-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {artists.map((artist) => (
              <tr key={artist.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{artist.name}</td>
                <td className="p-3 border-b">{artist.category?.join(', ')}</td>
                <td className="p-3 border-b">{artist.location}</td>
                <td className="p-3 border-b">{artist.fee}</td>
                <td className="p-3 border-b">
                  <button className="px-3 py-1 bg-black text-white rounded text-xs">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
