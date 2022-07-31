import { useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import classes from '../App.module.scss';
import likedBtn from '../../assets/img/liked.svg';
import unlikedBtn from '../../assets/img/like.svg';
import { formatData, cutText } from '../../helpers';

const Article = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const onLikeClick = () => {
    setLikeCount(likeCount + (isLike ? -1 : 1));
    setIsLike(!isLike);
  };

  const { articles } = useSelector((state) => state.article);

  return articles.map((article) => (
    <article className={classes.article} key={uuidv4()}>
      <div className={classes['article-text']}>
        <div className={classes.title}>
          <h2 className={classes['title-text']}>{cutText(article.title, 50)}</h2>
          <button className={classes['like-btn']} onClick={onLikeClick} type="button">
            <img src={isLike ? likedBtn : unlikedBtn} alt="like" />
          </button>
          <span className={classes.likes}>{likeCount}</span>
        </div>
        {article.tagList
          .filter((v, i, a) => a.indexOf(v) === i)
          .map(
            (tag) =>
              !!tag.length && (
                <span className={classes['article-tag']} key={uuidv4()}>
                  {cutText(tag, 30)}
                </span>
              )
          )}
        <p className={classes['article-descr']}>{cutText(article.description, 220)}</p>
      </div>
      <div className={classes.user}>
        <div>
          <div className={classes['user-name']}>{article.author.username}</div>
          <div className={classes['created-time']}>{formatData(article.createdAt)}</div>
        </div>
        <img className={classes.avatar} src={article.author.image} alt="avatar" />
      </div>
    </article>
  ));
};

export default Article;
