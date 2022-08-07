import { Outlet, Link } from 'react-router-dom';
import classes from '../App.module.scss';

const Layout = () => {
  return (
    <>
      <header className={classes.header}>
        <h1 className={classes['header-text']}>Realworld Blog</h1>
        <div className={classes['header-authorization']}>
          <Link to="/sign-in" className={classes.btn}>
            Sign In
          </Link>
          <Link to="sign-up" type="button" className={`${classes.btn} ${classes['btn-sign-up']}`}>
            Sign Up
          </Link>
        </div>
      </header>
      <main className={classes.main}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
