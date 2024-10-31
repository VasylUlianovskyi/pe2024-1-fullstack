import axios from 'axios';

const httpClient = axios.create({ baseURL: 'http://localhost:5000/api' });

export const createUser = body => httpClient.post('/users', body);

export const getUsers = () => httpClient.get('/users');

export const removeUser = id => httpClient.delete(`/users/${id}`);

export const fetchUsers = async () => {
  try {
    const usersData = await getUsers();
    console.log('Fetched users:', usersData);
    if (Array.isArray(usersData.data)) {
      setUsers(usersData.data);
    } else {
      console.error('Fetched data is not an array:', usersData);
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

export const fetchTasks = async isDone => {
  const query = isDone !== undefined ? `?isDone=${isDone}` : '';
  const response = await fetch(`/api/tasks${query}`);
  if (!response.ok) throw new Error('Не вдалося завантажити таски');
  console.log(data);
  return response.json();
};

export const createTask = body => httpClient.post('/tasks', body);

export const getTasks = () => httpClient.get('/tasks');

export const updateTask = (id, body) => httpClient.patch(`/tasks/${id}`, body);

export const removeTask = id => httpClient.delete(`/tasks/${id}`);
