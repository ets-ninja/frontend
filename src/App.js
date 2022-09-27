import * as Sentry from '@sentry/react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register';
import RestorePassword from './pages/RestorePassword';
import MyJars from './pages/MyJars';
import Wishlist from './pages/Wishlist';
import SavingsSchemes from './pages/SavingsSchemes';
import Settings from './pages/Settings';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route exect element={<Login />} path="/login" />
        <Route exect element={<Register />} path="/register" />
        <Route exect element={<RestorePassword />} path="/restorepassword" />
        <Route
          exect
          element={<ProtectedRoute component={Profile} />}
          path="/profile"
        />
        <Route
          exect
          element={<ProtectedRoute component={MyJars} />}
          path="/myjars"
        />
        <Route
          exect
          element={<ProtectedRoute component={Wishlist} />}
          path="/wishlist"
        />
        <Route
          exect
          element={<ProtectedRoute component={SavingsSchemes} />}
          path="/savingsschemes"
        />
        <Route
          exect
          element={<ProtectedRoute component={Settings} />}
          path="/settings"
        />
      </Routes>
    </div>
  );
};

export default Sentry.withProfiler(App);
