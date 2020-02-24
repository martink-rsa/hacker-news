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
    itemID,
    itemUrl,
    itemTitle,
    date,
    points,
    author,
    comments,
    isStory,
    differentBG,
  } = props;
  return (
    <ListItem
      disableGutters
      className={differentBG ? `${classes.even} ${classes.root}` : classes.root}
    >
      <ListItemAvatar>
        <Avatar>{isStory ? <DescriptionIcon /> : <ChatIcon />}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <>
            <Typography noWrap>
              <Link href={itemUrl} color="textPrimary">
                {itemTitle}
              </Link>
            </Typography>
          </>
        }
        secondary={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <>
            <Link
              color="textSecondary"
              href={`https://news.ycombinator.com/item?id=${itemID}`}
            >
              {`${date} - `}
            </Link>
            {isStory === true ? (
              <Link
                color="textSecondary"
                href={`https://news.ycombinator.com/item?id=${itemID}`}
              >
                {points === null ? '0' : `${points}`}
                {points === 1 ? ' point - ' : ' points - '}
              </Link>
            ) : null}
            <Link
              color="textSecondary"
              href={`https://news.ycombinator.com/user?id=${author}`}
            >
              {author}
            </Link>
            {isStory === true ? (
              <Link
                color="textSecondary"
                href={`https://news.ycombinator.com/item?id=${itemID}`}
              >
                {comments === null
                  ? ' - 0 comments - '
                  : ` - ${comments} comments`}
              </Link>
            ) : null}
          </>
        }
      />
    </ListItem>
  );
}

ArticleItem.defaultProps = {
  points: null,
  comments: null,
};

ArticleItem.propTypes = {
  itemID: PropTypes.string.isRequired,
  itemUrl: PropTypes.string.isRequired,
  itemTitle: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  points: PropTypes.number,
  author: PropTypes.string.isRequired,
  comments: PropTypes.number,
  isStory: PropTypes.bool.isRequired,
  differentBG: PropTypes.bool.isRequired,
};
