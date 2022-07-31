import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import classes from './App.module.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function LoadingSpin() {
  return (
    <div className={classes['loading-message']}>
      <Spin indicator={antIcon} />
      <div>Не все билеты ещё загружены...</div>
    </div>
  );
}

export default LoadingSpin;
