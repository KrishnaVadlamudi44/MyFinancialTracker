import React, { useContext, useReducer } from 'react';
import { AppContextActions } from './Actions';
import { reducer } from './Reducer';

export type AppContextState = {
  authenticated: boolean;
  userGuid?: string | undefined;
  sessionId?: string | undefined;
  loading: boolean;
};

const initialState: AppContextState = {
  authenticated: localStorage.getItem('token') === null ? false : true,
  loading: false,
};

const initialAppContext: {
  appContextState: AppContextState;
  dispatch: React.Dispatch<AppContextActions>;
} = {
  appContextState: initialState,
  dispatch: () => {},
};

const AppContext = React.createContext(initialAppContext);

type AppContextProviderProps = {
  children: any;
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [appContextState, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ appContextState, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContextState = () => useContext(AppContext);
