import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
// MUI
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ChatIcon from '@material-ui/icons/Chat';
import DescriptionIcon from '@material-ui/icons/Description';

const useStyles = makeStyles(() => ({
  root: {
    padding: '0 5px',
  },
  even: {
    background: 'rgba(0, 0, 0, 0.07)',
  },
}));

export default function ArticleItem(props) {
  const classes = useStyles();
  const {
    index,
    itemID,
    itemUrl,
    itemTitle,
    date,
    points,
    author,
    comments,
    isStory,
    differentBG,
    children,
  } = props;
  const regexUrl = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/gim;

  return (
    <ListItem
      disableGutters
      className={differentBG ? `${classes.even} ${classes.root}` : classes.root}
    >
      {index}
      {children}
    </ListItem>
  );
}

ArticleItem.defaultProps = {
  //
};

ArticleItem.propTypes = {
  //
};
