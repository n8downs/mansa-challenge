import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { BusinessInfo } from '../data/business';

export default function BusinessCard({ info }: { info: BusinessInfo }) {
  const styles = useBusinessCardStyles();

  const name = info.denomination || `${info.prenom_usuel} ${info.nom}`;
  const mapUrl = `https://www.google.com/maps/place/${info.etablissement_siege.geo_adresse.replace(
    /\s+/g,
    '+'
  )}/`;
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography>
          SIRET: {formatSIRET(info.etablissement_siege.siret)}
        </Typography>
        <Typography
          className={[
            styles.date,
            info.date_fin ? styles.inactive : styles.active,
          ].join(' ')}
        >
          {info.date_debut} - {info.date_fin || 'present'}
        </Typography>
      </CardContent>
      <CardActions>
        <Link target="_blank" rel="noopener" href={mapUrl}>
          {info.etablissement_siege.geo_adresse}
        </Link>
      </CardActions>
    </Card>
  );
}

function formatSIRET(siret: string) {
  return `${siret.slice(0, 3)} ${siret.slice(3, 6)} ${siret.slice(
    6,
    9
  )} ${siret.slice(9)}`;
}

const useBusinessCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    date: {
      width: 'fit-content',
      padding: '0 0.25em',
      borderRadius: '4px',
    },
    active: {
      backgroundColor: theme.palette.success.light,
    },
    inactive: {
      backgroundColor: theme.palette.error.light,
    },
  })
);
