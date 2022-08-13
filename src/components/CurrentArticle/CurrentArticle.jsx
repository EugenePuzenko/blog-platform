import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';
import { useParams, Link } from 'react-router-dom';

import 'react-loading-skeleton/dist/skeleton.css';
import classes from '../App.module.scss';
// import likedBtn from '../../assets/img/liked.svg';
import unlikedBtn from '../../assets/img/like.svg';
import { formatData, cutText } from '../../helpers';
import imgPlaceholder from '../../assets/img/img-placeholder.png';
import { fetchCurrentArticle } from '../../store/articleSlice';
import LoadingSpin from '../LoadingSpin/LoadingSpin';
import useAuth from '../hooks/useAuth';

import { selectArticle } from '../../store/selectors';

const CurrentArticle = () => {
  const { slug } = useParams();
  const { username } = useAuth();

  const dispatch = useDispatch();
  const { selectedArticle, isSelectedArticleLoading } = useSelector(selectArticle);

  useEffect(() => {
    dispatch(fetchCurrentArticle(slug));
  }, [dispatch, slug]);

  const loadingSpinner = !selectedArticle && isSelectedArticleLoading && <LoadingSpin />;

  return (
    <article className={`${classes['current-article']} ${classes.article}`} key={uuidv4()}>
      {loadingSpinner}
      {selectedArticle && !isSelectedArticleLoading && (
        <>
          <div className={classes['article-text']}>
            <div className={classes.title}>
              <h2 className={classes['title-text']}>{selectedArticle.title}</h2>
              <button className={classes['like-btn']} type="button">
                <img src={unlikedBtn} alt="like" />
              </button>
              <span className={classes.likes}>{selectedArticle.favoritesCount}</span>
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
                <button className={`${classes['confirm-btn']} ${classes['confirm-delete-btn']}`} type="button">
                  Delete
                </button>
                <Link to="edit">
                  <button className={`${classes['confirm-btn']} ${classes['confirm-edit-btn']}`} type="button">
                    Edit
                  </button>
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </article>
  );
};

export default CurrentArticle;
