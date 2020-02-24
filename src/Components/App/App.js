import React, { useState } from 'react';
import './App.css';
/* MUI */
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { blueGrey, grey } from '@material-ui/core/colors';
/* Components and Modules */
import useDataApi from '../../useDataApi';
import Header from '../Header/Header';
import SearchInput from '../SearchInput/SearchInput';
import ArticleList from '../ArticleList/ArticleList';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
  },
  inline: {
    fontSize: '12px',
  },
}));

/*
$.ajax('http://opengraph.io/api/1.0/site/http%3A%2F%2Fwww.washingtontimes.com%2F')
  .done(function(data){
    console.log(data);
  });
  */

export default function App() {
  const classes = useStyles();
  const [query, setQuery] = useState('React');
  const [darkMode, setDarkMode] = useState(false);

  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    'https://hn.algolia.com/api/v1/search?query=React',
    {
      hits: [],
    },
  );

  const theme = React.useMemo(
    () =>
      // eslint-disable-next-line implicit-arrow-linebreak
      createMuiTheme({
        palette: {
          type: darkMode ? 'dark' : 'light',
          primary: blueGrey,
          secondary: grey,
          contrastThreshold: 3,
          // tonalOffset: 0.2,
          background: {
            default: darkMode ? '#000' : '#313C4C',
          },
        },
        overrides: {
          MuiPaper: {
            root: {
              // padding: '0px 20px',
              // margin: '20px 0',
              // backgroundColor: 'rgb(247, 249, 248)', // 5d737e
            },
          },
          MuiButton: {
            root: {
              margin: '5px',
            },
          },
        },
      }),
    [darkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        title="HackerNews"
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {null}
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <SearchInput
                doFetch={doFetch}
                query={query}
                setQuery={setQuery}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {isError && <div>Error searching for your query</div>}
              {isLoading ? (
                <div>LOADING...</div>
              ) : (
                <div>
                  <Typography variant="h6" align="center">
                    Results
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <div className={classes.demo}>
                        <ArticleList data={data} />
                      </div>
                    </Grid>
                  </Grid>
                </div>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
