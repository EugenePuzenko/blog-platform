/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from 'antd';
import * as Yup from 'yup';
import classes from '../App.module.scss';
import { fetchCreateUser } from '../../store/userSlice';
import {
  selectUserRequestStatus,
  selectInvalidSignUp,
  selectCreateUserLoading,
  selectCreateUserError,
} from '../../store/selectors';
import LoadingSpin from '../LoadingSpin/LoadingSpin';

const SignUp = () => {
  const formSchema = Yup.object().shape({
    username: Yup.string()
      .required('Поле обязательно к заполнению.')
      .min(3, 'Имя не может быть меньше 3 символов.')
      .max(20, 'Имя не может быть больше 20 символов.'),
    email: Yup.string().required('Поле обязательно к заполнению.').email('Почтовый адрес должен быть корректным.'),
    password: Yup.string()
      .required('Поле обязательно к заполнению.')
      .min(6, 'Пароль не может быть меньше 6 символов.')
      .max(40, 'Пароль не может быть больше 40 символов.'),
    repeatPassword: Yup.string()
      .required('Поле обязательно к заполнению.')
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
    agreement: Yup.bool().oneOf([true], 'Подтвердите согласие на обработку персональных данных'),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createUserLoading = useSelector(selectCreateUserLoading);
  const userRequestStatus = useSelector(selectUserRequestStatus);
  const invalidSignUp = useSelector(selectInvalidSignUp);
  const createUserError = useSelector(selectCreateUserError);

  useEffect(() => {
    if (userRequestStatus === 'fulfilled') {
      navigate('/', { replace: true });
    }
  }, [dispatch, navigate, userRequestStatus]);

  const onSubmit = (data) => {
    dispatch(fetchCreateUser(data));
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur', resolver: yupResolver(formSchema) });

  return (
    <div className={`${classes.modal} ${classes['sign-up']}`} style={{ position: 'relative' }}>
      {createUserLoading && (
        <div className={`${classes.spin} ${classes['sign-up-spin']}`}>
          <LoadingSpin />
        </div>
      )}
      {createUserError && (
        <Alert
          style={{ width: '100%', margin: '0 auto', marginBottom: '26px' }}
          message="Ошибка регистрации."
          type="error"
          closable
        />
      )}
      <h2 className={classes['modal-header']}>Create new account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <label className={classes['form-label']} htmlFor="username">
          Username
          <input
            {...register('username')}
            type="text"
            id="username"
            className={`${classes['form-text-input']} ${errors?.username ? classes['invalid-input'] : ''}`}
            placeholder="Username"
          />
          <div className={classes['form-error-message']}>
            {errors?.username && <p>{errors?.username?.message || 'error'}</p>}
            {invalidSignUp && invalidSignUp.username && <p>{'Такой username уже используется.' || 'error'}</p>}
          </div>
        </label>
        <label className={classes['form-label']} htmlFor="email">
          Email address
          <input
            {...register('email')}
            type="email"
            id="email"
            className={`${classes['form-text-input']} ${errors?.email ? classes['invalid-input'] : ''}`}
            placeholder="Email address"
          />
          <div className={classes['form-error-message']}>
            {errors?.email && <p>{errors?.email?.message || 'error'}</p>}
            {invalidSignUp && invalidSignUp.email && <p>{'Такой email уже используется.' || 'error'}</p>}
          </div>
        </label>
        <label className={classes['form-label']} htmlFor="password">
          Password
          <input
            {...register('password')}
            type="password"
            id="password"
            className={`${classes['form-text-input']} ${errors?.password ? classes['invalid-input'] : ''}`}
            placeholder="Password"
          />
          <div className={classes['form-error-message']}>
            {errors?.password && <p>{errors?.password?.message || 'error'}</p>}
          </div>
        </label>
        <label className={classes['form-label']} htmlFor="repeatPassword">
          Repeat Password
          <input
            {...register('repeatPassword')}
            type="password"
            id="repeatPassword"
            className={`${classes['form-text-input']} ${errors?.repeatPassword ? classes['invalid-input'] : ''}`}
            placeholder="Password"
          />
          <div className={classes['form-error-message']}>
            {errors?.repeatPassword && <p>{errors?.repeatPassword?.message || 'error'}</p>}
          </div>
        </label>
        <label className={classes['form-agreement']} htmlFor="agreement">
          <input
            {...register('agreement')}
            className={`${classes['form-checkbox']} ${errors?.agreement ? classes['invalid-input'] : ''}`}
            type="checkbox"
            id="agreement"
          />
          I agree to the processing of my personal information
        </label>
        <div className={classes['form-error-message']}>
          {errors?.agreement && <p>{errors?.agreement?.message || 'error'}</p>}
        </div>
        <button aria-label="Create" type="submit" className={classes['form-btn']}>
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
