import { useSelector } from 'react-redux';
import { selectUser } from '../../store/selectors';

const useAuth = () => {
  const { username, email, bio, image, userRequestStatus, errorUserServer, userIsEdit } = useSelector(selectUser);

  const userInfo = {
    isAuth: !!localStorage.getItem('token'),
    username,
    email,
    bio,
    image,
    userRequestStatus,
    errorUserServer,
    userIsEdit,
  };

  return userInfo;
};

export default useAuth;
