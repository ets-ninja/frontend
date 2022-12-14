import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import ErrorMessage from '../UIElements/SnackBars/ErrorMessage';
import NotificationToast from '../UIElements/SnackBars/NotificationToast';
import SuccessMessage from '../UIElements/SnackBars/SuccessMessage';
import InfoMessage from '../UIElements/SnackBars/InfoMessage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5299D3',
      dark: '#388acc',
    },
    secondary: {
      main: '#FBB13C',
      dark: '#ffa617',
    },
    danger: {
      main: '#db3c3c',
      dark: '#c73535',
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
      xxs: 400,
      sm: 600,
      smd: 768,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  icon: {
    sortSettings: {
      width: '28px',
      height: '28px',
      px: '3px',
      scale: '1',
      fill: '#000000ab',
      transition: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        cursor: 'pointer',
        fill: theme => theme.colors.yellow,
        transition: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
    sortSettingsActive: {
      width: '28px',
      height: '28px',
      px: '3px',
      scale: '1.2',
      fill: theme => theme.colors.yellow,
      transition: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        cursor: 'pointer',
        transition: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
    grey: {
      fill: 'rgba(0,0,0,0.67)',
    },
    hover: {
      cursor: 'pointer',
      fill: theme => theme.colors.yellow,
      scale: '1.2',
      transition: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
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
          <NotificationToast />
          <ErrorMessage />
          <SuccessMessage />
          <InfoMessage />
          <Header />
          <main style={{ backgroundColor: 'white',  minHeight: '74.9vh' }}>
            {props.children}
          </main>
          <Footer />
        </ThemeProvider>
      </Router>
    </>
  );
};

export default Layout;
