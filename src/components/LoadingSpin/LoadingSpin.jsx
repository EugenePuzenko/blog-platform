import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 34 }} spin />;

const LoadingSpin = () => {
  return <Spin indicator={antIcon} />;
};

export default LoadingSpin;
