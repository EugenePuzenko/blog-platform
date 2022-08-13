import { useState } from 'react';
import classes from '../App.module.scss';
import useAuth from '../hooks/useAuth';

const Favorite = ({ slug, favoritesCount }) => {
  const { isAuth } = useAuth();

  const [likeCount, setLikeCount] = useState(favoritesCount || 0);
  const [isLike, setIsLike] = useState(false);

  const onFavoriteClick = (e) => {
    if (e.target.checked) {
      //   dispatch(fetchSetFavoriteArticle(article.slug));
      setLikeCount(likeCount + (isLike ? -1 : 1));
      setIsLike(!isLike);
    } else {
      //   dispatch(fetchDeleteFavoriteArticle(article.slug));
      setLikeCount(likeCount + (isLike ? -1 : 1));
      setIsLike(!isLike);
    }
  };

  return (
    <div className={classes.favorite}>
      <label htmlFor={slug}>
        <input
          onChange={(e) => onFavoriteClick(e)}
          className={classes.checkbox}
          disabled={!isAuth}
          checked={isLike}
          type="checkbox"
          id={slug}
        />
        <span className={classes['custom-checkbox']} />
        {likeCount}
      </label>
    </div>
  );
};

export default Favorite;
