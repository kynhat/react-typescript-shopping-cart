import { ActionType } from '../action-types/index'
interface UserName {
  type: ActionType.SETUSERNAME;
  payload: string;
}

interface Password {
  type: ActionType.SETPASSWORD;
  payload: string;
}

interface IsButtonDisabled {
  type: ActionType.SETISBUTTONDISABLED;
  payload: boolean;
}

interface LoginSuccess {
  type: ActionType.LOGINSUCCESS;
  payload: string;
}

interface LoginFailed {
  type: ActionType.LOGINFAILED;
  payload: string;
}

interface IsError {
  type: ActionType.SETISERROR;
  payload: boolean;
}

export type Action = UserName | Password | IsButtonDisabled | LoginSuccess | LoginFailed | IsError