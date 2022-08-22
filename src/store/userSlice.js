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
          statusText: err?.message,
          incorrectData: err.response.data,
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
          statusText: err?.message,
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
          incorrectData: err.response.data,
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
          incorrectData: err.response.data,
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
    createUserLoading: false,
    invalidSignUp: null,
    loginUserLoading: false,
    invalidSignIn: null,
    editProfileLoading: false,
    invalidEditProfile: null,
    editProfileError: false,
    createUserError: false,
    loginUserError: false,
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
    resetStatus(state) {
      state.userEditProfileStatus = null;
      state.invalidEditProfile = null;
    },
  },
  extraReducers: {
    [fetchCreateUser.pending]: (state) => {
      state.userRequestStatus = 'pending';
      state.createUserLoading = true;
      state.invalidSignUp = null;
    },
    [fetchCreateUser.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.userRequestStatus = 'fulfilled';
      const { username, email, token } = action.payload;
      localStorage.setItem('token', token);
      state.username = username;
      state.email = email;
      state.createUserLoading = false;
      state.invalidSignUp = null;
    },
    [fetchCreateUser.rejected]: (state, action) => {
      state.userRequestStatus = 'rejected';
      state.errorUserServer = action.payload;
      state.createUserLoading = false;
      if (action.payload.status === 422) {
        state.invalidSignUp = action.payload.incorrectData.errors;
      }
      if (action.payload.status === 0) {
        state.createUserError = true;
      }
    },

    [fetchGetCurrentUser.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.userRequestStatus = 'fulfilled';
      const { username, email, image, token } = action.payload;
      localStorage.setItem('token', token);
      state.username = username;
      state.email = email;
      state.image = image;
    },

    [fetchSignInUser.pending]: (state, action) => {
      state.errorSignInServer = null;
      state.errorUserServer = action.payload;
      state.loginUserLoading = true;
      state.invalidSignIn = null;
    },
    [fetchSignInUser.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.userRequestStatus = 'fulfilled';
      const { username, email, token } = action.payload;
      localStorage.setItem('token', token);
      state.username = username;
      state.email = email;
      state.loginUserLoading = false;
      state.invalidSignIn = null;
    },
    [fetchSignInUser.rejected]: (state, action) => {
      state.userRequestStatus = 'rejected';
      state.errorSignInServer = action.payload.statusText;
      state.loginUserLoading = false;

      if (action.payload.status === 422) {
        state.invalidSignIn = action.payload.incorrectData.errors;
      }
      if (action.payload.status === 0) {
        state.loginUserError = true;
      }
    },

    [fetchUpdateCurrentUser.pending]: (state) => {
      state.errorEditProfileServer = null;
      state.editProfileLoading = true;
      state.editProfileError = false;
    },
    [fetchUpdateCurrentUser.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.userEditProfileStatus = 'fulfilled';
      const { username, email, token, image } = action.payload;
      localStorage.setItem('token', token);
      state.username = username;
      state.email = email;
      state.image = image;
      state.editProfileLoading = false;
      state.editProfileError = false;
    },
    [fetchUpdateCurrentUser.rejected]: (state, action) => {
      state.userEditProfileStatus = 'rejected';
      state.errorEditProfileServer = action.payload.statusText;
      state.editProfileLoading = false;
      if (action.payload.status === 422) {
        state.invalidEditProfile = action.payload.incorrectData.errors;
      }
      if (action.payload.status === 0) {
        state.editProfileError = true;
      }
    },
  },
});

export const { logOut, closeAlert, resetStatus } = userSlice.actions;

export default userSlice.reducer;
