import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  decks: [],
  currentDeck: null,
  loadingDecks: false
};

export const getDecks = createAsyncThunk(
  'deck/getDecks',
  async () => {
    const response = await (
      new Promise((resolve) => (
        setTimeout(() => resolve([
          {
            deckId: "d61f8767-81f5-49a7-a511-221ef75e02d8",
            title: "Basic Multiplication",
            cardCount: 4,
            createdDate: "1990-01-01T00:00:00.000Z",
            lastModifiedDate: "1990-01-01T00:00:00.000Z"
          },
          {
            deckId: "87239f06-c84a-4ac8-b21c-7f43ba3c5dfa",
            title: "Deck 2",
            cardCount: 5,
            createdDate: "1990-01-02T00:00:00.000Z",
            lastModifiedDate: "1990-01-02T00:00:00.000Z"
          },
          {
            deckId: "0272e732-7428-43eb-999a-dfc54f0a4276",
            title: "Deck 3",
            cardCount: 2,
            createdDate: "1990-01-03T00:00:00.000Z",
            lastModifiedDate: "1990-01-03T00:00:00.000Z"
          },
          {
            deckId: "97feb584-07a9-47f7-b31f-9de6bfa13ddd",
            title: "Deck 4",
            cardCount: 7,
            createdDate: "1990-01-04T00:00:00.000Z",
            lastModifiedDate: "1990-01-04T00:00:00.000Z"
          }
        ]), 1000)
      ))
    );
    return response;
  }
);

export const deckSlice = createSlice({
  name: "deck",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getDecks.pending, (state) => {
        state.loadingDecks = true;
      })
      .addCase(getDecks.fulfilled, (state, action) => {
        state.loadingDecks = false;
        state.decks = action.payload;
      });
  }
});

export const selectDecks = (state) => state.deck.decks;
export const selectLoadingDecks = (state) => state.deck.loadingDecks;

export default deckSlice.reducer;
