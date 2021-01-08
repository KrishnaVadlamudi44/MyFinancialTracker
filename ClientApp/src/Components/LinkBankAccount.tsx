import React, { useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';

const LinkBankAccount = () => {
  const onSuccess = useCallback((token, metadata) => {
    console.log({ token: token, metadata: metadata });
  }, []);

  const GetLinkToken = () => {
    return 'Get link token from server';
  };

  const config = {
    token: GetLinkToken(),
    onSuccess: onSuccess,
  };

  const { open, ready, error } = usePlaidLink(config);

  return (
    <button onClick={() => open()} disabled={!ready}>
      Add Account
    </button>
  );
};

export default LinkBankAccount;
