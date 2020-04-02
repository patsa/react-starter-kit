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
import { defineMessages, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import LanguageSwitcher from '../LanguageSwitcher';
import logoUrl from './logo-small.png';
import logoUrl2x from './logo-small@2x.png';

const messages = defineMessages({
  brand: {
    id: 'header.brand',
    defaultMessage: 'Your Company Brand',
    description: 'Brand name displayed in header',
  },
  bannerTitle: {
    id: 'header.banner.title',
    defaultMessage: 'React',
    description: 'Title in page header',
  },
  bannerDesc: {
    id: 'header.banner.desc',
    defaultMessage: 'Complex web apps made easy',
    description: 'Description in header',
  },
});

function Header({ client }) {
  useStyles(s);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <Navigation />
        <Link className={s.brand} to="/">
          <img
            src={logoUrl}
            srcSet={`${logoUrl2x} 2x`}
            width="38"
            height="38"
            alt="React"
          />
          <span className={s.brandTxt}>
            <FormattedMessage {...messages.brand} />
          </span>
        </Link>
        <LanguageSwitcher
          client={client.context}
          store={client.context.store}
        />
        <div className={s.banner}>
          <h1 className={s.bannerTitle}>
            <FormattedMessage {...messages.bannerTitle} />
          </h1>
          <FormattedMessage tagName="p" {...messages.bannerDesc} />
        </div>
      </div>
    </div>
  );
}

export default withApollo(Header);

Header.propTypes = {
  client: PropTypes.object.isRequired,
};
