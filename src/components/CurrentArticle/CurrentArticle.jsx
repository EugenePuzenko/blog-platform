import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Button, Modal, Alert } from 'antd';
import classes from '../App.module.scss';
import { formatData, cutText } from '../../helpers';
import imgPlaceholder from '../../assets/img/img-placeholder.jpg';
import { fetchCurrentArticle, fetchDeleteArticle } from '../../store/articleSlice';
import LoadingSpin from '../LoadingSpin/LoadingSpin';
import useAuth from '../hooks/useAuth';
import Favorite from '../Favorite/Favorite';
import { selectArticle, selectDeleteArticleError, selectDeleteArticleStatus } from '../../store/selectors';

const CurrentArticle = () => {
  const { slug } = useParams();
  const { username } = useAuth();

  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedArticle, isSelectedArticleLoading, isCurrentArticleRequestError } = useSelector(selectArticle);
  const deleteArticleError = useSelector(selectDeleteArticleError);
  const deleteArticleStatus = useSelector(selectDeleteArticleStatus);

  const deleteArticle = () => {
    dispatch(fetchDeleteArticle(slug));

    if (deleteArticleError) hideModal();
  };

  useEffect(() => {
    hideModal();
  }, [deleteArticleError]);

  useEffect(() => {
    if (deleteArticleStatus === 'fulfilled') {
      navigate('/', { replace: true });
      navigate(0);
    }
  }, [deleteArticleStatus]);

  useEffect(() => {
    dispatch(fetchCurrentArticle(slug));
  }, [dispatch, slug]);

  const loadingSpinner = isSelectedArticleLoading && (
    <div className={`${classes.spin} ${classes['article-spin']}`}>
      <LoadingSpin />
    </div>
  );

  const currentArticleRequestErrorMessage = isCurrentArticleRequestError && (
    <Alert
      style={{ width: '30%', margin: '0 auto', marginBottom: '26px' }}
      message="Ошибка загрузки статьи."
      type="error"
      closable
    />
  );

  const deleteArticleErrorMessage = deleteArticleError && (
    <Alert
      style={{ width: '30%', margin: '0 auto', marginBottom: '26px' }}
      message="Ошибка удаления статьи."
      type="error"
      closable
    />
  );

  const [loaded, setLoaded] = useState(false);

  return (
    <article className={`${classes['current-article']} ${classes.article}`} key={uuidv4()}>
      {loadingSpinner}
      {currentArticleRequestErrorMessage}
      {deleteArticleErrorMessage}
      {selectedArticle && !isSelectedArticleLoading && (
        <>
          <div className={classes.aside}>
            <div className={classes.user}>
              <div>
                <div className={classes['user-name']}>{selectedArticle.author.username}</div>
                <div className={classes['created-time']}>{formatData(selectedArticle.createdAt)}</div>
              </div>
              <div
                style={{
                  position: 'relative',
                }}
              >
                <img
                  className={classes.avatar}
                  onLoad={() => setLoaded(true)}
                  onError={(e) => {
                    e.currentTarget.src = imgPlaceholder;
                  }}
                  src={selectedArticle?.author?.image}
                  alt="avatar"
                />
                {!loaded && (
                  <Skeleton
                    style={{
                      width: '46px',
                      height: '46px',
                      position: 'absolute',
                      top: '0px',
                      left: '0px',
                      borderRadius: '50%',
                    }}
                  />
                )}
              </div>
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
              <Favorite slug={slug} favoritesCount={selectedArticle.favoritesCount} />
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
