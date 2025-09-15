"use client";
import { useEffect, useState } from "react";

function readFavs(): string[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem("favorites");
  return raw ? JSON.parse(raw) : [];
}

export default function RecipeFavoriteButton({ id }: { id: string }) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const favs = readFavs();
    setIsFavorited(favs.includes(id));
    const onChange = () => setIsFavorited(readFavs().includes(id));
    window.addEventListener("favorites:changed", onChange);
    return () => window.removeEventListener("favorites:changed", onChange);
  }, [id]);

  const toggleFavorite = () => {
    const favs = readFavs();
    let updated: string[];
    if (favs.includes(id)) {
      updated = favs.filter((x) => x !== id);
    } else {
      updated = [...favs, id];
    }
    localStorage.setItem("favorites", JSON.stringify(updated));
    window.dispatchEvent(new Event("favorites:changed"));
    setIsFavorited(!isFavorited);
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-300 group cursor-pointer ${
        isFavorited
          ? "border-[var(--primary-color)] bg-[var(--primary-color)] text-white"
          : "border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"
      }`}
    >
      <span
        className={`material-symbols-outlined text-xl ${
          isFavorited ? "fill-white" : "group-hover:fill-white"
        }`}
      >
        favorite
      </span>
      <span className="font-semibold text-sm">
        {isFavorited ? "Favorited" : "Favorite"}
      </span>
    </button>
  );
}
