import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createTask } from '../../../api'; // Adjust as needed;
import { getUsers } from '../../../api'; // Adjust as needed

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
        const usersData = await getUsers(); // Отримайте дані про користувачів
        setUsers(usersData); // Збережіть дані у стані
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

    await createTask(newTask); // Adjust API call as needed
    onTaskAdded();
    formikBag.resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={initialValues.description}
        onChange={e => setDescription(e.target.value)}
        placeholder='Опис таски'
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
        <option value=''>Виберіть користувача</option>
        {Array.isArray(users) &&
          users.map(user => (
            <option key={user.id} value={user.id}>
              {user.nickname} ({user.id})
            </option>
          ))}
      </select>
      <button type='submit'>Додати таску</button>
    </form>
  );
};

const mapDispatchToProps = dispatch => ({
  // Define your dispatch actions here if needed
});

export default connect(null, mapDispatchToProps)(TaskForm);
