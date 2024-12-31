import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RecipeDetails from './RecipeDetails';
import { fetchWithHandling } from '../utils/apiUtils';

jest.mock('../utils/apiUtils', () => ({
  fetchWithHandling: jest.fn(),
}));

describe('RecipeDetails', () => {
  test('fetches and displays recipe details successfully', async () => {
    const mockRecipe = {
      name: 'Pizza',
      image: '/img/pizza.jpg',
      cuisine: 'Italian',
      prepTimeMinutes: 10,
      cookTimeMinutes: 20,
      difficulty: 'Easy',
      servings: 2,
      ingredients: ['Flour', 'Tomato'],
      instructions: ['Mix', 'Bake'],
    };

    fetchWithHandling.mockResolvedValue(mockRecipe);

    render(
      <MemoryRouter initialEntries={['/recipe/1']}>
        <Routes>
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Pizza')).toBeInTheDocument();
      expect(screen.getByText('Italian')).toBeInTheDocument();
      expect(screen.getByText('Flour')).toBeInTheDocument();
      expect(screen.getByText('Mix')).toBeInTheDocument();
    });
  });

  test('displays loading message while fetching data', () => {
    fetchWithHandling.mockReturnValue(new Promise(() => {}));

    render(
      <MemoryRouter initialEntries={['/recipe/1']}>
        <Routes>
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays error message when fetch fails', async () => {
    const errorMessage = 'Failed to fetch recipe details';

    fetchWithHandling.mockRejectedValue(new Error(errorMessage));

    render(
      <MemoryRouter initialEntries={['/recipe/1']}>
        <Routes>
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});

