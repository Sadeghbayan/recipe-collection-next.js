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
    <label className="flex flex-col w-full">
      <div className="relative flex w-full flex-1 items-stretch rounded-full shadow-lg">
        <div className="text-slate-500 flex items-center justify-center pl-6 pr-2">
          <span className="material-symbols-outlined text-2xl">search</span>
        </div>
        <input
          type="search"
          placeholder="Search for a recipe..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-full text-slate-800 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50 border-none bg-white h-16 placeholder:text-slate-500 px-4 text-lg font-medium leading-normal"
        />
      </div>
    </label>
  );
}
