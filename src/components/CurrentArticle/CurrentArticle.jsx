import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';
import { useParams, Link, useNavigate } from 'react-router-dom';

import 'react-loading-skeleton/dist/skeleton.css';
import { Button, Modal } from 'antd';
import classes from '../App.module.scss';
import { formatData, cutText } from '../../helpers';
import imgPlaceholder from '../../assets/img/img-placeholder.png';
import { fetchCurrentArticle, fetchDeleteArticle } from '../../store/articleSlice';
import LoadingSpin from '../LoadingSpin/LoadingSpin';
import useAuth from '../hooks/useAuth';
import Favorite from '../Favorite/Favorite';

import { selectArticle } from '../../store/selectors';

const CurrentArticle = () => {
  const { slug } = useParams();
  const { username } = useAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteArticle = () => {
    dispatch(fetchDeleteArticle(slug));
    navigate('/', { replace: true });
  };

  const { selectedArticle, isSelectedArticleLoading } = useSelector(selectArticle);

  useEffect(() => {
    dispatch(fetchCurrentArticle(slug));
  }, [dispatch, slug]);

  const loadingSpinner = !selectedArticle && isSelectedArticleLoading && <LoadingSpin />;

  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  return (
    <article className={`${classes['current-article']} ${classes.article}`} key={uuidv4()}>
      {loadingSpinner}
      {selectedArticle && !isSelectedArticleLoading && (
        <>
          <div className={classes.aside}>
            <div className={classes.user}>
              <div>
                <div className={classes['user-name']}>{selectedArticle.author.username}</div>
                <div className={classes['created-time']}>{formatData(selectedArticle.createdAt)}</div>
              </div>
              <img
                className={classes.avatar}
                src={selectedArticle.author.image}
                alt="avatar"
                onError={(e) => {
                  e.currentTarget.src = imgPlaceholder;
                }}
              />
            </div>
            {selectedArticle.author.username === username && (
              <div>
                <Button
                  className={`${classes['confirm-btn']} ${classes['confirm-delete-btn']}`}
                  type="primary"
                  onClick={showModal}
                >
                  Delete
                </Button>
                <Modal visible={visible} onOk={deleteArticle} onCancel={hideModal} okText="Да" cancelText="Нет">
                  <p>Вы уверены, что хотите полностью удалить эту статью ?</p>
                </Modal>
                <Link to="edit">
                  <button className={`${classes['confirm-btn']} ${classes['confirm-edit-btn']}`} type="button">
                    Edit
                  </button>
                </Link>
              </div>
            )}
          </div>
          <div className={classes['current-article-text']}>
            <div className={classes.title}>
              <h2 className={classes['title-text']}>{selectedArticle.title}</h2>
              <Favorite favoritesCount={selectedArticle.favoritesCount} />
            </div>
            <div className={classes['article-tags']}>
              {selectedArticle.tagList
                .filter((v, i, a) => a.indexOf(v) === i)
                .map(
                  (tag) =>
                    !!tag && (
                      <span className={classes['article-tag']} key={uuidv4()}>
                        {cutText(tag, 30)}
                      </span>
                    )
                )}
            </div>
            <p className={`${classes['article-descr']} ${classes['current-article-descr']}`}>
              {selectedArticle.description}
            </p>
            <div className={classes['article-body']}>
              <ReactMarkdown>{selectedArticle.body}</ReactMarkdown>
            </div>
          </div>
        </>
      )}
    </article>
  );
};

export default CurrentArticle;
