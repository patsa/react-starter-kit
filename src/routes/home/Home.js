/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import useStyles from 'isomorphic-style-loader/useStyles';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedRelative } from 'react-intl';
import s from './Home.css';

function Home({ loading, news }) {
  useStyles(s);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>React.js News</h1>
        {loading !== false
          ? 'Loading...'
          : news.map(item => (
              <article key={item.link} className={s.newsItem}>
                <h1 className={s.newsTitle}>
                  <a href={item.link}>{item.title}</a>
                </h1>{' '}
                <span className={s.publishedDate}>
                  <FormattedRelative value={item.pubDate} />
                </span>
                <div
                  className={s.newsDesc}
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </article>
            ))}
      </div>
    </div>
  );
}

Home.propTypes = {
  loading: PropTypes.bool.isRequired,
  news: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      content: PropTypes.string,
    }),
  ),
};

Home.defaultProps = {
  news: [],
};

export default Home;
