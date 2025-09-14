"use client";
import { useEffect, useState } from "react";

function readFavs(): string[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem("favorites");
  return raw ? JSON.parse(raw) : [];
}

export default function FavoriteButton({ id }: { id: string }) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favs = readFavs();
    setIsFav(favs.includes(id));
    const onChange = () => setIsFav(readFavs().includes(id));
    window.addEventListener("favorites:changed", onChange);
    return () => window.removeEventListener("favorites:changed", onChange);
  }, [id]);

  function toggle() {
    const favs = readFavs();
    let updated: string[];
    if (favs.includes(id)) updated = favs.filter((x) => x !== id);
    else updated = [...favs, id];
    localStorage.setItem("favorites", JSON.stringify(updated));
    window.dispatchEvent(new Event("favorites:changed"));
    setIsFav(!isFav);
  }

  return (
    <button onClick={toggle} aria-pressed={isFav} className="px-2 py-1">
      {isFav ? "❤️" : "🤍"}
    </button>
  );
}
