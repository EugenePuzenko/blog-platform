import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCreateArticle } from '../../store/articleSlice';
import NewArticleForm from './NewArticleForm';

const NewArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerFormSubmit = ({ title, description, body }, tagList) => {
    dispatch(fetchCreateArticle({ title, description, body, tagList }));
    navigate('/', { replace: true });
  };

  return <NewArticleForm formTitle="Create new article" handlerFormSubmit={handlerFormSubmit} />;
};

export default NewArticle;
