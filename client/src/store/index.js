import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import taskReducer from './slices/taskSlice';

const store = configureStore({
  reducer: {
    usersData: usersReducer,
    tasksData: taskReducer,
  },
});

export default store;
