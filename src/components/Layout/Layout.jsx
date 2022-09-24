import React from "react";
import { BrowserRouter as Router } from "react-router-dom"
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Layout = (props) => {
    return (
        <>
            <Router>
                <link href='https://fonts.googleapis.com/css?family=Ubuntu' rel='stylesheet'></link>

                <Header />
                <main style={{ backgroundColor: "white" }}>{props.children}</main>
                <Footer/>
            </Router>
        </>
    )
}

export default Layout;
