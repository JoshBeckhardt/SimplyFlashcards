import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { clearAuthentication, selectJwt } from '../auth/authSlice';

const initialState = {
  decks: [],
  loadingDecks: false,
  loadingDecksRejected: false
};

export const getDecks = createAsyncThunk(
  'deck/getDecks',
  async (data, thunkApi) => {
    const jwt = selectJwt(thunkApi.getState());

    const response = await fetch(`${process.env.REACT_APP_BACKEND_HOSTNAME}/decks`, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    });

    if (response.status === 401) {
      thunkApi.dispatch(clearAuthentication());
    }

    return await response.json();
  }
);

export const deckSlice = createSlice({
  name: "deck",
  initialState,
  reducers: {
    clearDecks: (state) => {
      state.decks = [];
      state.loadingDecks = false;
      state.loadingDecksRejected = false;
    }
  },
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

export const { clearDecks } = deckSlice.actions;

export default deckSlice.reducer;
