"use client";
import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Llama a onSearch en tiempo real
  };

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        className="w-72 p-2 pl-4 pr-8 border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 shadow-md placeholder-gray-500"
        placeholder="Buscar..."
        value={query}
        onChange={handleInputChange}
      />
      <span className="absolute right-3 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M9.5 17a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
          />
        </svg>
      </span>
    </div>
  );
};

export default SearchBar;
