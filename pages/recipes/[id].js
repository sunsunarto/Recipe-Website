import axios from "axios";
import React from "react";
import Link from "next/link";

export async function getServerSideProps({ params }) {
    const { data } = await axios.get(`https://dummyjson.com/recipes/${params.id}`);

    return { props: { recipe: data } };
}

export default function RecipeDetail({ recipe }) {
    return (
        <div>
            <div className="header flex justify-between items-center mt-10 mx-30">
                <div className="left">
                    <h1 className="head-title text-[#83c9b9]">Recipe</h1>
                </div>
                <div className="right">
                    <button className="buttonRight bg-orange-500 text-white hover:bg-[#83c9b9] hover:text-gray-600 rounded-full px-4 py-2">Login</button>
                </div>
            </div>
            <div className="container ml-auto mr-auto">
            <h1 className="text-3xl font-bold text-[#83c9b9]">{recipe.name}</h1>
            <div className="flex gap-2 my-5">
                <p className="text-xs">category: <span className="text-orange-500">{Array.isArray(recipe.tags) ? recipe.tags.join(", ") : recipe.tags}</span></p>
                <p className="text-xs">level: <span className="text-orange-500">{recipe.difficulty}</span></p>
                <p className="text-xs">type: <span className="text-orange-500">{recipe.mealType}</span></p>
            </div>
            <div className="flex flex-row gap-2">
                <img src={recipe.image} alt={recipe.name} width={400} className="object-cover" />
                <div>
                <p className="text-lg font-bold mb-5 border-b-2 border-orange-500 my-5">Ingredients</p>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <h2 className="text-lg font-bold mb-5 border-b-2 border-orange-500 my-5">Instructions:</h2>
            <ol>
                {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{index + 1}. {instruction}</li>
                ))}
            </ol>
        </div>
        <div className="flex justify-center my-10">
            <button className="buttonRight bg-orange-500 text-white hover:bg-[#83c9b9] hover:text-gray-600 rounded-full px-4 py-2">
                <Link href="/">Back</Link>
            </button>
        </div>
        </div>
    );
}
