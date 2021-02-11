import { IPlaidAccount } from '../Models/PlaidModels/PlaidAccount';
import { AppContextState } from './AppContext';

export type AppContextActions =
  | { type: 'updateAppState'; nextState: AppContextState }
  | { type: 'updateLoading'; nextState: boolean }
  | { type: 'setLinkToken'; nextState: string | undefined }
  | { type: 'updateUserAccounts'; nextState: IPlaidAccount[] };
