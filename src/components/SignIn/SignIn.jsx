import { Link } from 'react-router-dom';
import classes from '../App.module.scss';

const SignIn = () => {
  return (
    <div className={`${classes.modal} ${classes['sign-up']}`}>
      <h2 className={classes['modal-header']}>Sign In</h2>
      <form className={classes.form}>
        <label className={classes['form-label']} htmlFor="email">
          Email address
          <input type="email" id="email" className={classes['form-text-input']} placeholder="Email address" />
        </label>
        <label className={classes['form-label']} htmlFor="password">
          Password
          <input type="password" id="password" className={classes['form-text-input']} placeholder="Password" />
        </label>
        <button className={classes['form-btn']} type="submit">
          Login
        </button>
        <p className={classes['form-description']}>
          Don’t have an account?{' '}
          <Link to="/sign-up" className={classes['form-description-link']}>
            Sign Up.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
