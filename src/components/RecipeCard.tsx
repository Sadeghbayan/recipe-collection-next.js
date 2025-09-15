"use client";
import Image from "next/image";
import Link from "next/link";

export default function RecipeCard({ recipe }: { recipe: any }) {
  return (
    <Link
      href={`/recipes/${recipe.idMeal}`}
      className="flex flex-col gap-4 group cursor-pointer"
    >
      <div className="relative w-full aspect-square overflow-hidden rounded-2xl shadow-md group-hover:shadow-xl transition-shadow duration-300">
        {recipe.strMealThumb && (
          <Image
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="flex flex-col">
        <p className="text-slate-800 text-lg font-bold">{recipe.strMeal}</p>
        <div className="flex gap-2 mt-1">
          <span className="inline-block  bg-opacity-20 text-[var(--primary-color)] text-xs font-semibold py-1 rounded-full">
            {recipe.strCategory}
          </span>
          {recipe.strArea && (
            <span className="inline-block bg-opacity-20 text-[var(--primary-color)] text-xs font-semibold px-2.5 py-1 rounded-full">
              {recipe.strArea}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
