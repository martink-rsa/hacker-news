import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import moment from 'moment';
// MUI
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(() => ({
  even: {
    background: 'rgba(0, 0, 0, 0.07)',
  },
}));

export default function ArticleList(props) {
  const classes = useStyles();
  const { data } = props;
  return (
    <List>
      {data.hits.map((item, index) => (
        <ListItem
          key={`sto-${Math.random() * 999}-${Math.random() * 999}`}
          className={index % 2 === 0 ? classes.even : null}
        >
          <ListItemText
            primary={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <>
                <Typography noWrap>
                  <Link href={item.url} color="textPrimary">
                    {item.title === null ? 'No title' : item.title}
                  </Link>
                </Typography>
              </>
            }
            secondary={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <>
                <Link
                  color="textSecondary"
                  href={`https://news.ycombinator.com/item?id=${item.objectID}`}
                >
                  {moment(item.created_at).fromNow()}
                </Link>
                {' - '}
                <Link
                  color="textSecondary"
                  href={`https://news.ycombinator.com/item?id=${item.objectID}`}
                >
                  {`${item.points} points`}
                </Link>
                {' - '}
                <Link
                  color="textSecondary"
                  href={`https://news.ycombinator.com/user?id=${item.author}`}
                >
                  {item.author}
                </Link>
                {' - '}
                <Link
                  color="textSecondary"
                  href={`https://news.ycombinator.com/item?id=${item.objectID}`}
                >
                  {item.num_comments === null
                    ? '0 comments'
                    : `${item.num_comments} comments`}
                </Link>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

ArticleList.propTypes = {
  data: PropTypes.shape({
    hits: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};
