import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Pagination } from 'antd';
import { Link, useParams } from 'react-router-dom';
import classes from '../App.module.scss';
import likedBtn from '../../assets/img/liked.svg';
import unlikedBtn from '../../assets/img/like.svg';
import { formatData, cutText } from '../../helpers';

import imgPlaceholder from '../../assets/img/img-placeholder.png';

import { fetchGetArticles } from '../../store/articleSlice';

const Article = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const onLikeClick = () => {
    setLikeCount(likeCount + (isLike ? -1 : 1));
    setIsLike(!isLike);
  };

  const { page } = useParams();

  const [routPage, setRoutPage] = useState(+page ? +page : 1);

  const dispatch = useDispatch();
  const { articlesCount, articles } = useSelector((state) => state.article);

  useEffect(() => {
    dispatch(fetchGetArticles({ limit: 5, offset: page * 5 - 5 }));
  }, [dispatch, page]);

  return (
    <>
      {articles.map((article) => (
        <article className={classes.article} key={uuidv4()}>
          <div className={classes['article-text']}>
            <div className={classes.title}>
              <Link to={`/articles/page=${page}/article=${article.slug}`} className={classes['title-text']}>
                {article.title && cutText(article.title, 50)}
              </Link>
              <button className={classes['like-btn']} onClick={onLikeClick} type="button">
                <img src={isLike ? likedBtn : unlikedBtn} alt="like" />
              </button>
              <span className={classes.likes}>{likeCount}</span>
            </div>
            {article.tagList
              .filter((v, i, a) => a.indexOf(v) === i)
              .map(
                (tag) =>
                  !!tag && (
                    <span className={classes['article-tag']} key={uuidv4()}>
                      {cutText(tag, 30)}
                    </span>
                  )
              )}
            <p className={classes['article-descr']}>{article.description && cutText(article.description, 220)}</p>
          </div>
          <div className={classes.user}>
            <div>
              <div className={classes['user-name']}>{article.author.username}</div>
              <div className={classes['created-time']}>{formatData(article.createdAt)}</div>
            </div>
            <img
              className={classes.avatar}
              src={article.author.image}
              alt="avatar"
              onError={(e) => {
                e.currentTarget.src = imgPlaceholder;
              }}
            />
          </div>
        </article>
      ))}
      <Pagination
        onChange={(e) => setRoutPage(e)}
        current={routPage}
        total={articlesCount}
        pageSize={5}
        size="small"
        showSizeChanger={false}
        // eslint-disable-next-line react/no-unstable-nested-components
        itemRender={(numberOfPage, type, originalElement) => {
          if (type === 'page') return <Link to={`/articles/page=${numberOfPage}`}>{numberOfPage}</Link>;
          return originalElement;
        }}
      />
    </>
  );
};

export default Article;
