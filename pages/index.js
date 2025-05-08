import axios from "axios";
import { useState } from "react";
import RecipeCard from "../Component/RecipeCard";
import "../styles/globals.css";

export async function getStaticProps() {
    const { data } = await axios.get("https://dummyjson.com/recipes");
    
    return {
        props: { recipes: data.recipes.slice(0, 50) }, 
        revalidate: 60, 
    };
}

export default function Home({ recipes }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const tags = ["All", "Pizza", "Vegetarian", "Meat", "Fast & Easy"];
    const filteredRecipes = recipes.filter(recipe => {
        const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || recipe.tags === selectedCategory;
        return matchesSearch && matchesCategory;
    });
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
            <div>
            <h1 className="title text-center text-4xl">All your favorite <span className="text-orange-500">recipes,<br/>in one place</span></h1>
                <div className="search w-30  my-10 mx-auto items-center">
                    <input type="text" placeholder="Search recipes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                </div>
                <div className="tags flex justify-center mb-10 gap-4">
                {tags.map(tags => (
                    <button style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className=" bg-orange-500 text-white hover:bg-[#83c9b9] hover:text-gray-600 rounded-full px-4 py-2 my-auto" key={tags} onClick={() => setSelectedCategory(tags)} >
                        {tags}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-3 justify-items-center my-auto">
                {filteredRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>
        </div>
    );
}
