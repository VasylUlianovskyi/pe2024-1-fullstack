import React, { useEffect, useState } from 'react';
import { getTasks, updateTask, deleteTask } from './../../api';

const TaskList = ({ onTaskUpdated }) => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTaskList(data);
    };
    fetchTasks();
  }, [onTaskUpdated]);

  const handleCheckboxChange = async (id, isDone) => {
    await updateTask(id, { isDone: !isDone });
    onTaskUpdated();
  };

  const handleDelete = async id => {
    await deleteTask(id);
    onTaskUpdated();
  };

  return (
    <ul>
      {taskList.map(task => (
        <li key={task.id}>
          <input
            type='checkbox'
            checked={task.isDone}
            onChange={() => handleCheckboxChange(task.id, task.isDone)}
          />
          {task.description} - {task.deadline}
          <button onClick={() => handleDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
