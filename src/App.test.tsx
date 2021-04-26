import { render } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

describe('App', () => {
  test('renders header banner', () => {
    const { getByRole } = render(<App />, { wrapper: MemoryRouter });
    expect(getByRole('banner')).toBeInTheDocument();
  });

  describe('routing', () => {
    test('handles home screen', () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      expect(getByText(/welcome/i)).toBeInTheDocument();
    });

    test('handles some not-found screen', () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={['/tacos']}>
          <App />
        </MemoryRouter>
      );
      expect(getByText(/oops/i)).toBeInTheDocument();
    });

    test('handles other not-found screen', () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={['/pizza']}>
          <App />
        </MemoryRouter>
      );
      expect(getByText(/oops/i)).toBeInTheDocument();
    });
  });
});
