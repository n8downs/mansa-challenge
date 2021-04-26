import { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AccountBalance from '@material-ui/icons/AccountBalance';

export default function Header() {
  const [query, setQuery] = useState<string>('');
  const styles = useHeaderStyles();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(query);
  }

  return (
    <Box className={styles.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton component={Link} to="/" aria-label="Home" edge="start">
            <AccountBalance />
          </IconButton>
          <Box className={styles.filler} />
          <form onSubmit={handleSubmit}>
            <FormControl margin="normal" hiddenLabel>
              <FilledInput
                startAdornment={
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                }
                placeholder="SIREN"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </FormControl>
          </form>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const useHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    filler: {
      flexGrow: 1,
    },
  })
);
