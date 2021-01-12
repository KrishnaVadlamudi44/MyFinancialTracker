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
    case 'updateLinkToken':
      return {
        ...state,
        linkToken: action.nextState,
      };
    default:
      return state;
  }
};
