import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  decks: [],
  loadingDecks: false,
  loadingDecksRejected: false,

  currentDeckId: null,
  currentDeckCards: [],
  loadingCurrentDeckCards: false,
  loadingCurrentDeckCardsRejected: false
};

export const getDecks = createAsyncThunk(
  'deck/getDecks',
  async () => {
    const response = await fetch("https://localhost:7250/decks");
    return await response.json();
  }
);

export const deckSlice = createSlice({
  name: "deck",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getDecks.pending, (state) => {
        state.loadingDecks = true;
        state.loadingDecksRejected = false;
        state.decks = [];
      })
      .addCase(getDecks.fulfilled, (state, action) => {
        state.loadingDecks = false;
        state.loadingDecksRejected = false;
        state.decks = action.payload;
      })
      .addCase(getDecks.rejected, (state) => {
        state.loadingDecks = false;
        state.loadingDecksRejected = true;
        state.decks = [];
      });
  }
});

export const selectDecks = (state) => state.deck.decks;
export const selectLoadingDecks = (state) => state.deck.loadingDecks;
export const selectLoadingDecksRejected = (state) => state.deck.loadingDecksRejected;

export default deckSlice.reducer;
