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

  describe('Search Box', () => {
    test('is rendered', () => {
      const { getByPlaceholderText } = render(<Header />);
      expect(getByPlaceholderText(/siren/i)).toBeInTheDocument();
    });

    test('pressing enter navigates to business screen', () => {
      const history = createMemoryHistory();
      const { getByPlaceholderText } = render(<Header />, { history });

      const searchBox = getByPlaceholderText(/siren/i);
      fireEvent.change(searchBox, {
        target: { value: '123456' },
      });
      fireEvent.submit(searchBox);
      expect(history.location.pathname).toBe('/business/123456');
    });

    test('default is prevented for form submission', () => {
      const { getByPlaceholderText } = render(<Header />);

      const searchBox = getByPlaceholderText(/siren/i);
      fireEvent.change(searchBox, {
        target: { value: '123456' },
      });
      expect(fireEvent.submit(searchBox)).toBe(false);
    });

    test('queries are uri-encoded', () => {
      const history = createMemoryHistory();
      const { getByPlaceholderText } = render(<Header />, { history });

      const searchBox = getByPlaceholderText(/siren/i);
      fireEvent.change(searchBox, {
        target: { value: '123/tacos?foo=bar' },
      });
      fireEvent.submit(searchBox);
      expect(history.location.pathname).toBe(
        '/business/123%2Ftacos%3Ffoo%3Dbar'
      );
    });

    test('query text is not uri-encoded within the document', () => {
      const { getByPlaceholderText, getByDisplayValue } = render(<Header />);

      fireEvent.change(getByPlaceholderText(/siren/i), {
        target: { value: '123/tacos' },
      });
      expect(getByDisplayValue('123/tacos')).toBeInTheDocument();
    });

    test('spaces are removed from query', () => {
      const history = createMemoryHistory();
      const { getByPlaceholderText } = render(<Header />, { history });

      const searchBox = getByPlaceholderText(/siren/i);
      fireEvent.change(searchBox, {
        target: { value: ' 1 2 3 4 5 6 ' },
      });
      fireEvent.submit(searchBox);
      expect(history.location.pathname).toBe('/business/123456');
    });

    test("pressing enter without a query doesn't navigate", () => {
      const history = createMemoryHistory();
      const { getByPlaceholderText } = render(<Header />, { history });

      expect(fireEvent.submit(getByPlaceholderText(/siren/i))).toBe(false);
      expect(history.location.pathname).toBe('/');
    });
  });
});
