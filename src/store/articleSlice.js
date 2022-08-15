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
        return rejectWithValue({ status: err.response.status, statusText: err.response.statusText });
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

export const fetchFavoriteArticle = createAsyncThunk(
  'articles/fetchFavoriteArticle',
  async (slug, { rejectWithValue }) =>
    axios
      .post(
        `${BASE_URL}articles/${slug}/favorite`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((err) => {
        return rejectWithValue({ status: err.response.status, statusText: err.response.statusText });
      })
);

export const fetchUnfavoriteArticle = createAsyncThunk(
  'articles/fetchUnfavoriteArticle',
  async (slug, { rejectWithValue }) =>
    axios
      .delete(`${BASE_URL}articles/${slug}/favorite`, {
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

    [fetchCurrentArticle.pending]: (state) => {
      state.isSelectedArticleLoading = true;
    },
    [fetchCurrentArticle.fulfilled]: (state, action) => {
      state.isSelectedArticleLoading = false;
      state.selectedArticle = action.payload.article;
    },

    [fetchEditArticle.fulfilled]: (state) => {
      state.articleRequestStatus = 'fulfilled';
    },

    [fetchDeleteArticle.fulfilled]: (state) => {
      state.articleRequestStatus = 'fulfilled';
    },

    [fetchFavoriteArticle.fulfilled]: (state, action) => {
      const favoriteArticles = JSON.parse(localStorage.getItem('favoriteArticles'));
      localStorage.setItem('favoriteArticles', JSON.stringify([...favoriteArticles, action.payload.article.slug]));
    },

    [fetchUnfavoriteArticle.fulfilled]: (state, action) => {
      const favoriteArticles = JSON.parse(localStorage.getItem('favoriteArticles')).filter(
        (el) => el !== action.payload.article.slug
      );
      localStorage.setItem('favoriteArticles', JSON.stringify(favoriteArticles));
    },
  },
});

export const { getCurrentArticle, setCurrentPage } = articleSlice.actions;

export default articleSlice.reducer;
