import { useState } from 'react';
import { useDispatch } from 'react-redux';
import classes from '../App.module.scss';
import useAuth from '../hooks/useAuth';
import { fetchFavoriteArticle, fetchUnfavoriteArticle } from '../../store/articleSlice';

const Favorite = ({ slug, favoritesCount }) => {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();

  const favoriteArticles = JSON.parse(localStorage.getItem('favoriteArticles'));
  let isFavorite = false;

  if (favoriteArticles && isAuth) isFavorite = favoriteArticles.includes(slug);

  const [likeCount, setLikeCount] = useState(favoritesCount);
  const [isLike, setIsLike] = useState(isFavorite || false);

  const onFavoriteClick = (e) => {
    if (e.target.checked) {
      dispatch(fetchFavoriteArticle(slug));
      setLikeCount(likeCount + (isLike ? -1 : 1));
      setIsLike(!isLike);
    } else {
      dispatch(fetchUnfavoriteArticle(slug));
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
        <span className={`${!isAuth ? '' : classes.pointer} ${classes['custom-checkbox']}`} />
        {likeCount}
      </label>
    </div>
  );
};

export default Favorite;
