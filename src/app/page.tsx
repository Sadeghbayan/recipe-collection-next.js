"use client";
import { useEffect, useState, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";

type Meal = any;

export default function HomePage() {
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    // initial query
    setQ("chicken");
    setDebouncedQ("chicken");
  }, []);

  // Debounce the search query
  useEffect(() => {
    if (q !== debouncedQ) {
      setIsDebouncing(true);
    }

    const timer = setTimeout(() => {
      setDebouncedQ(q);
      setIsDebouncing(false);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [q, debouncedQ]);

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
        if ((err as any).name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (debouncedQ !== "") search();
    return () => controller.abort();
  }, [debouncedQ]);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="font-display text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-amber-100 to-amber-200 bg-clip-text text-transparent">
          Culinary Collection
        </h1>
        <p className="text-xl text-slate-300 font-light max-w-2xl mx-auto">
          Discover exceptional recipes from around the world, curated for the
          discerning palate
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <SearchBar value={q} onChange={setQ} isDebouncing={isDebouncing} />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-amber-400">
            <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="font-medium">
              Discovering exquisite recipes...
            </span>
          </div>
        </div>
      ) : null}

      {!loading && recipes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-slate-400 text-lg font-light">
            No recipes found. Try searching for something else.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {recipes.map((r: any) => (
            <RecipeCard key={r.idMeal} recipe={r} />
          ))}
        </div>
      )}
    </div>
  );
}
