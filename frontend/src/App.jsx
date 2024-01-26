// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import AdminHome from './Pages/Admin/AdminHome'
import TasksPage from './Pages/Tasks/Tasks.jsx'

const App = () => {

  return (
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/admin' element={<AdminHome />} />
        <Route path='/tasks' element={<TasksPage />} />
    </Routes>
  );
};

export default App;
