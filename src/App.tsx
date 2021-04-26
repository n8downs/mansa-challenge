import Header from './components/Header';
import { Switch, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import HomeScreen from './screens/HomeScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export default function App() {
  const styles = useStyles();

  return (
    <>
      <Header />
      <Container className={styles.container}>
        <Switch>
          <Route exact path="/">
            <HomeScreen />
          </Route>
          <Route path="*">
            <NotFoundScreen />
          </Route>
        </Switch>
      </Container>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(1),
    },
  })
);
