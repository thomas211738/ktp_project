
import React, { useState } from 'react';
import KTPLogo from '../../images/KTPLogo.jpeg';
import googleLogo from "../..//images/google-logo.png";


const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform authentication logic here (e.g., API call, validation)
    // For simplicity, just check if both fields are filled
    if (username && password) {
      onLogin(username);
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img className="w-11 h-11 mr-2 overflow-hidden rounded-full" src={KTPLogo} alt="logo"></img>
              KAPPA THETA PI    
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <button type="submit" className="w-full flex items-center justify-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  <img src={googleLogo} alt="Google Logo" className="h-6 w-6 mr-2" />
                  Sign In with Google
                </button>


              </div>
          </div>
      </div>
    </section>
  );
};

export default LoginForm;
