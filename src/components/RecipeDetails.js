import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchWithHandling } from "../utils/apiUtils";

export default function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            const apiUrl = process.env.REACT_APP_API_URL;
            try {
                const data = await fetchWithHandling(`${apiUrl}/recipes/getById/${id}`);
                setRecipe(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipe();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="recipe-details">
            <h1 style={{ textAlign: 'center' }}>{recipe.name}</h1>
            <img
                src={recipe.image}
                alt={recipe.name}
                style={{ display: 'block', margin: '0 auto', width: '30%', height: '25%' }}
            />
            <ol>
                <li><p><strong>Cuisine:</strong> {recipe.cuisine}</p></li>
                <li><p><strong>Prep Time:</strong> {recipe.prepTimeMinutes} mins</p></li>
                <li><p><strong>Cook Time:</strong> {recipe.cookTimeMinutes} mins</p></li>
                <li><p><strong>Difficulty:</strong> {recipe.difficulty}</p></li>
                <li><p><strong>Servings:</strong> {recipe.servings}</p></li>
                <h2>Ingredients:</h2>
                <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                <h2>Instructions:</h2>
                <ol>
                    {recipe.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </ol>
            </ol>
        </div>
    );
}
