import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Favorite from '../Favorite/Favorite';
import classes from '../App.module.scss';
import { formatData, cutText } from '../../helpers';
import imgPlaceholder from '../../assets/img/img-placeholder.png';

const OneArticleOfArticleList = ({ article, routPage }) => {
  return (
    <article className={classes.article} key={uuidv4()}>
      <div className={classes['article-text']}>
        <div className={classes.title}>
          <Link to={`/articles/page=${routPage}/article=${article.slug}`} className={classes['title-text']}>
            {article.title && cutText(article.title, 50)}
          </Link>
          <Favorite slug={article.slug} favoritesCount={article.favoritesCount} />
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
  );
};

export default OneArticleOfArticleList;
