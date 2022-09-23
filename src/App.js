import * as Sentry from "@sentry/react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Basket from "./pages/Basket";

const App = () => {
    return (
        <div className="App">

            <Routes>
                <Route path="/" element={<Dashboard/>} />
                <Route path="/basket/:basket" element={<Basket/>}/>
            </Routes>
        </div>
    );
};

export default Sentry.withProfiler(App);
