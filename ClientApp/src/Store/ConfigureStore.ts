import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import userReducer from './Slices/UserSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

store.subscribe(() => {
  var changedState = store.getState();
  console.log(changedState);
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
