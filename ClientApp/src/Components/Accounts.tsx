import React, { useState } from 'react';
import { GetAccounts, GetLinkToken } from '../Api/PlaidApi';
import { useAppContextState } from '../Context/AppContext';
import LinkBankAccount from './LinkBankAccount';

const Accounts = () => {
  const { appContextState, dispatch } = useAppContextState();

  const createTokenAndOpenPlaid = () => {
    GetLinkToken().then((token) => {
      dispatch({ type: 'setLinkToken', nextState: token });
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
      {appContextState.linkToken && (
        <LinkBankAccount token={appContextState.linkToken} />
      )}
    </div>
  );
};

export default Accounts;