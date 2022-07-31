import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchGetArticles } from '../store/articleSlice';

import classes from './App.module.scss';
import Header from './Header/Header';
import Article from './Article/Article';

function App() {
  const dispatch = useDispatch();
  const { articlesCount, articles } = useSelector((state) => state.article);

  console.log(articles);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchGetArticles());
  }, []);

  const onPaginationClick = (e) => {
    dispatch(fetchGetArticles({ limit: 5, offset: e * 5 - 5 }));
    setCurrentPage(e);
  };

  return (
    <>
      <Header />
      <main className={classes.main}>
        <Article />
        <Pagination
          onChange={(e) => onPaginationClick(e)}
          current={currentPage}
          pageSize={articles.length}
          total={articlesCount}
          size="small"
          showSizeChanger={false}
        />
      </main>
    </>
  );
}

export default App;
