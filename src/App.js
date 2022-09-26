import * as Sentry from "@sentry/react";
import { useEffect, useState } from "react";
import "./App.css";
import IntroPage from "./pages/IntoPage/IntroPage";

const App = () => {

    let notFirstTime = localStorage.getItem('notFirstTime?')

    return (
        <div className="App" style={{ minHeight: '100vh', paddingTop: '0px'}}>

        {/* check */}
        {!notFirstTime ? <IntroPage /> : <h2 style={{paddingTop: '20px'}}> Not your first page <button onClick={()=> {localStorage.removeItem('notFirstTime?')
        window.location.reload();}}>remove from localStorage</button></h2> }
            
        </div>
    );
};

export default Sentry.withProfiler(App);
