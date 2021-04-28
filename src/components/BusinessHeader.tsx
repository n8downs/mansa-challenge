import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export type BusinessInfo = {
  id: number;
  siren: string;
  denomination: string | null;
  prenom_usuel: string | null;
  nom: string | null;
  sexe: 'M' | 'F' | null;
  date_debut: string;
  date_fin: string | null;
  date_dernier_traitement: string;
  activite_principale: string;
  categorie_juridique: string;
  etablissement_siege: {
    siret: string;
    geo_adresse: string;
  };
};

export default function BusinessHeader({ info }: { info: BusinessInfo }) {
  const name = info.denomination || `${info.prenom_usuel} ${info.nom}`;
  const mapUrl = `https://www.google.com/maps/place/${encodeURIComponent(
    info.etablissement_siege.geo_adresse.replace(/\ /g, '+')
  )}/`;
  return (
    <Box>
      <Typography variant="h5">{name}</Typography>
      <Typography>({formatSIRET(info.etablissement_siege.siret)})</Typography>
      <Typography>
        {info.date_debut} - {info.date_fin}
      </Typography>
      <Typography>
        {info.activite_principale} | {info.categorie_juridique}
      </Typography>
      <Link target="_blank" rel="noopener" href={mapUrl}>
        {info.etablissement_siege.geo_adresse}
      </Link>
    </Box>
  );
}

function formatSIRET(siret: string) {
  return `${siret.slice(0, 3)} ${siret.slice(3, 6)} ${siret.slice(
    6,
    9
  )} ${siret.slice(9)}`;
}
