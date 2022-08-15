import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NewArticleForm from '../NewArticle/NewArticleForm';
import { fetchCurrentArticle, fetchEditArticle } from '../../store/articleSlice';
import { selectArticleRequestStatus, selectSelectedArticle } from '../../store/selectors';

const EditArticle = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const navigate = useNavigate();
  const articleRequestStatus = useSelector(selectArticleRequestStatus);

  useEffect(() => {
    dispatch(fetchCurrentArticle(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (articleRequestStatus === 'fulfilled') {
      navigate('/', { replace: true });
      navigate(0);
    }
  }, [navigate, articleRequestStatus]);

  const article = useSelector(selectSelectedArticle);

  const handlerFormSubmit = ({ title, description, body }, tagList) => {
    dispatch(fetchEditArticle({ slug, title, description, body, tagList }));

    navigate('/', { replace: true });
  };

  return <NewArticleForm formTitle="Edit article" article={article} handlerFormSubmit={handlerFormSubmit} />;
};

export default EditArticle;
