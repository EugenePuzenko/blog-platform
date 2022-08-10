import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Alert } from 'antd';
import classes from '../App.module.scss';
import { fetchSignInUser, closeAlert } from '../../store/userSlice';

const SignIn = () => {
  const formSchema = Yup.object().shape({
    email: Yup.string().required('Поле обязательно к заполнению.').email('Почтовый адрес должен быть корректным.'),
    password: Yup.string().required('Поле обязательно к заполнению.'),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userRequestStatus = useSelector((state) => state.user.userRequestStatus);
  const errorSignInServer = useSelector((state) => state.user.errorSignInServer);
  // const userIsEdit = useSelector((state) => state.user.userIsEdit);

  const fromPage = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (userRequestStatus === 'fulfilled') {
      navigate(fromPage, { replace: true });
    }
  }, [dispatch, navigate, fromPage, userRequestStatus]);

  const onSubmit = (data) => {
    dispatch(fetchSignInUser(data));
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur', resolver: yupResolver(formSchema) });

  return (
    <>
      {errorSignInServer && (
        <Alert
          description="Ошибка. Неверные данные пользователя."
          type="info"
          style={{ width: '30%', margin: '0 auto' }}
          closable
        />
      )}
      <div className={`${classes.modal} ${classes['sign-up']}`}>
        <h2 className={classes['modal-header']}>Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <label className={classes['form-label']} htmlFor="email">
            Email address
            <input
              {...register('email')}
              onChange={() => dispatch(closeAlert())}
              type="email"
              id="email"
              className={classes['form-text-input']}
              placeholder="Email address"
            />
            <div className={classes['form-error-message']}>
              {errors?.email && <p>{errors?.email?.message || 'error'}</p>}
            </div>
          </label>
          <label className={classes['form-label']} htmlFor="password">
            Password
            <input
              {...register('password')}
              onChange={() => dispatch(closeAlert())}
              type="password"
              id="password"
              className={classes['form-text-input']}
              placeholder="Password"
            />
            <div className={classes['form-error-message']}>
              {errors?.password && <p>{errors?.password?.message || 'error'}</p>}
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
    </>
  );
};

export default SignIn;
