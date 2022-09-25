import * as Sentry from "@sentry/react";
import { useEffect, useState } from "react";
import "./App.css";
import IntroPage from "./pages/IntoPage/IntroPage";

const App = () => {

    // let [isFirstTime, setIsFirstTime ] = useState()

    let notFirstTime = localStorage.getItem('notFirstTime?')

    // useEffect(()=>{
    //     setIsFirstTime(localStorage.getItem('isFirstTime') ? localStorage.getItem('isFirstTime') : true)
    // }, [isFirstTime])
    // if (isFirstTime == undefined){ isFirstTime = true}

    return (
        <div className="App" style={{backgroundColor: 'lightblue', minHeight: '100vh', paddingTop: '0px'}}>

        {!notFirstTime ? <IntroPage /> : <h2 style={{paddingTop: '20px'}}> Not your first page <button onClick={()=> {localStorage.removeItem('notFirstTime?')
        window.location.reload();}}>remove from localStorage</button></h2> }
            
        </div>
    );
};

export default Sentry.withProfiler(App);
