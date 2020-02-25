/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// MUI
import List from '@material-ui/core/List';
// Components
import ArticleItem from '../ArticleItem/ArticleItem';

export default function ArticleList(props) {
  const { data, pages } = props;
  return (
    <List>
      {data.hits.map((item, index) => (
        <ArticleItem
          key={`sto-${Math.random() * 999}-${Math.random() * 999}`}
          index={pages.current * pages.hitsPerPage + (index + 1)}
          itemID={item.objectID}
          itemUrl={
            item._tags[0] === 'story'
              ? item.url
              : `https://news.ycombinator.com/item?id=${item.objectID}`
          }
          itemTitle={item._tags[0] === 'story' ? item.title : item.comment_text}
          date={moment(item.created_at).fromNow()}
          points={item.points}
          author={item.author}
          comments={item.num_comments}
          isStory={item._tags[0] === 'story'}
          differentBG={index % 2 === 0}
        />
      ))}
    </List>
  );
}

ArticleList.propTypes = {
  data: PropTypes.shape({
    hits: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};
