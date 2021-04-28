import { IPlaidAccount } from '../Models/PlaidModels/PlaidAccount';
import { Get, Post } from './ApiRequestBase';
import { GetSession } from './SessionApi';

export const GetLinkToken = async () => {
  let session = await GetSession();

  if (session) {
    let result = await Get<any>(
      `api/plaid/getLinkToken/${session.userUuid}`,
      true
    );
    return result.linkToken;
  } else {
    return session;
  }
};

export const CreateItem = async (publicToken: string) => {
  let session = await GetSession();

  if (session) {
    let result = await Post('api/plaid/createItem', true, {
      publicToken: publicToken,
      userGuid: session.userUuid,
    });
    return result;
  } else {
    return session;
  }
};

export const GetAccounts = async () => {
  let session = await GetSession();

  if (session) {
    let result = await Get<IPlaidAccount[]>(
      `api/plaid/getAccounts/${session.userUuid}`
    );
    if (result && Object.keys(result).length > 0) {
      return result;
    } else {
      return null;
    }
  } else {
    return session;
  }
};
