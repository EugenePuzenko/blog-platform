import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NewArticleForm from '../NewArticle/NewArticleForm';
import { fetchCurrentArticle, fetchEditArticle } from '../../store/articleSlice';
import { selectSelectedArticle, selectEditArticleStatus } from '../../store/selectors';

const EditArticle = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = useSelector(selectSelectedArticle);
  const editArticleStatus = useSelector(selectEditArticleStatus);

  useEffect(() => {
    dispatch(fetchCurrentArticle(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (editArticleStatus === 'fulfilled') {
      navigate('/', { replace: true });
      navigate(0);
    }
  }, [dispatch, navigate, editArticleStatus]);

  const handlerFormSubmit = ({ title, description, body }, tagList) => {
    dispatch(fetchEditArticle({ slug, title, description, body, tagList }));
  };

  return <NewArticleForm formTitle="Edit article" article={article} handlerFormSubmit={handlerFormSubmit} />;
};

export default EditArticle;
