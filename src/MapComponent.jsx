import React, { useState } from "react";
import Map, { Marker } from "react-map-gl";

const MapComponent = () => {
  const [coordinates, setCoordinates] = useState([]); // Stores coordinates for markers
  const [searchInput, setSearchInput] = useState(""); // Stores the user's search input

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/complaints?query=${searchInput}`); // API call to fetch complaint data
      const data = await response.json();

      if (data.length) {
        const location = data[0];
        setCoordinates([location.longitude, location.latitude]); // Updates coordinates with the search result
      } else {
        alert("No results found for the given input."); // Handle case when no data is found
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      {/* Search bar and button */}
      <div className="search-bar mb-4">
        <input
          type="text"
          placeholder="Enter address, ZIP code, or BIN # "
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border rounded px-4 py-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Map rendering */}
      <Map
        initialViewState={{
          longitude: -74.006,
          latitude: 40.7128,
          zoom: 12,
        }}
        style={{ width: "100%", height: "400px" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        >
        {/* Marker for the searched location */}
        {coordinates.length > 0 && (
          <Marker
            longitude={coordinates[0]}
            latitude={coordinates[1]}
            anchor="bottom"
          >
            <div className="bg-red-500 text-white p-1 rounded-full">📍</div>
          </Marker>
        )}
      </Map>
    </div>
  );
};

export default MapComponent;
