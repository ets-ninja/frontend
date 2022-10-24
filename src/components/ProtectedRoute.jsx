import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component }) => {
  const { isLoggedIn } = useSelector(state => state.auth);
  return isLoggedIn ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
