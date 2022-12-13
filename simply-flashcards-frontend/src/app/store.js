import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import deckReducer from '../features/deck/deckSlice';
import cardsReducer from '../features/cards/cardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    deck: deckReducer,
    cards: cardsReducer
  },
});
