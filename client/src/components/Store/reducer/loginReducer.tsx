import { Action } from '../actions/index'
import { ActionType } from "../action-types";

type State = {
  username: string;
  password: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case ActionType.SETUSERNAME:
        return {
            ...state,
            username: action.payload,
        };
        case ActionType.SETPASSWORD:
        return {
            ...state,
            password: action.payload,
        };
        case ActionType.SETISBUTTONDISABLED:
        return {
            ...state,
            isButtonDisabled: action.payload,
        };
        case ActionType.LOGINSUCCESS:
        return {
            ...state,
            helperText: action.payload,
            isError: false,
        };
        case ActionType.LOGINFAILED:
        return {
            ...state,
            helperText: action.payload,
            isError: true,
        };
        case ActionType.SETISERROR:
        return {
            ...state,
            isError: action.payload,
        };
    }
};

export default reducer;