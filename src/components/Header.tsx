"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap px-10 py-6">
      <Link
        href="/"
        className="flex items-center gap-3 text-slate-800 hover:opacity-80 transition-opacity duration-200"
      >
        <span className="material-symbols-outlined text-[var(--primary-color)] text-4xl">
          menu_book
        </span>
        <h2 className="text-slate-900 text-2xl font-bold leading-tight tracking-[-0.015em]">
          Tastebook
        </h2>
      </Link>
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="text-slate-900 text-base font-semibold leading-normal hover:text-[var(--primary-color)] transition-colors"
        >
          Home
        </Link>
        <Link
          href="/favorites"
          className="text-slate-600 text-base font-medium leading-normal hover:text-[var(--primary-color)] transition-colors"
        >
          Favorites
        </Link>
      </div>
    </header>
  );
}
