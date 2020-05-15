import {UserState} from "./types";
import {store} from "../../utils/store";
import {CLEAR_USER_ACTION_TYPE, ClearUserAction, SET_USER_ACTION_TYPE, SetUserAction} from "./actions";

export const setUser = (state: UserState) => {
    const action: SetUserAction = {
        type: SET_USER_ACTION_TYPE,
        payload: {
            state
        }
    }
    store.dispatch(action);
}

export const clearUser = () => {
    const action: ClearUserAction = {
        type: CLEAR_USER_ACTION_TYPE,
        payload: {},
    }
    store.dispatch(action);
}