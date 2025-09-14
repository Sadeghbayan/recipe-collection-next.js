"use client";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";

type Meal = any;

export default function HomePage() {
  const [q, setQ] = useState("");
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // initial query
    setQ("chicken");
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    async function search() {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const json = await res.json();
        setRecipes(json.meals ?? []);
      } catch (err) {
        if ((err as any).name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (q !== "") search();
    return () => controller.abort();
  }, [q]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Recipe Collection</h1>
      <SearchBar value={q} onChange={setQ} />
      {loading ? <p className="mt-4">Loading…</p> : null}
      {!loading && recipes.length === 0 ? (
        <p className="mt-4 text-sm text-gray-600">No recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {recipes.map((r: any) => (
            <RecipeCard key={r.idMeal} recipe={r} />
          ))}
        </div>
      )}
    </div>
  );
}
