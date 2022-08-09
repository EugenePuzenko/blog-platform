import { Outlet, Link } from 'react-router-dom';
import classes from '../App.module.scss';
import useAuth from '../hooks/useAuth';
import imgPlaceholder from '../../assets/img/img-placeholder.png';

const Layout = () => {
  const { isAuth, username, image } = useAuth();
  const userAvatar = image || imgPlaceholder;

  return (
    <>
      <header className={classes.header}>
        <h1 className={classes['header-text']}>Realworld Blog</h1>
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
            <Link to="/" className={classes['create-btn']}>
              Create article
            </Link>
            <Link to="profile">
              <div>
                <span className={classes.username}>{username}</span>
                <img src={userAvatar} alt="user-avatar" />
              </div>
            </Link>
            <Link to="/" type="button" className={`${classes.btn} ${classes['btn-log-out']}`}>
              Log Out
            </Link>
          </div>
        )}
      </header>
      <main className={classes.main}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
