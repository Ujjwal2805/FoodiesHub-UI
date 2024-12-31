import React from "react";
import { render, screen } from "@testing-library/react";
import RecipeCard from "./RecipeCard";

test("renders RecipeCard with correct data", () => {
  const recipe = {
    title: "Chicken Pan Pizza",
    image: "/img/gallery/img_1.jpg",
    author: "Chef John",
    authorImg: "/img/top-chiefs/img_1.jpg",
  };

  render(<RecipeCard recipe={recipe} />);

  expect(screen.getByText("Chicken Pan Pizza")).toBeInTheDocument();

  expect(screen.getByRole("img", { name: /recipeImage/i })).toHaveAttribute("src", recipe.image);

  expect(screen.getByRole("img", { name: /authorImage/i })).toHaveAttribute("src", recipe.authorImg);
});
