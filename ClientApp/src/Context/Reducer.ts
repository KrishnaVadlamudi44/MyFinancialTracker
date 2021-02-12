import { AppContextActions } from './Actions';
import { AppContextState } from './AppContext';

export const reducer = (state: AppContextState, action: AppContextActions) => {
  switch (action.type) {
    case 'updateAppState':
      return {
        ...action.nextState,
      };
    case 'updateLoading':
      return {
        ...state,
        loading: action.nextState,
      };
    case 'setLinkToken':
      return {
        ...state,
        linkToken: action.nextState,
      };
    case 'updateUserAccounts':
      return {
        ...state,
        userAccounts: action.nextState,
      };
    default:
      return state;
  }
};
