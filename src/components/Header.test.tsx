import { render, fireEvent } from '../utils/test';
import Header from './Header';
import { createMemoryHistory } from 'history';

describe('Header', () => {
  test('renders home button', () => {
    const { getByLabelText } = render(<Header />);
    expect(getByLabelText(/home/i)).toBeInTheDocument();
  });

  test('clicking home button navigates to site root', () => {
    const history = createMemoryHistory();
    history.push('/cactus');
    const { getByLabelText } = render(<Header />, { history });

    fireEvent.click(getByLabelText(/home/i));
    expect(history.location.pathname).toBe('/');
  });
});
