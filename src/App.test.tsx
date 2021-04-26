import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders header banner', () => {
    const { getByRole } = render(<App />);
    expect(getByRole('banner')).toBeInTheDocument();
  });
});
