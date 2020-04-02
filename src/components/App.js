/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import { IntlProvider } from 'react-intl';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';

const ContextType = {
  // Universal HTTP client
  fetch: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  query: PropTypes.object,
  // Integrate Redux
  // http://redux.js.org/docs/basics/UsageWithReact.html
  ...ReduxProvider.childContextTypes,
  // Apollo Client
  client: PropTypes.object.isRequired,
  // ReactIntl
  intl: IntlProvider.childContextTypes.intl,
  locale: PropTypes.string,
};

/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context} insertCss={() => {}}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */

export default function App({ context, insertCss, children }) {
  // eslint-disable-next-line no-unused-vars
  const childContextTypes = ContextType;

  // eslint-disable-next-line no-unused-vars
  function getChildContext() {
    return context;
  }
  // NOTE: If you need to add or modify header, footer etc. of the app,
  // please do that inside the Layout component.
  return (
    <StyleContext.Provider value={{ insertCss }}>
      <ApolloProvider client={{ context }}>
        {React.Children.only(children)}
      </ApolloProvider>
    </StyleContext.Provider>
  );
}

App.propTypes = {
  context: PropTypes.shape(ContextType).isRequired,
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
