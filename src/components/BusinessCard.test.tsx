import { render } from '../utils/test';
import BusinessCard from './BusinessCard';
import { createFakeBusinessInfo } from '../data/business';

describe('BusinessCard', () => {
  test('renders first and last name for individual', () => {
    const info = createFakeBusinessInfo({
      prenom_usuel: 'Albert',
      nom: 'Einstein',
    });
    const { getByText } = render(<BusinessCard info={info} />);
    expect(getByText('Albert Einstein')).toBeInTheDocument();
  });

  test('renders denomination for enterprise', () => {
    const info = createFakeBusinessInfo({
      denomination: 'Naturalia',
    });
    const { getByText } = render(<BusinessCard info={info} />);
    expect(getByText('Naturalia')).toBeInTheDocument();
  });

  test('renders formatted SIRET', () => {
    const info = createFakeBusinessInfo({
      etablissement_siege: {
        siret: '1234567890010',
      },
    });
    const { getByText } = render(<BusinessCard info={info} />);
    expect(getByText('SIRET: 123 456 789 0010')).toBeInTheDocument();
  });

  test('renders start date', () => {
    const info = createFakeBusinessInfo({
      date_debut: '2000-04-19',
    });
    const { getByText } = render(<BusinessCard info={info} />);
    expect(getByText('2000-04-19 - present')).toBeInTheDocument();
  });

  test('renders end date when applicable', () => {
    const info = createFakeBusinessInfo({
      date_debut: '2000-04-19',
      date_fin: '2020-12-31',
    });
    const { getByText } = render(<BusinessCard info={info} />);
    expect(getByText('2000-04-19 - 2020-12-31')).toBeInTheDocument();
  });

  test('renders link to google maps for address', () => {
    const info = createFakeBusinessInfo({
      etablissement_siege: {
        geo_adresse: '123 Boulevard de Bonne Nouvelle',
      },
    });
    const { getByText } = render(<BusinessCard info={info} />);
    expect(
      getByText('123 Boulevard de Bonne Nouvelle').closest('a')
    ).toHaveAttribute(
      'href',
      'https://www.google.com/maps/place/123+Boulevard+de+Bonne+Nouvelle/'
    );
  });
});
