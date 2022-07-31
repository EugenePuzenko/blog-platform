import classes from '../App.module.scss';

function Header() {
  return (
    <header className={classes.header}>
      <h1 className={classes['header-text']}>Realworld Blog</h1>
      <div className={classes['header-authorization']}>
        <button type="button" className={classes.btn}>
          Sign In
        </button>
        <button type="button" className={`${classes.btn} ${classes['btn-sign-up']}`}>
          Sign Up
        </button>
      </div>
    </header>
  );
}

export default Header;
