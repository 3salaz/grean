import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Redirect them to the login page, but save the current location they were
    // trying to go to (you can modify this to redirect to a custom login page)
    return <useHistory to="/" />;
  }

  return children;
}

export default ProtectedRoute;
