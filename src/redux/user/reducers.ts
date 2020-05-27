import { Reducer } from 'redux'
import { CLEAR_USER_ACTION_TYPE, LoginStatus, SET_USER_ACTION_TYPE, SetUserAction, UserActions, UserState } from './types'

export const initialState: UserState = {
  id: '',
  name: '',
  photo: '',
  status: LoginStatus.forbidden
}

export const UserReducer: Reducer<UserState, UserActions> = (state: UserState = initialState, action: UserActions) => {
  switch (action.type) {
    case SET_USER_ACTION_TYPE:
      return (action as SetUserAction).payload.state
    case CLEAR_USER_ACTION_TYPE:
      return initialState
    default:
      return state
  }
}
