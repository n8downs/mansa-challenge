import { render } from './utils/test';
import App from './App';
import { createMemoryHistory } from 'history';

describe('App', () => {
  test('renders header banner', () => {
    const { getByRole } = render(<App />);
    expect(getByRole('banner')).toBeInTheDocument();
  });

  describe('routing', () => {
    test('handles home screen', () => {
      const history = createMemoryHistory();
      history.push('/');
      const { getByText } = render(<App />, { history });
      expect(getByText(/welcome/i)).toBeInTheDocument();
    });

    test('handles some not-found screen', () => {
      const history = createMemoryHistory();
      history.push('/tacos');
      const { getByText } = render(<App />, { history });
      expect(getByText(/oops/i)).toBeInTheDocument();
    });

    test('handles other not-found screen', () => {
      const history = createMemoryHistory();
      history.push('/pizza');
      const { getByText } = render(<App />, { history });
      expect(getByText(/oops/i)).toBeInTheDocument();
    });
  });
});
