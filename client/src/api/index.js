import axios from 'axios';

const httpClient = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getUsers = () => httpClient.get('/users');

export const removeUser = id => httpClient.delete(`/users/${id}`);
