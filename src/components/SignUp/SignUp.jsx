import { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from '../App.module.scss';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  return (
    <div className={`${classes.modal} ${classes['sign-up']}`}>
      <h2 className={classes['modal-header']}>Create new account</h2>
      <form className={classes.form}>
        <label className={classes['form-label']} htmlFor="username">
          Username
          <input
            type="text"
            id="username"
            className={classes['form-text-input']}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </label>
        <label className={classes['form-label']} htmlFor="email">
          Email address
          <input
            type="email"
            id="email"
            className={classes['form-text-input']}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
          />
        </label>
        <label className={classes['form-label']} htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            className={classes['form-text-input']}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </label>
        <label className={classes['form-label']} htmlFor="repeatPassword">
          Repeat Password
          <input
            type="password"
            id="repeatPassword"
            className={classes['form-text-input']}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            placeholder="Password"
          />
        </label>
        <label className={classes['form-agreement']} htmlFor="agreement">
          <input className={classes['form-checkbox']} type="checkbox" id="agreement" />I agree to the processing of my
          personal information
        </label>
        <button className={classes['form-btn']} type="submit">
          Create
        </button>
        <p className={classes['form-description']}>
          Already have an account?{' '}
          <Link to="/sign-in" className={classes['form-description-link']}>
            Sign In.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
