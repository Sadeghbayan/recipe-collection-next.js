"use client";
import React from "react";

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex">
      <input
        type="search"
        placeholder="Search recipes (e.g. pasta, chicken)..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-l"
      />
      <button
        onClick={() => {}}
        className="px-4 py-2 border rounded-r bg-white"
      >
        Search
      </button>
    </div>
  );
}
