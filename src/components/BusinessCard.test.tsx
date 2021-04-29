import { render } from '../utils/test';
import BusinessCard, { BusinessInfo } from './BusinessCard';

type FakeBusinessInfo = {
  id?: number;
  siren?: string;
  denomination?: string;
  prenom_usuel?: string;
  nom?: string;
  date_debut?: string;
  date_fin?: string;
  etablissement_siege?: {
    siret?: string;
    geo_adresse?: string;
  };
};

function createBusinessInfo(data: FakeBusinessInfo): BusinessInfo {
  return {
    id: data.id || 1,
    siren: data.siren || 'fake_siren',
    denomination: data.denomination || null,
    prenom_usuel: data.prenom_usuel || null,
    nom: data.nom || null,
    date_debut: data.date_debut || '1900-01-01',
    date_fin: data.date_fin || null,
    etablissement_siege: {
      siret: data.etablissement_siege?.siret || 'fake_siret',
      geo_adresse: data.etablissement_siege?.geo_adresse || 'fake address',
    },
  };
}

describe('BusinessCard', () => {
  test('renders first and last name for individual', () => {
    const info = createBusinessInfo({
      prenom_usuel: 'Albert',
      nom: 'Einstein',
    });
    const { getByText } = render(<BusinessCard info={info} />);
    expect(getByText('Albert Einstein')).toBeInTheDocument();
  });

  test('renders denomination for enterprise', () => {
    const info = createBusinessInfo({
      denomination: 'Naturalia',
    });
    const { getByText } = render(<BusinessCard info={info} />);
    expect(getByText('Naturalia')).toBeInTheDocument();
  });

  test('renders formatted SIRET', () => {
    const info = createBusinessInfo({
      etablissement_siege: {
        siret: '1234567890010',
      },
    });
    const { getByText } = render(<BusinessCard info={info} />);
    expect(getByText('SIRET: 123 456 789 0010')).toBeInTheDocument();
  });

  test('renders start date', () => {
    const info = createBusinessInfo({
      date_debut: '2000-04-19',
    });
    const { getByText } = render(<BusinessCard info={info} />);
    expect(getByText('2000-04-19 - present')).toBeInTheDocument();
  });

  test('renders end date when applicable', () => {
    const info = createBusinessInfo({
      date_debut: '2000-04-19',
      date_fin: '2020-12-31',
    });
    const { getByText } = render(<BusinessCard info={info} />);
    expect(getByText('2000-04-19 - 2020-12-31')).toBeInTheDocument();
  });

  test('renders link to google maps for address', () => {
    const info = createBusinessInfo({
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
