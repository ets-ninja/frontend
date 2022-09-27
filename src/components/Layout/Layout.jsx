import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import IntroPage from '../../pages/IntoPage/IntroPage';

const Layout = props => {

  
  let notFirstTime = localStorage.getItem('notFirstTime?');

  return (
    <>
      <Router>
        {!notFirstTime ? (
          <IntroPage />
        ) : (
          <>
            <Header />
            <main>{props.children}</main>
            <Footer />
          </>
        )}
      </Router>
    </>
  );
};

export default Layout;
