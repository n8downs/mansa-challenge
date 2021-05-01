import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import BusinessCard from '../components/BusinessCard';
import { BusinessInfo, BusinessParams } from '../data/business';
import AccountList from '../components/AccountList';
import AccountTransactions from '../components/AccountTransactions';

type ResponseBody = {
  unite_legale: BusinessInfo;
};

export default function BusinessScreen() {
  const styles = useBusinessScreenStyles();
  const { siren, accountId } = useParams<BusinessParams>();

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
    return (
      <Box className={styles.mainContainer}>
        <Box className={styles.drawer}>
          <BusinessCard info={data.unite_legale} />
          <AccountList />
        </Box>
        {accountId && <AccountTransactions accountId={accountId} />}
      </Box>
    );
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
    mainContainer: {
      display: 'flex',
    },
    drawer: {
      marginRight: theme.spacing(2),
    },
    loadingContainer: {
      display: 'flex',
      minHeight: theme.spacing(50),
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);
