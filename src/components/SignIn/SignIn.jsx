import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Alert } from 'antd';
import classes from '../App.module.scss';
import { fetchSignInUser } from '../../store/userSlice';
import {
  selectUserRequestStatus,
  selectLoginUserLoading,
  selectInvalidSignIn,
  selectLoginUserError,
} from '../../store/selectors';
import LoadingSpin from '../LoadingSpin/LoadingSpin';

const SignIn = () => {
  const formSchema = Yup.object().shape({
    email: Yup.string().required('Поле обязательно к заполнению.').email('Почтовый адрес должен быть корректным.'),
    password: Yup.string().required('Поле обязательно к заполнению.'),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRequestStatus = useSelector(selectUserRequestStatus);
  const loginUserLoading = useSelector(selectLoginUserLoading);
  const invalidSignIn = useSelector(selectInvalidSignIn);
  const loginUserError = useSelector(selectLoginUserError);

  useEffect(() => {
    if (userRequestStatus === 'fulfilled') {
      navigate('/', { replace: true });
    }
  }, [dispatch, navigate, userRequestStatus]);

  const onSubmit = (data) => {
    dispatch(fetchSignInUser(data));
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur', resolver: yupResolver(formSchema) });

  return (
    <div className={`${classes.modal} ${classes['sign-up']}`}>
      {loginUserLoading && (
        <div className={`${classes.spin} ${classes['sign-in-spin']}`}>
          <LoadingSpin />
        </div>
      )}
      {loginUserError && (
        <Alert
          style={{ width: '100%', margin: '0 auto', marginBottom: '26px' }}
          message="Ошибка редактирования профиля."
          type="error"
          closable
        />
      )}
      <h2 className={classes['modal-header']}>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <label className={classes['form-label']} htmlFor="email">
          Email address
          <input
            {...register('email')}
            type="email"
            id="email"
            className={classes['form-text-input']}
            placeholder="Email address"
          />
          <div className={classes['form-error-message']}>
            {errors?.email && <p>{errors?.email?.message || 'error'}</p>}
            {invalidSignIn && invalidSignIn['email or password'] && <p>Неверный email или пароль.</p>}
          </div>
        </label>
        <label className={classes['form-label']} htmlFor="password">
          Password
          <input
            {...register('password')}
            type="password"
            id="password"
            className={classes['form-text-input']}
            placeholder="Password"
          />
          <div className={classes['form-error-message']}>
            {errors?.password && <p>{errors?.password?.message || 'error'}</p>}
            {invalidSignIn && invalidSignIn['email or password'] && <p>Неверный email или пароль.</p>}
          </div>
        </label>
        <button aria-label="Login" className={classes['form-btn']} type="submit">
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
