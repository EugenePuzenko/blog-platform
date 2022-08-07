import Skeleton from 'react-loading-skeleton';
import { v4 as uuidv4 } from 'uuid';
import classes from '../App.module.scss';

const ArticleSkeleton = ({ articles }) => {
  return Array(articles)
    .fill(0)
    .map(() => (
      <div className={classes.article} key={uuidv4()}>
        <div className={classes['article-text']}>
          <Skeleton count={4} />
        </div>
        <div className={classes.user}>
          <div className={classes['user-info']}>
            <div className={classes['user-name']}>
              <Skeleton />
            </div>
            <div className={classes['created-time']}>
              <Skeleton />
            </div>
          </div>
          <Skeleton circle width={46} height={46} />
        </div>
      </div>
    ));
};

export default ArticleSkeleton;
