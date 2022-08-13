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

export const fetchCreateArticle = createAsyncThunk(
  'articles/fetchCreateArticle',
  async ({ title, description, body, tagList }, { rejectWithValue }) => {
    return axios
      .post(
        `${BASE_URL}articles`,
        {
          article: {
            title,
            description,
            body,
            tagList,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        }
      )
      .then(({ data }) => data)
      .catch((err) => rejectWithValue({ status: err.response.status, statusText: err.response.statusText }));
  }
);

export const fetchEditArticle = createAsyncThunk(
  'articles/fetchEditArticle',
  async ({ slug, title, description, body, tagList }, { rejectWithValue }) => {
    axios
      .put(
        `${BASE_URL}articles/${slug}`,
        {
          article: {
            title,
            description,
            body,
            tagList,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((err) => {
        return rejectWithValue(err.message);
      });
  }
);

export const fetchDeleteArticle = createAsyncThunk('articles/fetchDeleteArticle', async (slug, { rejectWithValue }) =>
  axios
    .delete(`${BASE_URL}articles/${slug}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      return rejectWithValue({ status: err.response.status, statusText: err.response.statusText });
    })
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

    // [fetchCreateArticle.pending]: (state) => {},
    // [fetchCreateArticle.fulfilled]: (state, action) => {},
    // [fetchCreateArticle.rejected]: (state, action) => {},

    // [fetchEditArticle.pending]: () => {
    //   console.log('pending');
    // },
    [fetchEditArticle.fulfilled]: (state) => {
      state.articleRequestStatus = 'fulfilled';
      // state.userRequestStatus = true;
    },
    // [fetchEditArticle.rejected]: () => {
    //   console.log('rejected');
    // },

    [fetchDeleteArticle.fulfilled]: (state) => {
      state.articleRequestStatus = 'fulfilled';
      // state.userRequestStatus = true;
    },
  },
});

export const { getCurrentArticle, setCurrentPage } = articleSlice.actions;

export default articleSlice.reducer;
