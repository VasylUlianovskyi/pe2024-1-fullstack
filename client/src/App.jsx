import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './App.module.sass';
import UserPage from './pages/UserPage';
import TaskPage from './pages/TaskPage';

function App () {
  const [activePage, setActivePage] = useState('users');
  const togglePage = () => {
    setActivePage(prevPage => (prevPage === 'users' ? 'tasks' : 'users'));
  };

  return (
    <Router>
      <div className={styles.app}>
        <nav>
          <button onClick={togglePage}>
            {activePage === 'users' ? 'Switch to Tasks' : 'Switsh to Users'}
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
      </div>
    </Router>
  );
}

export default App;
