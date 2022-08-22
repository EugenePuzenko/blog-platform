import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import ArticleList from './ArticleList/ArticleList';
import CurrentArticle from './CurrentArticle/CurrentArticle';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import Layout from './Layout/Layout';
import Profile from './Profile/Profile';
import NewArticle from './NewArticle/NewArticle';
import EditArticle from './EditArticle/EditArticle';
import { fetchGetCurrentUser } from '../store/userSlice';
import RequireAuth from './hoc/RequireAuth';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const loggedInUser = localStorage.getItem('token');
    if (loggedInUser) {
      dispatch(fetchGetCurrentUser(loggedInUser));
    }

    const favoriteArticles = localStorage.getItem('favoriteArticles');
    if (!favoriteArticles) localStorage.setItem('favoriteArticles', JSON.stringify([]));
  }, [dispatch]);

  const [isOnline, setOnline] = useState(true);

  useEffect(() => {
    window.addEventListener('online', () => {
      setOnline(true);
    });

    window.addEventListener('offline', () => {
      setOnline(false);
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout isOnline={isOnline} />}>
        <Route index element={<Navigate to="articles" replace />} />
        <Route path="articles" element={<ArticleList isOnline={isOnline} />} />
        <Route path="articles/page=:page" element={<ArticleList />} />
        <Route path="articles/article=:slug" element={<CurrentArticle />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route
          path="profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="new-article"
          element={
            <RequireAuth>
              <NewArticle />
            </RequireAuth>
          }
        />
        <Route
          path="articles/article=:slug/edit"
          element={
            <RequireAuth>
              <EditArticle />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
