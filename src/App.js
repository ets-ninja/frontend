import * as Sentry from '@sentry/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import RestorePassword from './pages/RestorePassword';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exect element={<Login />} path="/login" />
          <Route exect element={<Register />} path="/register" />
          <Route exect element={<RestorePassword />} path="/restorepassword" />
          <Route exect element={<Profile />} path="/profile" />
        </Routes>
      </Router>
    </div>
  );
};

export default Sentry.withProfiler(App);
