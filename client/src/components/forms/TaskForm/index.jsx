import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createTask } from '../../../api';
import { getUsers } from '../../../api';
import styles from './TaskForm.module.sass';

const TaskForm = ({ onTaskAdded }) => {
  const [users, setUsers] = useState([]);

  const initialValues = {
    description: '',
    deadline: '',
    userId: '',
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (values, formikBag) => {
    const newTask = {
      description: values.description,
      deadline: values.deadline,
      isDone: false,
      userId: values.userId,
    };

    await createTask(newTask);
    onTaskAdded();
    formikBag.resetForm();
  };

  return (
    <form className={styles.taskForm} onSubmit={handleSubmit}>
      <input
        type='text'
        value={initialValues.description}
        onChange={e => setDescription(e.target.value)}
        placeholder='Task name'
        required
      />
      <input
        type='text'
        value={initialValues.description}
        onChange={e => setDescription(e.target.value)}
        placeholder='Task description'
        required
      />
      <input
        type='date'
        value={initialValues.deadline}
        onChange={e => setDeadline(e.target.value)}
        required
      />
      <select
        value={initialValues.userId}
        onChange={e => setSelectedUserId(e.target.value)}
        required
      >
        <option value=''>Select User</option>
        {Array.isArray(users) &&
          users.map(user => (
            <option key={user.id} value={user.id}>
              {user.nickname} ({user.id})
            </option>
          ))}
      </select>
      <button type='submit'>Add task</button>
    </form>
  );
};

const mapDispatchToProps = dispatch => ({});

export default connect(null, mapDispatchToProps)(TaskForm);
