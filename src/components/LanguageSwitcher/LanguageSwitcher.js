/* eslint-disable no-shadow */

import React from 'react';
import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import { connect } from 'react-redux';
import { setLocale } from '../../actions/intl';
import s from './LanguageSwitcher.css';

const localeDict = {
  /* @intl-code-template '${lang}-${COUNTRY}': '${Name}', */
  'en-US': 'English',
  'cs-CZ': 'Česky',
  /* @intl-code-template-end */
};

function LanguageSwitcher({ currentLocale, availableLocales, setLocale }) {
  const isSelected = locale => locale === currentLocale;
  const localeName = locale => localeDict[locale] || locale;
  useStyles(s);

  return (
    <div className={s.root}>
      {availableLocales.map(locale => (
        <span key={locale}>
          {isSelected(locale) ? (
            <span>{localeName(locale)}</span>
          ) : (
            <a
              href={`?lang=${locale}`}
              onClick={e => {
                setLocale({ locale });
                e.preventDefault();
              }}
            >
              {localeName(locale)}
            </a>
          )}{' '}
        </span>
      ))}
    </div>
  );
}

const mapState = state => ({
  availableLocales: state.runtime.availableLocales,
  currentLocale: state.intl.locale,
});

const mapDispatch = {
  setLocale,
};

LanguageSwitcher.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  availableLocales: PropTypes.arrayOf(PropTypes.string).isRequired,
  setLocale: PropTypes.func.isRequired,
};

export default connect(mapState, mapDispatch)(LanguageSwitcher);
