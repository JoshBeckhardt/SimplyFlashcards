import { configureStore } from '@reduxjs/toolkit';
import deckReducer from '../features/deck/deckSlice';

export const store = configureStore({
  reducer: {
    deck: deckReducer
  },
});
