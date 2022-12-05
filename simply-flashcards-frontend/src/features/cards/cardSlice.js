import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentDeckId: null,
  currentDeckTitle: "",
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

    if (response.status !== 200) {
      return {
        deckId: null,
        cards: null
      };
    }

    const responseJson = await response.json();

    return {
      deckId,
      cards: responseJson
    };
  }
);

export const submitEditedDeckTitle = createAsyncThunk(
  'deck/submitEditedDeckTitle',
  async (data) => {
    const { deckId, deckTitle } = data;
    const response = await fetch(`${process.env.REACT_APP_BACKEND_HOSTNAME}/decks/${deckId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        deckId,
        title: deckTitle
      })
    });
    return await response.json();
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

    if (response.status !== 200) {
      return {
        deckId: null,
        cards: null
      };
    }

    const responseJson = await response.json();

    return {
      deckId,
      cards: responseJson
    };
  }
);

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setDeckTitle: (state, action) => {
      state.currentDeckTitle = action.payload;
    }
  },
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
      })

      .addCase(submitEditedDeckTitle.fulfilled, (state, action) => {
        state.currentDeckTitle = action.payload.title;
      })
  }
});

export const selectCurrentDeckId = (state) => state.cards.currentDeckId;
export const selectCurrentDeckTitle = (state) => state.cards.currentDeckTitle;
export const selectCurrentDeckCards = (state) => state.cards.currentDeckCards;
export const selectLoadingCurrentDeckCards = (state) => state.cards.loadingCurrentDeckCards;
export const selectLoadingCurrentDeckCardsRejected = (state) => state.cards.loadingCurrentDeckCardsRejected;

export const { setDeckTitle } = cardSlice.actions;

export default cardSlice.reducer;
