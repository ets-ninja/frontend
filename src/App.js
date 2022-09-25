import * as Sentry from "@sentry/react";
import Profile from "./components/Profile/Profile";

import "./App.css";

const App = () => {
    return (
        <div className="App">
            <Profile />
            <button
                onClick={() => {
                    alert("Hello World");
                }}
            >
                Break the world
            </button>
        </div>
    );
};

export default Sentry.withProfiler(App);
