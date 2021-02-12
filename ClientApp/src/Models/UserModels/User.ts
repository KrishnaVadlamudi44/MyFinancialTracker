export interface IUserLoginRequest {
  userName: string;
  password: string;
}

export interface IUserLoginResponse {
  sessionGuid: string;
  tokenString: string;
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
