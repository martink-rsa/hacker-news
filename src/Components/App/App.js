import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Container from '@material-ui/core/Container';
// import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';

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
    color: theme.palette.text.secondary,
  },
  inline: {
    fontSize: '12px',
  },
  even: {
    background: 'rgba(0, 0, 0, 0.07)',
  },
}));

/*
$.ajax('http://opengraph.io/api/1.0/site/http%3A%2F%2Fwww.washingtontimes.com%2F')
  .done(function(data){
    console.log(data);
  });
  */

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await Axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};

export default function App() {
  const classes = useStyles();
  const [query, setQuery] = useState('redux');

  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    'https://hn.algolia.com/api/v1/search?query=redux',
    {
      hits: [],
    },
  );

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Header title="HackerNews" />
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <SearchInput doFetch={doFetch} query={query} setQuery={setQuery} />
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
  );
}
