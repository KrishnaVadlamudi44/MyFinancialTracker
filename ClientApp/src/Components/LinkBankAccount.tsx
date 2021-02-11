import React, { useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { CreateItem } from '../Api/PlaidApi';

interface ILinkBankAccount {
  token: string;
}

const LinkBankAccount = ({ token }: ILinkBankAccount) => {
  const onSuccess = useCallback((token: string, metadata) => {
    console.log({ token: token, metadata: metadata });
    CreateItem(token);
  }, []);

  const { open, ready, error } = usePlaidLink({
    token: token,
    onSuccess: onSuccess,
  });

  open();

  return <div></div>;
};

export default LinkBankAccount;
