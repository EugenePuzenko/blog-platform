import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://blog.kata.academy/api/';
// const TOKEN =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGRhODQwM2NmNzA1MWIwMDgyOGQ5MSIsInVzZXJuYW1lIjoidGVzdHVzZXJ0aGlzYXBpIiwiZXhwIjoxNjYzODgyMzU1LCJpYXQiOjE2NTg2OTgzNTV9.dE1TGKZfMT2p7YvoEjxZF7AN1vkYS-tLPzzwXjBNzmY';
// Authorization: `Token ${TOKEN}`,

export const fetchGetArticles = createAsyncThunk(
  'articles/fetchGetArticles',
  async (parameters = { limit: 5, offset: 0 }, { rejectWithValue }) =>
    axios
      .get(`${BASE_URL}articles`, {
        params: parameters,
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      })
      .then(({ data }) => data)
      .catch((err) => rejectWithValue({ status: err.response.status, statusText: err.response.statusText }))
);

export const fetchCurrentArticle = createAsyncThunk('articles/fetchCurrentArticle', async (slug, { rejectWithValue }) =>
  axios
    .get(`${BASE_URL}articles/${slug}`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    })
    .then(({ data }) => data)
    .catch((err) => rejectWithValue({ status: err.response.status, statusText: err.response.statusText }))
);

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    articles: [],
    articlesCount: null,
    currentArticle: null,
    selectedArticle: null,
    currentPage: 1,
  },
  reducers: {
    getCurrentArticle(state, action) {
      state.currentArticle = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    // [fetchGetArticles.pending]: (state) => {
    //   state.ticketsListStatus = 'loading';
    //   state.ticketsListError = null;
    // },
    [fetchGetArticles.fulfilled]: (state, action) => {
      state.currentArticle = null;
      state.selectedArticle = null;
      state.articles = [...action.payload.articles];
      state.articlesCount = action.payload.articlesCount;
      state.articleRequestStatus = 'fulfilled';
    },
    // [fetchGetArticles.rejected]: (state, action) => {},

    [fetchCurrentArticle.fulfilled]: (state, action) => {
      state.selectedArticle = action.payload.article;
    },
  },
});

export const { getCurrentArticle, setCurrentPage } = articleSlice.actions;

export default articleSlice.reducer;
