import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { login, refresh, logout } from './authActions';

const initialAuthState = {
  loading: false,
  error: null,
  isLoggedIn: false,
  token: null,
  tokenExpiresAt: null,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    setLoginState(state, action) {
      state.loading = false;
      state.isLoggedIn = true;
      state.token = action.payload;
      state.tokenExpiresAt = Date.now() + 86400000;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.token = null;
        state.tokenExpiresAt = null;
      })
      .addMatcher(
        isAnyOf(login.fulfilled, refresh.fulfilled),
        (state, action) => {
          state.loading = false;
          if(action.payload.user.status==='active') {     
            state.isLoggedIn = true;
          }  
          state.token = action.payload.token;
          state.tokenExpiresAt = Date.now() + 86400000;
        },
      )
      .addMatcher(isAnyOf(login.pending, refresh.pending), (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addMatcher(
        isAnyOf(login.rejected, refresh.rejected),
        (state, action) => {
          state.loading = false;
        },
      );
  },
});

export const { setLoginState } = authSlice.actions;
export default authSlice.reducer;
