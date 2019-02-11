/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Cookies from 'universal-cookie';
import routes from '../../routing';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;
const cookies = new Cookies();
const themeDark = cookies.get('theme');

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: String(themeDark) === 'true' ? 'dark' : 'light',
  },
});

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <AppWrapper>
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
          defaultTitle="React.js Boilerplate"
        >
          <meta
            name="description"
            content="A React.js Boilerplate application"
          />
        </Helmet>
        {routes()}
        <GlobalStyle />
      </AppWrapper>
    </MuiThemeProvider>
  );
}
