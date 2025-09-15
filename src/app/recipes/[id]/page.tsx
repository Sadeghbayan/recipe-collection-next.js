import Image from "next/image";
import Header from "../../../components/Header";
import RecipeFavoriteButton from "../../../components/RecipeFavoriteButton";

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

  // Format instructions into numbered steps
  const instructions = meal.strInstructions
    ? meal.strInstructions
        .split("\r\n")
        .filter((step: string) => step.trim() !== "")
        .map((step: string) => step.trim())
    : [];

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Recipe Image */}
          <div className="w-full h-96 rounded-2xl overflow-hidden shadow-lg mb-8">
            <Image
              src={meal.strMealThumb}
              alt={meal.strMeal}
              width={800}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="md:col-span-2">
              {/* Recipe Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-xs font-bold uppercase px-3 py-1 rounded-full">
                      {meal.strCategory}
                    </span>
                    {meal.strArea && (
                      <span className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-xs font-bold uppercase px-3 py-1 rounded-full">
                        {meal.strArea}
                      </span>
                    )}
                  </div>
                  <h1 className="text-4xl font-bold text-gray-800">
                    {meal.strMeal}
                  </h1>
                </div>
                <RecipeFavoriteButton id={meal.idMeal} />
              </div>

              {/* Recipe Description */}
              <p className="text-[var(--text-secondary)] mb-10">
                A delicious {meal.strCategory.toLowerCase()} recipe from{" "}
                {meal.strArea}.
                {meal.strInstructions &&
                  ` ${meal.strInstructions.substring(0, 150)}...`}
              </p>

              {/* Instructions */}
              <h2 className="text-2xl font-bold mb-6">Instructions</h2>
              <div className="prose max-w-none text-[var(--text-secondary)] space-y-4">
                {instructions.map((step: string, index: number) => (
                  <p key={index}>
                    <strong>{index + 1}.</strong> {step}
                  </p>
                ))}
              </div>
            </div>

            {/* Ingredients Sidebar */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-2xl font-bold mb-6">Ingredients</h2>
              <ul className="space-y-4">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center">
                    <input
                      className="h-5 w-5 checkbox-custom mr-3 flex-shrink-0"
                      id={`ingredient${index}`}
                      type="checkbox"
                    />
                    <label
                      className="text-[var(--text-secondary)]"
                      htmlFor={`ingredient${index}`}
                    >
                      {ingredient.measure} {ingredient.ing}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
