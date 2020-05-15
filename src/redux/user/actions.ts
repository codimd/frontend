import {Action} from 'redux';
import {UserState} from "./types";

export const SET_USER_ACTION_TYPE = 'user/set';
export const CLEAR_USER_ACTION_TYPE = 'user/clear';

export interface SetUserAction extends Action {
    type: string;
    payload: {
        state: UserState,
    };
}

export interface ClearUserAction extends Action {
    type: string;
    payload: {};
}

export type UserActions = SetUserAction | ClearUserAction;