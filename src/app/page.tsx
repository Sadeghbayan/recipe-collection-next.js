"use client";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import Header from "../components/Header";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
};

export default function HomePage() {
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setQ("chicken");
    setDebouncedQ("chicken");
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQ(q);
    }, 300);

    return () => clearTimeout(timer);
  }, [q]);

  useEffect(() => {
    const controller = new AbortController();
    async function search() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(debouncedQ)}`
        );
        const json = await res.json();
        setRecipes(json.meals ?? []);
      } catch (err) {
        if ((err as Error).name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (debouncedQ !== "") search();
    return () => controller.abort();
  }, [debouncedQ]);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />

        <main className="flex flex-col flex-1 px-10">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-full max-w-2xl">
              <SearchBar value={q} onChange={setQ} />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3 text-[var(--primary-color)]">
                <div className="w-6 h-6 border-2 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin"></div>
                <span className="font-medium">Searching for recipes...</span>
              </div>
            </div>
          ) : null}

          {!loading && recipes.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-slate-600 text-lg font-medium">
                No recipes found. Try searching for something else.
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {recipes.map((r: Meal) => (
                <RecipeCard key={r.idMeal} recipe={r} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
