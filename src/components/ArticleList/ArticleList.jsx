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
import ArticleSkeleton from './ArticleSkeleton';
import { selectArticle } from '../../store/selectors';

const Article = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const onLikeClick = () => {
    setLikeCount(likeCount + (isLike ? -1 : 1));
    setIsLike(!isLike);
  };

  const { page } = useParams();
  const dispatch = useDispatch();

  const [routPage, setRoutPage] = useState(+page ? +page : 1);

  const { articlesCount, articles, isArticlesListLoading } = useSelector(selectArticle);

  useEffect(() => {
    dispatch(fetchGetArticles({ limit: 5, offset: page * 5 - 5 }));
  }, [dispatch, page]);

  const paginationCustomByRout = (numberOfPage, type, originalElement) => {
    if (type === 'page') return <Link to={`/articles/page=${numberOfPage}`}>{numberOfPage}</Link>;
    return originalElement;
  };

  return (
    <>
      <div className={classes['articles-block']}>
        {isArticlesListLoading && <ArticleSkeleton articles={5} />}
        {!isArticlesListLoading &&
          articles.map((article) => (
            <article className={classes.article} key={uuidv4()}>
              <div className={classes['article-text']}>
                <div className={classes.title}>
                  <Link to={`/articles/page=${routPage}/article=${article.slug}`} className={classes['title-text']}>
                    {article.title && cutText(article.title, 50)}
                  </Link>
                  <button className={classes['like-btn']} onClick={onLikeClick} type="button">
                    <img src={isLike ? likedBtn : unlikedBtn} alt="like" />
                  </button>
                  <span className={classes.likes}>{likeCount}</span>
                </div>
                <div>
                  {article.tagList
                    .filter((v, i, a) => a.indexOf(v) === i && i < 10)
                    .map(
                      (tag) =>
                        !!tag && (
                          <span className={classes['article-tag']} key={uuidv4()}>
                            {cutText(tag, 30)}
                          </span>
                        )
                    )}
                </div>
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
