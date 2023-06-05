import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRouteLogin = () => {
  const [userState] = useContext(UserContext);

  if (!userState.isLogin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export const PrivateRouteUser = () => {
  const [userState] = useContext(UserContext);

  if (userState.user.role === 'partner') {
    return <Navigate to={'/transaction-table'} />;
  }
  return <Outlet />;
};

export const PrivateRouteAdmin = () => {
  const [userState] = useContext(UserContext);

  if (userState.user.role !== 'partner') {
    return <Navigate to={'/'} />;
  }
  return <Outlet />;
};
