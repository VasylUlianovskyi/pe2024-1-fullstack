import React, { useState, useEffect } from 'react';
import TaskForm from './../../components/forms/TaskForm';
import TaskList from './../../components/TaskList';
import { fetchTasks } from './../../api/index.js';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await fetchTasks(filter);
        setTasks(tasks);
      } catch (error) {
        console.error(error);
      }
    };
    loadTasks();
  }, [filter]);

  return (
    <div>
      <h1>Сторінка тасок</h1>
      <TaskForm />
      <TaskList
        tasks={tasks} /* передати пропси для зміни статусу та видалення */
      />
      <button onClick={() => setFilter(true)}>Показати виконані</button>
      <button onClick={() => setFilter(false)}>Показати невиконані</button>
    </div>
  );
};

export default TaskPage;
