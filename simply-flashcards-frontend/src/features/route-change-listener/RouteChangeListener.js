import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import * as constants from '../../constants';
import {
  clearAuthentication
} from '../auth/authSlice';
import {
  clearDecks
} from '../deck/deckSlice';
import {
  clearCards
} from '../cards/cardSlice';

const RouteChangeListener = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === `/${constants.LOGIN}` || location.pathname === `/${constants.SIGNUP}`) {
      dispatch(clearCards());
      dispatch(clearDecks());
      dispatch(clearAuthentication());
    }
  }, [location]);

  return null;
}

export default RouteChangeListener;
