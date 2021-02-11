import React, { useCallback, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { GetAccounts, GetLinkToken } from '../Api/PlaidApi';
import { useAppContextState } from '../Context/AppContext';
import LinkBankAccount from './LinkBankAccount';

const Accounts = () => {
  const { appContextState, dispatch } = useAppContextState();

  const [token, setToken] = useState<string>();

  const createTokenAndOpenPlaid = () => {
    GetLinkToken().then((token) => {
      setToken(token);
    });
  };

  const GetAccountsForUser = async () => {
    let accounts = await GetAccounts();
    dispatch({ type: 'updateUserAccounts', nextState: accounts });
  };

  return (
    <div>
      Accounts page
      <button onClick={createTokenAndOpenPlaid}>addAccountOnClick</button>
      <button onClick={GetAccountsForUser}>get accounts for User</button>
      {appContextState.userAccounts &&
        appContextState.userAccounts.map((account) => {
          return (
            <div>
              <p>{account.name}</p>
            </div>
          );
        })}
      {token && <LinkBankAccount token={token} />}
    </div>
  );
};

export default Accounts;
