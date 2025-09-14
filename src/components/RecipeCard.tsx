"use client";
import Image from "next/image";
import FavoriteButton from "./FavoriteButton";
import Link from "next/link";

export default function RecipeCard({ recipe }: { recipe: any }) {
  return (
    <article className="bg-white rounded shadow p-3 flex flex-col">
      <div className="relative w-full h-40 rounded overflow-hidden">
        {recipe.strMealThumb && (
          <Image
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            fill
            style={{ objectFit: "cover" }}
          />
        )}
      </div>
      <h3 className="mt-2 font-semibold">{recipe.strMeal}</h3>
      <p className="text-sm text-gray-600">
        {recipe.strCategory} • {recipe.strArea}
      </p>
      <div className="mt-auto flex items-center justify-between">
        <Link href={`/recipes/${recipe.idMeal}`} className="text-sm underline">
          View
        </Link>
        <FavoriteButton id={recipe.idMeal} />
      </div>
    </article>
  );
}
