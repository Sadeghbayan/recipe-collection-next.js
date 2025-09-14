"use client";
import React from "react";

export default function SearchBar({
  value,
  onChange,
  isDebouncing = false,
}: {
  value: string;
  onChange: (v: string) => void;
  isDebouncing?: boolean;
}) {
  return (
    <div className="relative">
      <div className="flex items-center bg-gradient-to-r from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-2 hover:border-amber-500/30 transition-all duration-300 shadow-xl">
        <input
          type="search"
          placeholder="Search for exquisite recipes..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`flex-1 px-6 py-4 bg-transparent text-white placeholder-slate-400 focus:outline-none font-medium ${
            isDebouncing ? "text-amber-300" : "text-white"
          }`}
        />
        <button
          onClick={() => {}}
          className={`px-6 py-4 rounded-xl transition-all duration-300 font-semibold ${
            isDebouncing
              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/25"
              : "bg-gradient-to-r from-slate-700 to-slate-800 text-amber-400 hover:from-amber-500 hover:to-amber-600 hover:text-white"
          }`}
        >
          {isDebouncing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Searching</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span>Search</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
