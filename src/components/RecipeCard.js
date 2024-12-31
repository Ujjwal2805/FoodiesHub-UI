import React from "react";

export default function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <div className="custom-image" style={{ paddingTop: "65%" }}>
        <img
          alt="recipeImage"
          src={recipe.image}
        />
      </div>
      <div className="recipe-card-info">
        <img
          alt="authorImage"
          className="auther-img"
          src={recipe.authorImg}
        />
        <p className="recipe-title">{recipe.title}</p>
        <p className="recipe-desc">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
        <a className="view-btn" href="#!">
          VIEW RECIPE
        </a>
      </div>
    </div>
  );
}
