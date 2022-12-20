import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  clearAuthentication
} from '../auth/authSlice';
import {
  clearDecks
} from '../deck/deckSlice';
import {
  clearCards
} from '../cards/cardSlice';

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCards());
    dispatch(clearDecks());
    dispatch(clearAuthentication());
  }, []);

  return null;
};

export default Logout;
