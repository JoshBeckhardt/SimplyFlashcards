import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentDeckId: null,
  currentDeckCards: [],
  loadingCurrentDeckCards: false,
  loadingCurrentDeckCardsRejected: false
};

export const chooseDeck = createAsyncThunk(
  'cards/chooseDeck',
  async (deckId) => {
    const response = await fetch(`https://localhost:7250/cards/${deckId}`);
    const responseJson = await response.json();

    return {
      deckId: deckId,
      cards: responseJson
    };
  }
);

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(chooseDeck.pending, (state) => {
        state.loadingCurrentDeckCards = true;
        state.loadingCurrentDeckCardsRejected = false;
        state.currentDeckId = null;
        state.currentDeckCards = [];
      })
      .addCase(chooseDeck.fulfilled, (state, action) => {
        state.loadingCurrentDeckCards = false;
        state.loadingCurrentDeckCardsRejected = false;
        state.currentDeckId = action.payload.deckId;
        state.currentDeckCards = action.payload.cards;
      })
      .addCase(chooseDeck.rejected, (state) => {
        state.loadingCurrentDeckCards = false;
        state.loadingCurrentDeckCardsRejected = true;
        state.currentDeckId = null;
        state.currentDeckCards = [];
      });
  }
});

export const selectCurrentDeckId = (state) => state.cards.currentDeckId;
export const selectCurrentDeckCards = (state) => state.cards.currentDeckCards;
export const selectLoadingCurrentDeckCards = (state) => state.cards.loadingCurrentDeckCards;
export const selectLoadingCurrentDeckCardsRejected = (state) => state.cards.loadingCurrentDeckCardsRejected;

export default cardSlice.reducer;
