import React from 'react';
import LoginForm from '../components/Login/LoginForm.jsx';

const LoginPage = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md">
        <LoginForm onLogin={onLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
