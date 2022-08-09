import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ArticleList from './ArticleList/ArticleList';
import CurrentArticle from './CurrentArticle/CurrentArticle';
import { fetchGetCurrentUser } from '../store/userSlice';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import Layout from './Layout/Layout';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('token');
    if (loggedInUser) {
      dispatch(fetchGetCurrentUser(loggedInUser));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="articles" replace />} />
        <Route path="articles" element={<ArticleList />} />
        <Route path="articles/page=:page" element={<ArticleList />} />
        <Route path="articles/page=:page/article=:slug" element={<CurrentArticle />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="profile" element={<SignUp />} />
      </Route>
    </Routes>
  );
};

export default App;
