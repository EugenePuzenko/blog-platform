import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from './articleSlice';

// const TOKEN =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGRhODQwM2NmNzA1MWIwMDgyOGQ5MSIsInVzZXJuYW1lIjoidGVzdHVzZXJ0aGlzYXBpIiwiZXhwIjoxNjYzODgyMzU1LCJpYXQiOjE2NTg2OTgzNTV9.dE1TGKZfMT2p7YvoEjxZF7AN1vkYS-tLPzzwXjBNzmY';
// Authorization: `Token ${TOKEN}`,

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
  },
  reducers: {},
  extraReducers: {
    // [fetchCreateUser.pending]: (state, action) => {
    // console.log(state, action.payload);
    // },
    [fetchCreateUser.fulfilled]: (state, action) => {
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
  },
});

// export const {} = userSlice.actions;

export default userSlice.reducer;
