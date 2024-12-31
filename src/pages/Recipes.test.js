import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import Recipes from "./Recipes";

test("renders Recipes component with PreviousSearches and RecipeCard components", async () => {
  render(
    <MemoryRouter>
      <Recipes />
    </MemoryRouter>
  );

  expect(screen.getByPlaceholderText("Search ...")).toBeInTheDocument();

  const recipeCards = screen.getAllByRole("img", { name: /recipeImage/i });
  expect(recipeCards.length).toBeGreaterThan(0);

  await waitFor(() => expect(screen.getByText("Chicken Pan Pizza")).toBeInTheDocument());
});
