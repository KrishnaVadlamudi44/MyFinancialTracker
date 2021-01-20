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
    loginInfo
  );

  return resp;
};

export const UserRegister = async (registerInfo: IUserRegisterRequest) => {
  const resp = await Post<IUserRegisterResponse, IUserRegisterRequest>(
    'api/users/register',
    registerInfo
  );

  return resp;
};
