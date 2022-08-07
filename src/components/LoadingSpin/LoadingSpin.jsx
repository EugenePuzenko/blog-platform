import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import classes from '../App.module.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 34 }} spin />;

const LoadingSpin = () => {
  return (
    <div className={classes['article-spin']}>
      <Spin indicator={antIcon} />
    </div>
  );
};

export default LoadingSpin;
