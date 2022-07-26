import { Outlet, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classes from '../App.module.scss';
import useAuth from '../hooks/useAuth';
import imgPlaceholder from '../../assets/img/img-placeholder.jpg';
import { logOut } from '../../store/userSlice';

const Layout = ({ isOnline }) => {
  const dispatch = useDispatch();

  const { isAuth, username, image } = useAuth();

  return (
    <>
      <header className={classes.header}>
        <Link to="/">
          <h1 className={classes['header-text']}>Realworld Blog</h1>
        </Link>
        {!isAuth && (
          <div className={classes['header-authorization']}>
            <Link to="sign-in" className={classes.btn}>
              Sign In
            </Link>
            <Link to="sign-up" type="button" className={`${classes.btn} ${classes['btn-sign-up']}`}>
              Sign Up
            </Link>
          </div>
        )}
        {isAuth && (
          <div className={`${classes['header-authorization']} ${classes['loged-in']}`}>
            <Link to="new-article" className={classes['create-btn']}>
              Create article
            </Link>
            <Link to="profile">
              <div>
                <span className={classes.username}>{username}</span>
                <img
                  src={image || imgPlaceholder}
                  onError={(e) => {
                    e.currentTarget.src = imgPlaceholder;
                  }}
                  className={classes['user-avatar']}
                  alt="user-avatar"
                />
              </div>
            </Link>
            <Link to="/">
              <button
                onClick={() => dispatch(logOut())}
                type="button"
                className={`${classes.btn} ${classes['btn-log-out']}`}
              >
                Log Out
              </button>
            </Link>
          </div>
        )}
      </header>
      {!isOnline && <div className={classes['offline-message']}>Нет подключения к интернету</div>}
      <main className={classes.main}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
