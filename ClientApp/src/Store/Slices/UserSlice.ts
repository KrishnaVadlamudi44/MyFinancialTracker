import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetAccounts } from '../../Api/PlaidApi';
import { UserLogin } from '../../Api/UserApi';
import { IsTokenValid } from '../../Helpers/LocalStorageReader';
import { IUser, IUserLoginRequest } from '../../Models/UserModels/User';

const userInitialState: IUser = {
  isAuthenticated: IsTokenValid(),
  firstName: '',
  lastname: '',
  accounts: [],
};

export const loginAsync = createAsyncThunk(
  'user/login',
  async (userLoginInfo: IUserLoginRequest) => {
    const resp = await UserLogin(userLoginInfo);
    return resp;
  }
);

export const getAccountsAsync = createAsyncThunk(
  'user/getAccounts',
  async () => {
    const resp = await GetAccounts();
    return resp;
  }
);

export const UserSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    userLogout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('sessionId');
      localStorage.removeItem('sessionExpiry');
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        if (action.payload) {
          localStorage.setItem('token', action.payload.tokenString);
          localStorage.setItem('sessionId', action.payload.sessionGuid);
          localStorage.setItem(
            'sessionExpiry',
            action.payload.sessionExpiry.toString()
          );

          state.isAuthenticated = true;
        }
      })
      .addCase(getAccountsAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.accounts = action.payload;
        }
      });
  },
});

export const { userLogout } = UserSlice.actions;

export default UserSlice.reducer;
