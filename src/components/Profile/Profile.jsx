/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Alert } from 'antd';
import classes from '../App.module.scss';
import useAuth from '../hooks/useAuth';
import { fetchUpdateCurrentUser } from '../../store/userSlice';

const SignUp = () => {
  const formSchema = Yup.object().shape({
    username: Yup.string()
      .required('Поле обязательно к заполнению.')
      .matches(/^[A-Za-z0-9]*$/, 'Имя может содержать только английские буквы.')
      .min(3, 'Имя не может быть меньше 3 символов.')
      .max(20, 'Имя не может быть больше 20 символов.'),
    email: Yup.string().required('Поле обязательно к заполнению.').email('Почтовый адрес должен быть корректным.'),
    password: Yup.string()
      .min(6, 'Пароль не может быть меньше 6 символов.')
      .max(40, 'Пароль не может быть больше 40 символов.'),
    image: Yup.string()
      .required('Поле обязательно к заполнению.')
      .matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/, 'url адрес должен быть ссылкой на картинку.'),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userEditProfileStatus = useSelector((state) => state.user.userEditProfileStatus);
  const errorEditProfileServer = useSelector((state) => state.user.errorEditProfileServer);

  useEffect(() => {
    if (userEditProfileStatus === 'fulfilled') {
      navigate('/');
    }
  }, [dispatch, navigate, userEditProfileStatus]);

  const token = localStorage.getItem('token');

  const { username, email, image, bio } = useAuth();

  const onSubmit = (data) => {
    dispatch(fetchUpdateCurrentUser({ ...data, bio, token }));
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      username,
      email,
      image,
    },
    mode: 'onBlur',
    resolver: yupResolver(formSchema),
  });

  return (
    <>
      {errorEditProfileServer && (
        <Alert
          description="Как минимум одно поле должно быть обновлено."
          type="info"
          style={{ width: '30%', margin: '0 auto' }}
          closable
        />
      )}
      <div className={`${classes.modal} ${classes['sign-up']}`}>
        <h2 className={classes['modal-header']}>Edit Profile</h2>
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
            </div>
          </label>
          <label className={classes['form-label']} htmlFor="new-password">
            New password
            <input
              {...register('password')}
              type="password"
              id="new-password"
              className={`${classes['form-text-input']} ${errors?.password ? classes['invalid-input'] : ''}`}
              placeholder="New password"
            />
            <div className={classes['form-error-message']}>
              {errors?.password && <p>{errors?.password?.message || 'error'}</p>}
            </div>
          </label>
          <label className={classes['form-label']} htmlFor="avatar-image">
            Avatar image (url)
            <input
              {...register('image')}
              type="text"
              id="avatar-image"
              className={`${classes['form-text-input']} ${errors?.image ? classes['invalid-input'] : ''}`}
              placeholder="Avatar image"
            />
            <div className={classes['form-error-message']}>
              {errors?.image && <p>{errors?.image?.message || 'error'}</p>}
            </div>
          </label>
          <button aria-label="Save" type="submit" className={classes['form-btn']}>
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
