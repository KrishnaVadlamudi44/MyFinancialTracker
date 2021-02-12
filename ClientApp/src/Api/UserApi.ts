import {
  IUserItems,
  IUserLoginRequest,
  IUserLoginResponse,
  IUserRegisterRequest,
  IUserRegisterResponse,
} from '../Models/UserModels/User';
import { Get, Post } from './ApiRequestBase';
import { GetSession } from './SessionApi';

export const UserLogin = async (loginInfo: IUserLoginRequest) => {
  const resp = await Post<IUserLoginResponse, IUserLoginRequest>(
    'api/users/authenticate',
    true,
    loginInfo
  );
  localStorage.setItem('token', resp.tokenString);
  localStorage.setItem('sessionId', resp.sessionGuid);

  return resp;
};

export const UserRegister = async (registerInfo: IUserRegisterRequest) => {
  const resp = await Post<IUserRegisterResponse, IUserRegisterRequest>(
    'api/users/register',
    true,
    registerInfo
  );

  return resp;
};

export const GetUserItems = async () => {
  let session = await GetSession();

  const resp = await Get<IUserItems[]>(`api/users/items/${session.userUuid}`);

  return resp;
};
