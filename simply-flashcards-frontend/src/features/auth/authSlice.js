import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  username: null,
  jwt: null,
  loading: false,
  rejectedReason: null
};

export const register = createAsyncThunk(
  'auth/register',
  async (data) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_HOSTNAME}/users/register`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.status !== 200) {
      if (response.status === 409) {
        return { errorOccurred: true, status: response.status, rejectedReason: "This username is already in use." };
      }
      return { errorOccurred: true, status: response.status, rejectedReason: "Something went wrong when attempting to register." };
    }

    return { ...(await response.json()), errorOccurred: false };
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (data) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_HOSTNAME}/users/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.status !== 200) {
      if (response.status === 400) {
        return { errorOccurred: true, status: response.status, rejectedReason: "All fields are required." };
      }

      if (response.status === 401) {
        return { errorOccurred: true, status: response.status, rejectedReason: "Wrong credentials." };
      }

      return { errorOccurred: true, status: response.status, rejectedReason: "Something went wrong while attempting to log in." };
    }

    return { ...(await response.json()), errorOccurred: false };
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthentication: (state) => {
      state.isAuthenticated = false;
      state.username = null;
      state.jwt = null;
      state.loading = false;
      state.rejectedReason = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isAuthenticated = false;
        state.username = null;
        state.jwt = null;
        state.loading = true;
        state.rejectedReason = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        if (action.payload.errorOccurred) {
          state.isAuthenticated = false;
          state.username = null;
          state.jwt = null;
          state.loading = false;
          state.rejectedReason = action.payload.rejectedReason;
        } else {
          state.isAuthenticated = true;
          state.username = action.payload.username;
          state.jwt = action.payload.jwt;
          state.loading = false;
          state.rejectedReason = null;
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.username = null;
        state.jwt = null;
        state.loading = false;
        state.rejectedReason = action.payload.rejectedReason;
      })

      .addCase(login.pending, (state) => {
        state.isAuthenticated = false;
        state.username = null;
        state.jwt = null;
        state.loading = true;
        state.rejectedReason = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.errorOccurred) {
          state.isAuthenticated = false;
          state.username = null;
          state.jwt = null;
          state.loading = false;
          state.rejectedReason = action.payload.rejectedReason;
        } else {
          state.isAuthenticated = true;
          state.username = action.payload.username;
          state.jwt = action.payload.jwt;
          state.loading = false;
          state.rejectedReason = null;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.username = null;
        state.jwt = null;
        state.loading = false;
        state.rejectedReason = action.payload.rejectedReason;
      });
  }
});

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthRejectedReason = (state) => state.auth.rejectedReason;
export const selectUsername = (state) => state.auth.username;
export const selectJwt = (state) => state.auth.jwt;

export const { clearAuthentication } = authSlice.actions;

export default authSlice.reducer;
