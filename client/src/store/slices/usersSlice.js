import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from '../../api';

const USERS_SLICE_NAME = 'users';

const initialState = {
  users: [],
  isFetching: false,
  error: null,
};

export const getUsersThunk = createAsyncThunk(
  `${USERS_SLICE_NAME}/get`,
  async (payload, thunkAPI) => {
    try {
      const data = await API.getUsers();
      console.log(data);
    } catch (err) {
      return thunkAPI.rejectWithValue({});
    }
  }
);

const usersSlice = createSlice({
  name: USERS_SLICE_NAME,
  initialState,
});

const { reducer } = usersSlice;

export default reducer;
