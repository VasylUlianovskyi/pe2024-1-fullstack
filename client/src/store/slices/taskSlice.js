import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from '../../api';

const TASKS_SLICE_NAME = 'tasks';

const initialState = {
  tasks: [],
  isFetching: false,
  error: null,
};

export const createTaskThunk = createAsyncThunk(
  `${TASKS_SLICE_NAME}/post`,
  async (payload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await API.createTask(payload);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.errors,
      });
    }
  }
);

export const getTasksThunk = createAsyncThunk(
  `${TASKS_SLICE_NAME}/get`,
  async (_, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await API.getTasks();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.errors,
      });
    }
  }
);

export const removeTaskThunk = createAsyncThunk(
  `${TASKS_SLICE_NAME}/delete`,
  async (taskId, thunkAPI) => {
    try {
      await API.removeTask(taskId);
      return taskId;
    } catch (err) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.errors,
      });
    }
  }
);

const tasksSlice = createSlice({
  name: TASKS_SLICE_NAME,
  initialState,
  extraReducers: builder => {
    // create task
    builder.addCase(createTaskThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(createTaskThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.tasks.push(payload);
    });
    builder.addCase(createTaskThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });

    // get tasks
    builder.addCase(getTasksThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getTasksThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.tasks = [...payload];
    });
    builder.addCase(getTasksThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });

    // delete task
    builder.addCase(removeTaskThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(removeTaskThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      const deletedTaskIndex = state.tasks.findIndex(
        task => task.id === payload
      );
      if (deletedTaskIndex !== -1) {
        state.tasks.splice(deletedTaskIndex, 1);
      }
    });
    builder.addCase(removeTaskThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
  },
});

const { reducer } = tasksSlice;

export default reducer;
