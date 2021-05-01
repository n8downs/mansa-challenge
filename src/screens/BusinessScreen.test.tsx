import { waitFor, render } from '../utils/test';
import BusinessScreen from './BusinessScreen';
import { createMemoryHistory } from 'history';
import { Route } from 'react-router-dom';
import { createFakeBusinessInfo } from '../data/business';

const BusinessRoute = () => (
  <Route path="/business/:siren">
    <BusinessScreen />
  </Route>
);

function mockResponse(bodyString: string, init?: ResponseInit) {
  jest
    .spyOn(global, 'fetch')
    .mockResolvedValue(
      new Response(new Blob([bodyString], { type: 'application/json' }), init)
    );
}

describe('BusinessScreen', () => {
  test('renders progressbar element', () => {
    const history = createMemoryHistory();
    history.push('/business/123456');
    const { getByRole } = render(<BusinessRoute />, { history });
    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  test('fetches data for the business', async () => {
    const history = createMemoryHistory();
    history.push('/business/123456');
    render(<BusinessRoute />, { history });
    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        'https://entreprise.data.gouv.fr/api/sirene/v3/unites_legales/123456'
      )
    );
  });

  test('renders error message if request is not successful', async () => {
    mockResponse(JSON.stringify({ error: "Can't find that SIREN" }), {
      status: 404,
    });

    const history = createMemoryHistory();
    history.push('/business/123456');
    const { findByText } = render(<BusinessRoute />, { history });
    expect(
      await findByText(
        'There was a problem retrieving business info for 123456'
      )
    ).toBeInTheDocument();
  });

  test('renders BusinessCard for fetched business', async () => {
    mockResponse(
      JSON.stringify({
        unite_legale: createFakeBusinessInfo({
          nom: 'Einstein',
          prenom_usuel: 'Albert',
        }),
      }),
      { status: 200 }
    );

    const history = createMemoryHistory();
    history.push('/business/123456');
    const { findByText } = render(<BusinessRoute />, { history });
    expect(await findByText('Albert Einstein')).toBeInTheDocument();
  });

  test('handles fetch failures', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Request failure'));
    const history = createMemoryHistory();
    history.push('/business/123456');
    const { findByText } = render(<BusinessRoute />, { history });
    expect(
      await findByText(
        'There was a problem retrieving business info for 123456'
      )
    ).toBeInTheDocument();
  });
});
