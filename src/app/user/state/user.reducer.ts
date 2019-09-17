import { User } from '../user';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, UserActionTypes } from './user.actions';

export interface GlobalState extends UsersState {
  users: UsersState;
}

export interface UsersState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UsersState = {
  maskUserName: true,
  currentUser: null,
};

const getFeatureUserState = createFeatureSelector<UsersState>('users');

export const getMaskUserName = createSelector(
  getFeatureUserState,
  state => state.maskUserName,
);

export const getCurrentUser = createSelector(
  getFeatureUserState,
  state => state.currentUser,
);

export function reducer(state: UsersState = initialState, action: UserActions): UsersState {
  switch (action.type) {
    case UserActionTypes.MaskUserName:
      return {
        ...state,
        maskUserName: action.payload,
      };
    default:
      return state;
  }
}
