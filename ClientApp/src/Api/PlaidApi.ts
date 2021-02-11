import { IPlaidAccount } from '../Models/PlaidModels/PlaidAccount';
import { Get, Post } from './ApiRequestBase';
import { GetSession } from './SessionApi';

export const GetLinkToken = async () => {
  let session = await GetSession();

  let result = await Get<any>(
    `api/plaid/getLinkToken/${session.userUuid}`,
    true
  );

  return result.linkToken;
};

export const CreateItem = async (publicToken: string) => {
  let session = await GetSession();

  let result = await Post('api/plaid/createItem', true, {
    publicToken: publicToken,
    userGuid: session.userUuid,
  });

  return result;
};

export const GetAccounts = async () => {
  let session = await GetSession();

  let result = await Get<IPlaidAccount[]>(
    `api/plaid/getAccounts/${session.userUuid}`
  );

  return result;
};
