// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (username) => {
    // Perform any additional login logic here
    setLoggedInUser(username);
  };

  return (
    <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
    </Routes>
  );
};

export default App;
