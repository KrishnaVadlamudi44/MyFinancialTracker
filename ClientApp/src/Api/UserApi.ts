import {
  IUserLoginRequest,
  IUserLoginResponse,
  IUserRegisterRequest,
  IUserRegisterResponse,
} from '../Models/UserModels/User';
import { Post } from './ApiRequestBase';

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
