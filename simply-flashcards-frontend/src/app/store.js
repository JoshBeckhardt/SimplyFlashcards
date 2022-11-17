import { configureStore } from '@reduxjs/toolkit';
import deckReducer from '../features/deck/deckSlice';
import cardsReducer from '../features/cards/cardSlice';

export const store = configureStore({
  reducer: {
    deck: deckReducer,
    cards: cardsReducer
  },
});
