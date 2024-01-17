import React from 'react';
import LoginForm from '../components/Login/LoginForm.jsx';

const LoginPage = ({ onLogin }) => {
  return (
      <LoginForm onLogin={onLogin} />
  );
};

export default LoginPage;
