import { AppContextState } from './AppContext';

export type AppContextActions =
  | { type: 'updateAppState'; nextState: AppContextState }
  | { type: 'updateLoading'; nextState: boolean }
  | { type: 'updateLinkToken'; nextState: string | undefined };
