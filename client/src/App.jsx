import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UserPage from './pages/UserPage';
import TaskPage from './pages/TaskPage';

function App () {
  const [activePage, setActivePage] = useState('users');
  const togglePage = () => {
    setActivePage(prevPage => (prevPage === 'users' ? 'tasks' : 'users'));
  };

  return (
    <Router>
      <nav>
        <button onClick={togglePage}>
          {activePage === 'users'
            ? 'Перейти до Тасків'
            : 'Перейти до Користувачів'}
        </button>
      </nav>
      <Routes>
        <Route
          path='/users'
          element={activePage === 'users' ? <UserPage /> : <TaskPage />}
        />
        <Route
          path='/tasks'
          element={activePage === 'tasks' ? <TaskPage /> : <UserPage />}
        />
        <Route path='/users/:userId/tasks' element={<TaskPage />} />
      </Routes>
    </Router>
  );
}

export default App;
