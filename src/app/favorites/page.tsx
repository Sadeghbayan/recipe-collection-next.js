"use client";
import { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    const favs = stored ? JSON.parse(stored) : [];
    setFavorites(favs);
  }, []);

  useEffect(() => {
    async function load() {
      const results = await Promise.all(
        favorites.map(async (id) => {
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          );
          const j = await res.json();
          return j.meals?.[0];
        })
      );
      setRecipes(results.filter(Boolean));
    }
    if (favorites.length) load();
    else setRecipes([]);
  }, [favorites]);

  if (favorites.length === 0) return <p>You have no favorites yet.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recipes.map((r) => (
          <RecipeCard key={r.idMeal} recipe={r} />
        ))}
      </div>
    </div>
  );
}
