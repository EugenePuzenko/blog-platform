import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://blog.kata.academy/api/';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGRhODQwM2NmNzA1MWIwMDgyOGQ5MSIsInVzZXJuYW1lIjoidGVzdHVzZXJ0aGlzYXBpIiwiZXhwIjoxNjYzODgyMzU1LCJpYXQiOjE2NTg2OTgzNTV9.dE1TGKZfMT2p7YvoEjxZF7AN1vkYS-tLPzzwXjBNzmY';

export const fetchGetArticles = createAsyncThunk(
  'articles/fetchGetArticles',
  async (parameters = { limit: 5, offset: 0 }, { rejectWithValue }) => axios
    .get(`${BASE_URL}articles`, {
      params: parameters,
      headers: {
        Authorization: `Token ${TOKEN}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    })
    .then(({ data }) => data)
    .catch((err) => rejectWithValue({ status: err.response.status, statusText: err.response.statusText })),
);

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    articles: [],
    articlesCount: null,
  },
  reducers: {
    getMoreFiveTickets(state) {
      state.countOfVisibleTickets += 5;
    },
  },
  extraReducers: {
    // [fetchGetArticles.pending]: (state) => {
    //   state.ticketsListStatus = 'loading';
    //   state.ticketsListError = null;
    // },
    [fetchGetArticles.fulfilled]: (state, action) => {
      state.articles = [...action.payload.articles];
      state.articlesCount = action.payload.articlesCount;
      state.articleRequestStatus = 'fulfilled';
    },
    // [fetchGetArticles.rejected]: (state, action) => {},
  },
});

// export const {} = articleSlice.actions;

export default articleSlice.reducer;
