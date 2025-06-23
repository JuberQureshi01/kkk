"use client";

import { useState } from "react";
import { Artist } from "@/types/artist";
import ArtistCard from "@/components/ArtistCard";
import data from "@/data/artists.json";
import { FiChevronDown } from "react-icons/fi";

const ArtistListingPage = () => {
  const artists = data as Artist[];

 const uniqueCategories = Array.from(
  new Set(artists.flatMap((a) => a.category)) 
);
  const uniqueLocations = Array.from(new Set(artists.map((a) => a.location)));

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const toggleSelection = (
    value: string,
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    );
  };

const filteredArtists = artists.filter((artist) => {
  const categoryMatch =
    selectedCategories.length === 0 ||
    artist.category.some((cat) => selectedCategories.includes(cat));

  const locationMatch =
    selectedLocations.length === 0 ||
    selectedLocations.includes(artist.location);

  return categoryMatch && locationMatch;
});

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Artists</h1>

      {/* Dropdown Filters */}
      <div className="flex justify-end gap-4 mb-6 flex-wrap">
        {/* Category Filter */}
        <div className="relative">
          <button
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className="px-4 py-2 border rounded-md text-sm flex items-center gap-2 bg-white"
          >
            Category <FiChevronDown />
          </button>
          {showCategoryDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md border z-10">
              <ul className="p-2 max-h-60 overflow-y-auto text-sm">
                {uniqueCategories.map((cat) => (
                  <li key={cat}>
                    <label className="flex items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() =>
                          toggleSelection(cat, selectedCategories, setSelectedCategories)
                        }
                      />
                      {cat}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Location Filter */}
        <div className="relative">
          <button
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            className="px-4 py-2 border rounded-md text-sm flex items-center gap-2 bg-white"
          >
            Location <FiChevronDown />
          </button>
          {showLocationDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md border z-10">
              <ul className="p-2 max-h-60 overflow-y-auto text-sm">
                {uniqueLocations.map((loc) => (
                  <li key={loc}>
                    <label className="flex items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        checked={selectedLocations.includes(loc)}
                        onChange={() =>
                          toggleSelection(loc, selectedLocations, setSelectedLocations)
                        }
                      />
                      {loc}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Artist Cards */}
      <section>
        {filteredArtists.length === 0 ? (
          <p className="text-center text-gray-500">No matching artists found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ArtistListingPage;
