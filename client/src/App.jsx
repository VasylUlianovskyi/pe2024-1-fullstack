import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import styles from './App.module.sass';
import UserPage from './pages/UserPage';
import TaskPage from './pages/TaskPage';

function App () {
  let location = useLocation();

  return (
    <>
      <div className={styles.app}>
        <nav>
          {location.pathname === '/users' ? (
            <Link to='/tasks'>Switch to Tasks</Link>
          ) : (
            <Link to='/users'>Switch to Users</Link>
          )}
        </nav>
        <Routes>
          <Route path='/users' element={<UserPage />} />
          <Route path='/tasks' element={<TaskPage />} />
          <Route path='/users/:userId/tasks' element={<UserPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
