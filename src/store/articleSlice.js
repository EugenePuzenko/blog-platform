import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const BASE_URL = 'https://blog.kata.academy/api/';

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
    isArticlesListLoading: true,
    articlesCount: null,
    selectedArticle: null,
    isSelectedArticleLoading: true,
  },
  reducers: {},
  extraReducers: {
    [fetchGetArticles.pending]: (state) => {
      state.isArticlesListLoading = true;
    },
    [fetchGetArticles.fulfilled]: (state, action) => {
      state.isArticlesListLoading = false;
      state.selectedArticle = null;
      state.articles = [...action.payload.articles];
      state.articlesCount = action.payload.articlesCount;
      state.articleRequestStatus = 'fulfilled';
    },
    // [fetchGetArticles.rejected]: (state, action) => {},

    [fetchCurrentArticle.pending]: (state) => {
      state.isSelectedArticleLoading = true;
    },
    [fetchCurrentArticle.fulfilled]: (state, action) => {
      state.isSelectedArticleLoading = false;
      state.selectedArticle = action.payload.article;
    },
  },
});

export const { getCurrentArticle, setCurrentPage } = articleSlice.actions;

export default articleSlice.reducer;
