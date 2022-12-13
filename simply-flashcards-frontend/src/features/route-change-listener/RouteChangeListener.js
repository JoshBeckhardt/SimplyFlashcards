import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import * as constants from '../../constants';
import {
  clearAuthentication,
  selectIsAuthenticated
} from '../auth/authSlice';

const RouteChangeListener = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (location.pathname === `/${constants.LOGIN}` || location.pathname === `/${constants.SIGNUP}`) {
      dispatch(clearAuthentication());
    }
  }, [location]);

  return null;
}

export default RouteChangeListener;
