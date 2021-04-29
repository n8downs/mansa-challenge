import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import BusinessCard, { BusinessInfo } from '../components/BusinessCard';

type BusinessParams = { siren: string };

type ResponseBody = {
  unite_legale: BusinessInfo;
};

export default function BusinessScreen() {
  const styles = useBusinessScreenStyles();
  const { siren } = useParams<BusinessParams>();

  const [failure, setFailure] = useState<Error>();
  const [response, setResponse] = useState<Response>();
  const [data, setData] = useState<ResponseBody>();

  useEffect(() => {
    fetch(
      `https://entreprise.data.gouv.fr/api/sirene/v3/unites_legales/${siren}`
    ).then(
      (response) => {
        setResponse(response);
        if (response.ok) {
          return response.json().then(setData);
        }
      },
      (error) => {
        setFailure(error);
      }
    );
  }, [siren]);

  if (data) {
    return <BusinessCard info={data.unite_legale} />;
  } else if (failure || (response && !response.ok)) {
    return (
      <Typography>
        There was a problem retrieving business info for {siren}
      </Typography>
    );
  } else {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
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
