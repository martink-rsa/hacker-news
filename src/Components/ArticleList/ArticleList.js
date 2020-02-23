import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
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
                    {item.num_comments === null
                      ? '0 comments'
                      : `${item.num_comments} comments`}
                  </a>
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}
