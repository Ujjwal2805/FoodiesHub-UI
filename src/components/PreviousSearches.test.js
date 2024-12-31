import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PreviousSearches from './PreviousSearches';

describe('PreviousSearches Component', () => {
  test('renders search input and button', () => {
    render(
      <MemoryRouter>
        <PreviousSearches />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('Search ...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('updates query state on input change', () => {
    render(
      <MemoryRouter>
        <PreviousSearches />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Search ...');
    fireEvent.change(input, { target: { value: 'Pizza' } });

    expect(input.value).toBe('Pizza');
  });
});
