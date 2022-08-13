import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NewArticleForm from '../NewArticle/NewArticleForm';
import { fetchCurrentArticle, fetchEditArticle } from '../../store/articleSlice';

const EditArticle = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const navigate = useNavigate();
  // const location = useLocation();
  // const fromPage = location.state?.from?.pathname || '/';
  const articleRequestStatus = useSelector((state) => state.user.articleRequestStatus);

  useEffect(() => {
    dispatch(fetchCurrentArticle(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (articleRequestStatus === 'fulfilled') {
      navigate('/', { replace: true });
    }
  }, [navigate, articleRequestStatus]);

  const article = useSelector((state) => state.article.selectedArticle);

  const handlerFormSubmit = ({ title, description, body }, tagList) => {
    dispatch(fetchEditArticle({ slug, title, description, body, tagList }));

    navigate('/', { replace: true });
  };

  return <NewArticleForm formTitle="Edit article" article={article} handlerFormSubmit={handlerFormSubmit} />;
};

export default EditArticle;
