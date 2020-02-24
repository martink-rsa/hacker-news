import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  formBtn: {
    marginTop: theme.spacing(2),
  },
}));

export default function SearchInput(props) {
  const classes = useStyles();
  const { doFetch, query, setQuery } = props;

  return (
    <form
      className={classes.form}
      noValidate
      autoComplete="off"
      onSubmit={event => {
        doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`);
        event.preventDefault();
      }}
    >
      <FormControl>
        <InputLabel htmlFor="component-simple">Search Term</InputLabel>
        <Input
          id="component-simple"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
      </FormControl>
      <Button type="submit" variant="contained" className={classes.formBtn}>
        Search
      </Button>
    </form>
  );
}

SearchInput.propTypes = {
  doFetch: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};
