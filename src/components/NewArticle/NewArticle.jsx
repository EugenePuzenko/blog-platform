import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCreateArticle } from '../../store/articleSlice';
import NewArticleForm from './NewArticleForm';
import { selectCreateArticleStatus } from '../../store/selectors';

const NewArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createArticleStatus = useSelector(selectCreateArticleStatus);

  useEffect(() => {
    if (createArticleStatus === 'fulfilled') {
      navigate('/', { replace: true });
      navigate(0);
    }
  }, [dispatch, navigate, createArticleStatus]);

  const handlerFormSubmit = ({ title, description, body }, tagList) => {
    dispatch(fetchCreateArticle({ title, description, body, tagList }));
  };

  return <NewArticleForm formTitle="Create new article" handlerFormSubmit={handlerFormSubmit} />;
};

export default NewArticle;
