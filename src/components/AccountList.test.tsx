import { render, FetchMock, fireEvent } from '../utils/test';
import AccountList from './AccountList';
import { createFakeAccountInfo } from '../data/account';
import { createMemoryHistory } from 'history';
import { Route } from 'react-router-dom';

describe('AccountList', () => {
  let fetchMock: FetchMock;

  beforeEach(() => {
    fetchMock = new FetchMock();
  });

  test('fetches accounts from API', () => {
    render(<AccountList />);
    expect(fetch).toHaveBeenCalledWith('https://kata.getmansa.com/accounts');
  });

  test('renders account button', async () => {
    fetchMock.mockResponse(
      'https://kata.getmansa.com/accounts',
      JSON.stringify([
        createFakeAccountInfo({
          account_number: '1234567890',
        }),
      ]),
      {
        status: 200,
      }
    );
    const { findByRole } = render(<AccountList />);
    expect(
      await findByRole('button', { name: 'account ending in 7890' })
    ).toBeInTheDocument();
  });

  test('account button shows last 4 and current amount', async () => {
    fetchMock.mockResponse(
      'https://kata.getmansa.com/accounts',
      JSON.stringify([
        createFakeAccountInfo({
          account_number: '9999',
          current: 12.34,
        }),
      ]),
      {
        status: 200,
      }
    );
    const { findByRole } = render(<AccountList />);
    expect(await findByRole('button')).toHaveTextContent('…9999£12.34');
  });

  test('renders several accounts', async () => {
    fetchMock.mockResponse(
      'https://kata.getmansa.com/accounts',
      JSON.stringify([
        createFakeAccountInfo({
          account_id: 'A',
          account_number: '1234',
        }),
        createFakeAccountInfo({
          account_id: 'B',
          account_number: '5678',
        }),
      ]),
      {
        status: 200,
      }
    );
    const { findByRole } = render(<AccountList />);
    expect(
      await findByRole('button', { name: 'account ending in 1234' })
    ).toBeInTheDocument();
    expect(
      await findByRole('button', { name: 'account ending in 5678' })
    ).toBeInTheDocument();
  });

  test('account button links to account details page', async () => {
    const history = createMemoryHistory();
    history.push('/business/SIREN');

    fetchMock.mockResponse(
      'https://kata.getmansa.com/accounts',
      JSON.stringify([
        createFakeAccountInfo({
          account_id: 'the-account-id',
        }),
      ]),
      {
        status: 200,
      }
    );
    const { findByRole } = render(
      <Route path="/business/:siren">
        <AccountList />
      </Route>,
      { history }
    );
    fireEvent.click(await findByRole('button'));
    expect(history.location.pathname).toBe(
      '/business/SIREN/account/the-account-id'
    );
  });
});
