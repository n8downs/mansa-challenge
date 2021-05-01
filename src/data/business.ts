export type BusinessInfo = {
  id: number;
  siren: string;
  denomination: string | null;
  prenom_usuel: string | null;
  nom: string | null;
  date_debut: string;
  date_fin: string | null;
  etablissement_siege: {
    siret: string;
    geo_adresse: string;
  };
};

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

export function createFakeBusinessInfo(data: FakeBusinessInfo): BusinessInfo {
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
