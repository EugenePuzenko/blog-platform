import { Routes, Route, Navigate } from 'react-router-dom';
import ArticleList from './ArticleList/ArticleList';
import CurrentArticle from './CurrentArticle/CurrentArticle';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import Layout from './Layout/Layout';
import Profile from './Profile/Profile';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="articles" replace />} />
        <Route path="articles" element={<ArticleList />} />
        <Route path="articles/page=:page" element={<ArticleList />} />
        <Route path="articles/page=:page/article=:slug" element={<CurrentArticle />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
