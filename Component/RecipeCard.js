import Image from "next/image";
import Link from "next/link";

export default function RecipeCard({ recipe }) {
    return (
        <div className="card mx-auto mb-10 p-3 bg-gray-100">
            <Image className="w-full" src={recipe.image} alt={recipe.name} width={200} height={150} />
            <h3>{recipe.name}</h3>
            <p>Cooking Time: {recipe.cookTimeMinutes} min</p>
            <Link href={`/recipes/${recipe.id}`}>
                <button className="bg-orange-500 text-white hover:bg-[#83c9b9] hover:text-gray-600 rounded-full px-1 py-1 my-2">View Recipe</button>
            </Link>
        </div>
    );
}
