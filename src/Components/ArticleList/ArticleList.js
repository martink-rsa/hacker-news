/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// MUI
import List from '@material-ui/core/List';
// Components
import ArticleItem from '../ArticleItem/ArticleItem';
import Story from '../Story/Story';
import Comment from '../Comment/Comment';

export default function ArticleList(props) {
  const { data, pages } = props;
  return (
    <List>
      {data.hits.map((item, index) => {
        if (item._tags[0] === 'story') {
          return (
            <Story
              key={`sto-${Math.random() * 999}-${Math.random() * 999}`}
              index={pages.current * pages.hitsPerPage + (index + 1)}
              HNObj={item}
              differentBG={index % 2 === 0}
            />
          );
        } else if (item._tags[0] === 'comment') {
          return (
            <Comment
              key={`sto-${Math.random() * 999}-${Math.random() * 999}`}
              index={pages.current * pages.hitsPerPage + (index + 1)}
              HNObj={item}
              differentBG={index % 2 === 0}
            />
          );
        }
      })}
    </List>
  );
}

ArticleList.propTypes = {
  data: PropTypes.shape({
    hits: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};
