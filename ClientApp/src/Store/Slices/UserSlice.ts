import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserLogin } from '../../Api/UserApi';
import { IUser, IUserLoginRequest } from '../../Models/UserModels/User';

const userInitialState: IUser = {
  isAuthenticated: localStorage.getItem('token') === null ? false : true,
  firstName: '',
  lastname: '',
};

export const loginAsync = createAsyncThunk(
  'user/login',
  async (userLoginInfo: IUserLoginRequest) => {
    const resp = await UserLogin(userLoginInfo);
    return resp;
  }
);

export const UserSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      action.payload &&
        localStorage.setItem('token', action.payload?.tokenString);
    });
  },
});

export default UserSlice.reducer;
