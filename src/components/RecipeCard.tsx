"use client";
import Image from "next/image";
import FavoriteButton from "./FavoriteButton";
import Link from "next/link";

export default function RecipeCard({ recipe }: { recipe: any }) {
  return (
    <Link href={`/recipes/${recipe.idMeal}`} className="block group">
      <article className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 flex flex-col hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 cursor-pointer transform hover:-translate-y-1">
        <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 ring-1 ring-slate-700/50 group-hover:ring-amber-500/30 transition-all duration-500">
          {recipe.strMealThumb && (
            <Image
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <h3 className="font-display text-xl font-semibold text-white mb-2 group-hover:text-amber-100 transition-colors duration-300">
          {recipe.strMeal}
        </h3>
        <p className="text-sm text-slate-400 mb-4 font-medium">
          {recipe.strCategory} • {recipe.strArea}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-sm text-amber-400 font-medium group-hover:text-amber-300 transition-colors duration-300">
            Discover Recipe
          </span>
          <div onClick={(e) => e.stopPropagation()}>
            <FavoriteButton id={recipe.idMeal} />
          </div>
        </div>
      </article>
    </Link>
  );
}
