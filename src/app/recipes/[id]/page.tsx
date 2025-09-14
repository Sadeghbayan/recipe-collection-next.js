import Image from "next/image";

type Props = { params: { id: string } };

export default async function RecipePage({ params }: Props) {
  const id = params.id;
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    { next: { revalidate: 60 } }
  );
  const json = await res.json();
  const meal = json.meals?.[0];

  if (!meal) return <p>Recipe not found</p>;

  const ingredients: { ing: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) ingredients.push({ ing, measure });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{meal.strMeal}</h1>
      <div className="mt-4 grid md:grid-cols-3 gap-6">
        <div>
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            width={600}
            height={400}
            className="rounded"
          />
          <p className="mt-2 text-sm text-gray-600">
            {meal.strCategory} • {meal.strArea}
          </p>
        </div>
        <div className="md:col-span-2">
          <h2 className="font-semibold">Ingredients</h2>
          <ul className="list-disc pl-5">
            {ingredients.map((it, i) => (
              <li key={i}>
                {it.measure} {it.ing}
              </li>
            ))}
          </ul>
          <h2 className="mt-4 font-semibold">Instructions</h2>
          <p className="whitespace-pre-line">{meal.strInstructions}</p>
        </div>
      </div>
    </div>
  );
}
