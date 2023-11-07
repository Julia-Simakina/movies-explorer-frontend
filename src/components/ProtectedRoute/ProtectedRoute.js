import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../../contexts/LoginContext';

const ProtectedRoute = ({ element: Component, ...props }) => {
  const { isLoggedIn } = useContext(LoginContext);
  console.log(isLoggedIn);
  return isLoggedIn ? <Component {...props} /> : <Navigate to='/' replace />;
};

export default ProtectedRoute;
