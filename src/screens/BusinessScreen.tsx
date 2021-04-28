import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import BusinessHeader, { BusinessInfo } from '../components/BusinessHeader';

type BusinessParams = { siren: string };

type ResponseBody = {
  unite_legale: BusinessInfo;
};

export default function BusinessScreen() {
  const styles = useBusinessScreenStyles();
  const { siren } = useParams<BusinessParams>();

  const [response, setResponse] = useState<Response>();
  const [data, setData] = useState<ResponseBody>();

  useEffect(() => {
    console.log(fetch);
    fetch(
      `https://entreprise.data.gouv.fr/api/sirene/v3/unites_legales/${siren}`
    )
      .then((response) => {
        setResponse(response);
        return response.json();
      })
      .then((json) => {
        setData(json);
      });
    // TODO: handle fetch failures
  }, [siren]);

  if (!response || !data) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  } else if (!response.ok) {
    return (
      <Typography>
        There was a problem retrieving business info for {siren}
      </Typography>
    );
  } else {
    return <BusinessHeader info={data.unite_legale} />;
  }
}

const useBusinessScreenStyles = makeStyles((theme: Theme) =>
  createStyles({
    loadingContainer: {
      display: 'flex',
      minHeight: '80vh',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);
