import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createTask } from '../../../api';
import { getUsers } from '../../../api';
import styles from './TaskForm.module.sass';

const TaskForm = ({ onTaskAdded }) => {
  const [users, setUsers] = useState([]);
  const [taskData, setTaskData] = useState({
    body: '',
    deadline: '',
    userId: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    const newTask = {
      body: taskData.body,
      deadline: taskData.deadline,
      isDone: false,
      userId: taskData.userId,
    };

    try {
      await createTask(newTask);
      onTaskAdded();
      setTaskData({ body: '', deadline: '', userId: '' });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setTaskData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form className={styles.taskForm} onSubmit={handleSubmit}>
      <input
        type='text'
        name='body'
        value={taskData.body}
        onChange={handleChange}
        placeholder='Task name'
        required
      />
      <input
        type='date'
        name='deadline'
        value={taskData.deadline}
        onChange={handleChange}
        required
      />
      <select
        name='userId'
        value={taskData.userId}
        onChange={handleChange}
        required
      >
        <option value=''>Select User</option>
        {Array.isArray(users) && users.length > 0 ? (
          users.map(user => (
            <option key={user.id} value={user.id}>
              {user.nickname} ({user.id})
            </option>
          ))
        ) : (
          <option disabled>No users available</option>
        )}
      </select>
      <button type='submit'>Add task</button>
    </form>
  );
};

const mapDispatchToProps = dispatch => ({});

export default connect(null, mapDispatchToProps)(TaskForm);
