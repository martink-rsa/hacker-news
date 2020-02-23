import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import './App.css';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
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

export default function App() {
  const classes = useStyles();
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux');
  const [url, setUrl] = useState(
    'https://hn.algolia.com/api/v1/search?query=redux',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await Axios(url);
        setData(result.data);
        console.log(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            HackerNews
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <form
              className={classes.form}
              noValidate
              autoComplete="off"
              onSubmit={event => {
                setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`);
                event.preventDefault();
              }}
            >
              <FormControl>
                <InputLabel htmlFor="component-simple">Name</InputLabel>
                <Input
                  id="component-simple"
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                />
              </FormControl>
              <Button type="submit" variant="contained">
                Search
              </Button>
            </form>
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
                      <List>
                        {data.hits.map((item, index) => (
                          <ListItem
                            key={`sto-${Math.random() * 999}-${Math.random() *
                              999}`}
                            button
                            className={index % 2 === 0 ? classes.even : null}
                          >
                            <ListItemText
                              primary={
                                // eslint-disable-next-line react/jsx-wrap-multilines
                                <>
                                  <Typography color="textPrimary" noWrap>
                                    <a href={item.url}>{item.title}</a>
                                  </Typography>
                                </>
                              }
                              secondary={
                                // eslint-disable-next-line react/jsx-wrap-multilines
                                <>
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                  >
                                    <a
                                      href={`https://news.ycombinator.com/item?id=${item.objectID}`}
                                    >
                                      {`${item.points} points`}
                                    </a>
                                    {' - '}
                                    <a
                                      href={`https://news.ycombinator.com/user?id=${item.author}`}
                                    >
                                      {item.author}
                                    </a>
                                    {' - '}
                                    <a
                                      href={`https://news.ycombinator.com/item?id=${item.objectID}`}
                                    >
                                      {`${item.num_comments} comments`}
                                    </a>
                                  </Typography>
                                </>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
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
