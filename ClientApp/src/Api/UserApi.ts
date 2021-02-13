import {
  IUserItems,
  IUserLoginRequest,
  IUserLoginResponse,
  IUserRegisterRequest,
  IUserRegisterResponse,
} from '../Models/UserModels/User';
import { Delete, Get, Post } from './ApiRequestBase';

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
  const resp = await Get<IUserItems[]>(`api/users/items`);

  return resp;
};

export const RemoveUserItem = async (institutionId: string) => {
  const resp = await Delete(`api/users/items/${institutionId}`, true);

  return resp;
};
