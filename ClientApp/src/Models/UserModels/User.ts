import { IPlaidAccount } from '../PlaidModels/PlaidAccount';

export interface IUserLoginRequest {
  userName: string;
  password: string;
}

export interface IUserLoginResponse {
  sessionGuid: string;
  tokenString: string;
  sessionExpiry: Date;
}

export interface IUserRegisterRequest {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
}

export interface IUserRegisterResponse {
  createdUserGuid: string;
}

export interface IUserItems {
  institutionId: string;
  institutionName: string;
}

export interface IUser {
  isAuthenticated: boolean;
  firstName: string;
  lastname: string;
  accounts: IPlaidAccount[];
}
