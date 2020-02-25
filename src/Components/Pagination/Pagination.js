import React from 'react';
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
// MUI
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Switch from '@material-ui/core/Switch';
import { Button, Box } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles(() => ({
  root: {
    // flexGrow: 1,
    paddingTop: '16px',
  },
  title: {
    flexGrow: 1,
  },
}));

const PaginationButtonActive = withStyles(theme => ({
  root: {
    minWidth: 'inherit',
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}))(Button);

const PaginationButton = withStyles(theme => ({
  root: {
    minWidth: 'inherit',
  },
}))(Button);

export default function Pagination(props) {
  const classes = useStyles();
  const { nextPage, prevPage, setPage, pages } = props;

  function getPageNumbers(index) {
    const pageArr = [];
    const range = 5;
    let activePage = false;
    if (index < 3) {
      for (let i = 0; i < range; i += 1) {
        activePage = false;
        if (i === index) {
          activePage = true;
        }
        pageArr.push({ value: i + 1, active: activePage });
      }
    } else {
      // Range of numbers with page index in the middle of the range
      // Dynamic solution used so the range of numbers can always be increased
      // Stick to odd numbers for a range so that the current page can be in the middle
      const begin = index - Math.floor(range / 2); // Half of range below index
      const end = index + Math.floor(range / 2); // Half of range above index
      for (let i = begin; i <= end; i += 1) {
        activePage = false;
        if (i === index) {
          activePage = true;
        }
        pageArr.push({ value: i + 1, active: activePage });
      }
    }
    return pageArr;
  }

  return (
    <div className={classes.root}>
      <Button onClick={() => prevPage()}>
        {' '}
        <ChevronLeftIcon />
      </Button>
      {getPageNumbers(pages.current).map(item => {
        let buttonGen;
        if (item.active === true) {
          buttonGen = (
            <PaginationButtonActive>{item.value}</PaginationButtonActive>
          );
        } else {
          buttonGen = (
            <PaginationButton
              className={classes.activePage}
              onClick={() => setPage(item.value - 1)}
            >
              {item.value}
            </PaginationButton>
          );
        }
        return buttonGen;
      })}
      <Button onClick={() => nextPage()}>
        <ChevronRightIcon />
      </Button>
    </div>
  );
}

Pagination.propTypes = {
  /*   title: PropTypes.string.isRequired,
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired, */
};

/* item.active === true ? (
          <PaginationButtonActive onClick={() => setPage(item)}>
            {item.value}
          </PaginationButtonActive>
        ) : (
          <Button className={classes.activePage} onClick={() => setPage(item)}>
            {item.value}
          </Button>
        ), */
