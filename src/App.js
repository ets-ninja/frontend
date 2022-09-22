import * as Sentry from "@sentry/react";
import "./App.css";

const App = () => {
    return (
        <div className="App">
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
