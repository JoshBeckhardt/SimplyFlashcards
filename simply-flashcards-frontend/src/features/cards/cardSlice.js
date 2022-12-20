import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { clearAuthentication, selectJwt } from '../auth/authSlice';

const initialState = {
  currentDeckId: null,
  currentDeckTitle: "",
  currentDeckCards: [],
  loadingCurrentDeckCards: false,
  loadingCurrentDeckCardsRejected: false
};

export const chooseDeck = createAsyncThunk(
  'cards/chooseDeck',
  async (deckId, thunkApi) => {
    if (deckId === null) {
      return {
        deckId: null,
        cards: []
      };
    }

    const jwt = selectJwt(thunkApi.getState());

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_HOSTNAME}/cards/${deckId}`, {
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      }
    );

    if (response.status !== 200) {
      if (response.status === 401) {
        thunkApi.dispatch(clearAuthentication());
      }

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
  async (data, thunkApi) => {
    const { deckId, deckTitle } = data;

    const jwt = selectJwt(thunkApi.getState());

    const response = await fetch(`${process.env.REACT_APP_BACKEND_HOSTNAME}/decks/${deckId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      body: JSON.stringify({
        deckId,
        title: deckTitle
      })
    });

    if (response.status === 401) {
      thunkApi.dispatch(clearAuthentication());
    }

    return await response.json();
  }
);

export const submitEditedDeck = createAsyncThunk(
  'cards/submitEditedDeck',
  async (data, thunkApi) => {
    const { deckId, cards } = data;

    const jwt = selectJwt(thunkApi.getState());

    const response = await fetch(`${process.env.REACT_APP_BACKEND_HOSTNAME}/cards/${deckId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      body: JSON.stringify(cards)
    });

    if (response.status !== 200) {
      if (response.status === 401) {
        thunkApi.dispatch(clearAuthentication());
      }

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

export const deleteDeck = createAsyncThunk(
  'deck/deleteDeck',
  async (deckId, thunkApi) => {
    const jwt = selectJwt(thunkApi.getState());

    const response = await fetch(`${process.env.REACT_APP_BACKEND_HOSTNAME}/decks/${deckId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    });

    if (response.status === 401) {
      thunkApi.dispatch(clearAuthentication());
    }
  }
);

export const submitNewDeck = createAsyncThunk(
  'deck/submitNewDeck',
  async (data, thunkApi) => {
    const { title, cards } = data;

    const jwt = selectJwt(thunkApi.getState());

    const response = await fetch(`${process.env.REACT_APP_BACKEND_HOSTNAME}/decks?title=${encodeURIComponent(title)}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      body: JSON.stringify(cards)
    });

    if (response.status === 401) {
      thunkApi.dispatch(clearAuthentication());
    }

    const responseJson = await response.json();

    return {
      deckId: responseJson.deckId,
      cards: responseJson.cards,
      title
    };
  }
);

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setDeckTitle: (state, action) => {
      state.currentDeckTitle = action.payload;
    },
    clearCards: (state) => {
      state.currentDeckId = null;
      state.currentDeckTitle = "";
      state.currentDeckCards = [];
      state.loadingCurrentDeckCards = false;
      state.loadingCurrentDeckCardsRejected = false;
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

      .addCase(deleteDeck.pending, (state) => {
        state.loadingCurrentDeckCards = true;
        state.loadingCurrentDeckCardsRejected = false;
      })
      .addCase(deleteDeck.fulfilled, (state) => {
        state.loadingCurrentDeckCards = false;
        state.loadingCurrentDeckCardsRejected = false;
        state.currentDeckId = null;
        state.currentDeckCards = [];
      })
      .addCase(deleteDeck.rejected, (state) => {
        state.loadingCurrentDeckCards = false;
        state.loadingCurrentDeckCardsRejected = true;
      })

      .addCase(submitNewDeck.pending, (state) => {
        state.loadingCurrentDeckCards = true;
        state.loadingCurrentDeckCardsRejected = false;
        state.currentDeckId = null;
        state.currentDeckCards = [];
      })
      .addCase(submitNewDeck.fulfilled, (state, action) => {
        state.loadingCurrentDeckCards = false;
        state.loadingCurrentDeckCardsRejected = false;
        state.currentDeckId = action.payload.deckId;
        state.currentDeckCards = action.payload.cards;
        state.currentDeckTitle = action.payload.title;
      })
      .addCase(submitNewDeck.rejected, (state) => {
        state.loadingCurrentDeckCards = false;
        state.loadingCurrentDeckCardsRejected = true;
        state.currentDeckId = null;
        state.currentDeckCards = [];
      });
  }
});

export const selectCurrentDeckId = (state) => state.cards.currentDeckId;
export const selectCurrentDeckTitle = (state) => state.cards.currentDeckTitle;
export const selectCurrentDeckCards = (state) => state.cards.currentDeckCards;
export const selectLoadingCurrentDeckCards = (state) => state.cards.loadingCurrentDeckCards;
export const selectLoadingCurrentDeckCardsRejected = (state) => state.cards.loadingCurrentDeckCardsRejected;

export const { setDeckTitle, clearCards } = cardSlice.actions;

export default cardSlice.reducer;
