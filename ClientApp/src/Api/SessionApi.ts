import { Session } from '../Models/SessionModels/Session';
import { Get, Post } from './ApiRequestBase';

export const GetSession = async () => {
  let resp = await Get<Session>(
    `api/Session/${localStorage.getItem('sessionId')}`,
    true
  );

  return resp;
};

export const UpdateSession = async () => {
  //WIP
  let resp = await Post(
    `api/session/${localStorage.getItem('sessionId')}`,
    true,
    {}
  );
};
