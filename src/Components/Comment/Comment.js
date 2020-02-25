import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from 'react-html-parser';
// MUI
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ChatIcon from '@material-ui/icons/Chat';
import DescriptionIcon from '@material-ui/icons/Description';
const he = require('he');

const useStyles = makeStyles(() => ({
  root: {
    padding: '0 5px',
  },
  even: {
    background: 'rgba(0, 0, 0, 0.07)',
  },
}));

export default function Comment(props) {
  const classes = useStyles();
  const { index, differentBG } = props;
  const {
    objecID: id,
    url,
    title,
    date,
    points,
    author,
    num_comments: numComments,
    comment_text: comment,
    story_id: storyID,
    story_title: storyTitle,
    story_url: storyUrl,
  } = props.HNObj;

  const [showMore, setShowMore] = useState(false);

  const regexUrl = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/gim;
  // id={item.objectID}
  // url={
  //   item._tags[0] === 'story'
  //     ? item.url
  //     : `https://news.ycombinator.com/item?id=${item.objectID}`
  // }
  // title={
  //   item._tags[0] === 'story' ? item.title : item.comment_text
  // }
  // date={moment(item.created_at).fromNow()}
  // points={item.points}
  // author={item.author}
  // comments={item.num_comments}
  // isStory={item._tags[0] === 'story'}

  function transform(node, index) {
    if (node.type === 'tag' && node.name === 'pre') {
      return null;
    }
  }

  const parseOptions = {
    decodeEntities: true,
    transform: transform,
  };

  return (
    <ListItem
      disableGutters
      className={differentBG ? `${classes.even} ${classes.root}` : classes.root}
    >
      {index}
      <ListItemText
        primary={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <>
            <Typography noWrap>
              <Link
                href={`https://news.ycombinator.com/item?id=${storyID}`}
                color="textPrimary"
              >
                [Thread]
              </Link>
              <Link href={storyUrl} color="textSecondary">
                [Source] {storyTitle}
              </Link>
            </Typography>
          </>
        }
        secondary={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <>
            <Box>{ReactHtmlParser(comment, parseOptions)}</Box>
            {/* <Box>{he.decode(comment)}</Box> */}
            <Link
              color="textSecondary"
              href={`https://news.ycombinator.com/item?id=${storyID}`}
            >
              {`${moment(date).fromNow()} - `}
            </Link>
            <Link
              color="textSecondary"
              href={`https://news.ycombinator.com/item?id=${storyID}`}
            >
              {points === null ? '0' : `${points}`}
              {points === 1 ? ' point - ' : ' points - '}
            </Link>
            <Link
              color="textSecondary"
              href={`https://news.ycombinator.com/user?id=${author}`}
            >
              {author}
            </Link>
            <Link
              color="textSecondary"
              href={`https://news.ycombinator.com/item?id=${storyID}`}
            >
              {numComments === null
                ? ' - 0 comments - '
                : ` - ${numComments} comments`}
            </Link>
          </>
        }
      />
    </ListItem>
  );
}

Comment.defaultProps = {
  /*   points: null,
  comments: null, */
};

Comment.propTypes = {
  /*   id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  points: PropTypes.number,
  author: PropTypes.string.isRequired,
  comments: PropTypes.number,
  isStory: PropTypes.bool.isRequired,
  differentBG: PropTypes.bool.isRequired, */
};
