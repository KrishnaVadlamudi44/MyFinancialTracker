import React, { useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { CreateItem } from '../Api/PlaidApi';
import { useAppContextState } from '../Context/AppContext';

interface ILinkBankAccount {
  token: string;
}

const LinkBankAccount = ({ token }: ILinkBankAccount) => {
  const { appContextState, dispatch } = useAppContextState();

  const onSuccess = useCallback((token: string, metadata) => {
    CreateItem(token);
    dispatch({ type: 'setLinkToken', nextState: undefined });
  }, []);

  const { open, ready, error } = usePlaidLink({
    token: token,
    onSuccess: onSuccess,
    onExit: () => dispatch({ type: 'setLinkToken', nextState: undefined }),
  });

  open();

  return <div></div>;
};

export default LinkBankAccount;
