import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from 'antd';
import { Link, useParams, useLocation } from 'react-router-dom';
import classes from '../App.module.scss';
import { fetchGetArticles } from '../../store/articleSlice';
import { resetStatus, fetchGetCurrentUser } from '../../store/userSlice';
import ArticleSkeleton from './ArticleSkeleton';
import OneArticleOfArticleList from './OneArticleOfArticleList';
import { selectArticle } from '../../store/selectors';

const Article = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('token');
    if (loggedInUser) {
      dispatch(fetchGetCurrentUser(loggedInUser));
    }
  }, [dispatch]);

  const { page } = useParams();
  const [routPage, setRoutPage] = useState(+page ? +page : 1);
  const { articlesCount, articles, isArticlesListLoading } = useSelector(selectArticle);

  useEffect(() => {
    dispatch(fetchGetArticles({ limit: 5, offset: page * 5 - 5 }));
  }, [dispatch, page, location.key]);

  useEffect(() => {
    dispatch(resetStatus());
  }, []);

  const paginationCustomByRout = (numberOfPage, type, originalElement) => {
    if (type === 'page') return <Link to={`/articles/page=${numberOfPage}`}>{numberOfPage}</Link>;
    return originalElement;
  };

  return (
    <>
      <div className={classes['articles-block']}>
        {isArticlesListLoading && <ArticleSkeleton articles={5} />}
        {!isArticlesListLoading &&
          articles.map((article) => <OneArticleOfArticleList key={uuidv4()} routPage={routPage} article={article} />)}
      </div>
      <Pagination
        onChange={(e) => setRoutPage(e)}
        current={routPage}
        total={articlesCount}
        pageSize={5}
        size="small"
        showSizeChanger={false}
        itemRender={(numberOfPage, type, originalElement) =>
          paginationCustomByRout(numberOfPage, type, originalElement)
        }
      />
    </>
  );
};

export default Article;
