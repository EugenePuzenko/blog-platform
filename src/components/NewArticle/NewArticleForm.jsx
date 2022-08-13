import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import classes from '../App.module.scss';

const NewArticleForm = ({ formTitle, article, handlerFormSubmit }) => {
  const formSchema = Yup.object().shape({
    title: Yup.string().required('Поле обязательно к заполнению.'),
    description: Yup.string().required('Поле обязательно к заполнению.'),
    body: Yup.string().required('Поле обязательно к заполнению.'),
  });

  const [tagList, setTagList] = useState(article?.tagList || []);
  const [tagValue, setTagValue] = useState('');

  const addTag = () => {
    setTagList([...tagList, tagValue]);
    setTagValue('');
  };

  const deleteTag = (id) => {
    setTagList(tagList.filter((_, index) => index !== id));
  };

  const onSubmit = (data) => {
    handlerFormSubmit({ ...data }, tagList);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: article?.title || '',
      description: article?.description || '',
      body: article?.body || '',
    },
    mode: 'onBlur',
    resolver: yupResolver(formSchema),
  });

  return (
    <div className={`${classes.modal} ${classes['article-form']}`}>
      <h2 className={classes['modal-header']}>{formTitle}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <label className={classes['form-label']} htmlFor="title">
          Title
          <input
            {...register('title')}
            // onChange={() => dispatch(closeAlert())}
            type="text"
            id="title"
            className={classes['form-text-input']}
            placeholder="Title"
          />
          <div className={classes['form-error-message']}>
            {errors?.title && <p>{errors?.title?.message || 'error'}</p>}
          </div>
        </label>
        <label className={classes['form-label']} htmlFor="description">
          Short description
          <input
            {...register('description')}
            // onChange={() => dispatch(closeAlert())}
            type="text"
            id="description"
            className={classes['form-text-input']}
            placeholder="Short description"
          />
          <div className={classes['form-error-message']}>
            {errors?.description && <p>{errors?.description?.message || 'error'}</p>}
          </div>
        </label>
        <label className={classes['form-label']} htmlFor="body">
          Text
          <textarea
            {...register('body')}
            // onChange={() => dispatch(closeAlert())}
            type="text"
            id="body"
            className={`${classes['form-text-input']} ${classes['text-area']}`}
            placeholder="Text"
          />
          <div className={classes['form-error-message']}>
            {errors?.body && <p>{errors?.body?.message || 'error'}</p>}
          </div>
        </label>
        <div className={classes['form-label']}>
          <p>Tags</p>
          {tagList &&
            tagList.map((item, id) => (
              <div key={uuidv4()}>
                <input
                  // onChange={() => dispatch(closeAlert())}
                  disabled
                  id={id}
                  value={item}
                  type="text"
                  className={`${classes['form-text-input']} ${classes['form-tag-input']}`}
                />
                <button
                  onClick={() => deleteTag(id)}
                  type="button"
                  className={`${classes['delete-btn']} ${classes['tag-btn']}`}
                >
                  Delete
                </button>
              </div>
            ))}
          <input
            onChange={(e) => {
              setTagValue(e.target.value);
            }}
            value={tagValue}
            type="text"
            id="tag"
            className={`${classes['form-text-input']} ${classes['form-tag-input']}`}
            placeholder="Tag"
          />
          <button onClick={addTag} type="button" className={`${classes['add-btn']} ${classes['tag-btn']}`}>
            Add tag
          </button>
        </div>
        <button className={`${classes['form-btn']} ${classes['form-btn-send']}`} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default NewArticleForm;
