import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import ErrorMessage from '../UIElements/ErrorMessage';

const Layout = props => {
  return (
    <>
      <Router>
        <Header />
        <ErrorMessage />
        <main>{props.children}</main>
        <Footer />
      </Router>
    </>
  );
};

export default Layout;
