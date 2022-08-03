import { Routes, Route } from 'react-router-dom';
import ArticleList from './ArticleList/ArticleList';
import CurrentArticle from './CurrentArticle/CurrentArticle';

import Layout from './Layout/Layout';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ArticleList />} />
        <Route path="articles" element={<ArticleList />} />
        <Route path="articles/:slug" element={<CurrentArticle />} />
      </Route>
    </Routes>
  );
};

export default App;
