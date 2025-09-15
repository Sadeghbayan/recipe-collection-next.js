"use client";
import { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard";
import Header from "../../components/Header";

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

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

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />

        <main className="flex flex-col flex-1 px-10 py-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-4xl font-bold text-slate-900">
                Your Favorite Recipes
              </h1>
              <p className="text-slate-600 text-lg">
                {favorites.length === 0
                  ? "You haven't saved any recipes yet. Start exploring to add some favorites!"
                  : `You have ${favorites.length} favorite recipe${
                      favorites.length === 1 ? "" : "s"
                    }.`}
              </p>
            </div>

            {favorites.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-slate-400 text-lg font-medium">
                  No favorites yet. Go back to the home page to discover some
                  delicious recipes!
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {recipes.map((r) => (
                  <RecipeCard key={r.idMeal} recipe={r} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
