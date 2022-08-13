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

export const fetchSignInUser = createAsyncThunk(
  'user/fetchSignInUser',
  // eslint-disable-next-line no-unused-vars
  async ({ email, password }, { _, rejectWithValue }) =>
    axios
      .post(
        `${BASE_URL}users/login`,
        {
          user: {
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
          statusText: err?.message,
        });
      })
);

export const fetchUpdateCurrentUser = createAsyncThunk(
  'user/fetchUpdateCurrentUser',
  // eslint-disable-next-line no-unused-vars
  async ({ username, email, password, bio, image, token }, { _, rejectWithValue }) =>
    axios
      .put(
        `${BASE_URL}user`,
        {
          user: {
            username,
            email,
            password,
            bio,
            image,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(({ data }) => data.user)
      .catch((err) => {
        return rejectWithValue({
          status: err.response.status,
          statusText: err?.message,
        });
      })
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
    errorSignInServer: null,
    errorEditProfileServer: null,
    userIsEdit: false,
    isLoggedIn: false,
    userEditProfileStatus: null,
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
      state.errorSignInServer = null;
      state.userIsEdit = false;
      state.isLoggedIn = false;
    },
    closeAlert(state) {
      state.errorSignInServer = null;
    },
    resetStatus(state) {
      state.userEditProfileStatus = null;
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
      const { username, email, image, token } = action.payload;
      localStorage.setItem('token', token);
      state.username = username;
      state.email = email;
      state.image = image;
    },
    // [fetchGetCurrentUser.rejected]: (state, action) => {
    //   console.log(action.payload);
    // },

    [fetchSignInUser.pending]: (state, action) => {
      state.errorSignInServer = null;
      state.errorUserServer = action.payload;
    },
    [fetchSignInUser.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.userRequestStatus = 'fulfilled';
      const { username, email, token } = action.payload;
      localStorage.setItem('token', token);
      state.username = username;
      state.email = email;
    },
    [fetchSignInUser.rejected]: (state, action) => {
      state.userRequestStatus = 'rejected';
      state.errorSignInServer = action.payload.statusText;
    },

    [fetchUpdateCurrentUser.pending]: (state, action) => {
      console.log('pending', state, action.payload);
      state.errorEditProfileServer = null;
    },
    [fetchUpdateCurrentUser.fulfilled]: (state, action) => {
      console.log('fulfilled', state, action.payload);
      state.isLoggedIn = true;
      state.userEditProfileStatus = 'fulfilled';
      const { username, email, token, image } = action.payload;
      localStorage.setItem('token', token);
      state.username = username;
      state.email = email;
      state.image = image;
    },
    [fetchUpdateCurrentUser.rejected]: (state, action) => {
      console.log('rejected', state, action.payload);
      state.userEditProfileStatus = 'rejected';
      state.errorEditProfileServer = action.payload.statusText;
    },
  },
});

export const { logOut, closeAlert, resetStatus } = userSlice.actions;

export default userSlice.reducer;
