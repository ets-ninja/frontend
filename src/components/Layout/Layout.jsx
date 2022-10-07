import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import ErrorMessage from '../UIElements/ErrorMessage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5299D3',
      dark: '#111D4A',
    },
    secondary: {
      main: '#FBB13C',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  colors: {
    white: '#FCFCFC',
    dark: '#1F2232',
    yellow: '#FBB13C',
    blue: '#5299D3',
    darkBlue: '#111D4A',
  },
  typography: {
    fontFamily: [
      'Ubuntu',
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h3: {
      fontFamily: 'Ubuntu',
      fontWeight: 500,
      fontSize: 24,
      flexGrow: 1,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
            @font-face {
              font-family: 'Ubuntu';
              font-style: normal;
              font-display: swap;
              font-weight: 700;
              src: url('https://fonts.googleapis.com/css?family=Ubuntu');
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            }
          `,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      smd: 768,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const Layout = props => {
  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
          <link
            href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap"
            rel="stylesheet"
          ></link>
          <ErrorMessage />
          <Header />
          <main style={{ backgroundColor: 'white' }}>{props.children}</main>
          <Footer />
        </ThemeProvider>
      </Router>
    </>
  );
};

export default Layout;
