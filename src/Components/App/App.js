import React, { useState, useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Axios from 'axios';
/* MUI */
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
/* Components */
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

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, isError: false };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error();
  }
};

const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const result = await Axios(url);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE' });
      }
    };
    fetchData();
  }, [url]);

  return [state, setUrl];
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
