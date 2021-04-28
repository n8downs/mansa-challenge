import { render } from '../utils/test';
import BusinessScreen from './BusinessScreen';
import { createMemoryHistory } from 'history';
import { Route } from 'react-router-dom';

const BusinessRoute = () => (
  <Route path="/business/:siren">
    <BusinessScreen />
  </Route>
);

describe('BusinessScreen', () => {
  test('renders', () => {
    const history = createMemoryHistory();
    history.push('/business/123456');
    const { getByText } = render(<BusinessRoute />, { history });
    expect(getByText('123456')).toBeInTheDocument();
  });
});
