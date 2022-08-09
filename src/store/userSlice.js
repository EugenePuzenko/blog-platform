import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from './articleSlice';

export const fetchCreateUser = createAsyncThunk(
  'user/fetchCreateUser',
  // eslint-disable-next-line no-unused-vars
  async ({ username, email, password }, { _, rejectWithValue }) => {
    return axios
      .post(
        `${BASE_URL}users`,
        {
          user: {
            username,
            email,
            password,
          },
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then(({ data }) => data.user)
      .catch((err) => {
        return rejectWithValue({
          status: err.response.status,
          statusText: err?.response?.data?.errors?.message,
        });
      });
  }
);

export const fetchGetCurrentUser = createAsyncThunk(
  'user/fetchGetCurrentUser',
  // eslint-disable-next-line no-unused-vars, no-empty-pattern
  async (token, { _, rejectWithValue }) => {
    return axios
      .get(`${BASE_URL}user`, {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `Token ${token}`,
        },
      })
      .then(({ data }) => data.user)
      .catch((err) => {
        return rejectWithValue({
          status: err.response.status,
          statusText: err?.response?.data?.errors?.message,
        });
      });
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    email: '',
    bio: '',
    image: '',
    userRequestStatus: null,
    errorUserServer: null,
    userIsEdit: false,
    isLoggedIn: false,
  },
  reducers: {
    logOut(state) {
      localStorage.removeItem('token');
      state.username = '';
      state.email = '';
      state.bio = '';
      state.image = '';
      state.userRequestStatus = null;
      state.errorUserServer = null;
      state.userIsEdit = false;
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    // [fetchCreateUser.pending]: (state, action) => {
    // console.log(state, action.payload);
    // },
    [fetchCreateUser.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.userRequestStatus = 'fulfilled';
      const { username, email, token } = action.payload;
      localStorage.setItem('token', token);
      state.username = username;
      state.email = email;
    },
    [fetchCreateUser.rejected]: (state, action) => {
      state.userRequestStatus = 'rejected';
      state.errorUserServer = action.payload;
    },

    // [fetchGetCurrentUser.pending]: (state, action) => {
    //   console.log(action.payload);
    // },
    [fetchGetCurrentUser.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.userRequestStatus = 'fulfilled';
      const { username, email, token } = action.payload;
      localStorage.setItem('token', token);
      state.username = username;
      state.email = email;
    },
    // [fetchGetCurrentUser.rejected]: (state, action) => {
    //   console.log(action.payload);
    // },
  },
});

export const { logOut } = userSlice.actions;

export default userSlice.reducer;
