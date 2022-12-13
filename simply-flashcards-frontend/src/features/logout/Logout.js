import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  clearAuthentication
} from '../auth/authSlice';

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearAuthentication());
  }, []);

  return null;
};

export default Logout;
