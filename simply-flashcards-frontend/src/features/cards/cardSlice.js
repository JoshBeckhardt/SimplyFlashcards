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
    if (deckId === null) {
      return {
        deckId: null,
        cards: []
      };
    }

    const response = await fetch(`${process.env.REACT_APP_BACKEND_HOSTNAME}/cards/${deckId}`);
    const responseJson = await response.json();

    return {
      deckId: deckId,
      cards: responseJson
    };
  }
);

export const submitEditedDeck = createAsyncThunk(
  'cards/submitEditedDeck',
  async (data) => {
    const { deckId, cards } = data;
    const response = await fetch(`${process.env.REACT_APP_BACKEND_HOSTNAME}/cards/${deckId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cards)
    });
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
      })

      .addCase(submitEditedDeck.pending, (state) => {
        state.loadingCurrentDeckCards = true;
        state.loadingCurrentDeckCardsRejected = false;
        state.currentDeckId = null;
        state.currentDeckCards = [];
      })
      .addCase(submitEditedDeck.fulfilled, (state, action) => {
        state.loadingCurrentDeckCards = false;
        state.loadingCurrentDeckCardsRejected = false;
        state.currentDeckId = action.payload.deckId;
        state.currentDeckCards = action.payload.cards;
      })
      .addCase(submitEditedDeck.rejected, (state) => {
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
