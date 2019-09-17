import { User } from '../user';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as rootState from '../../state/app.state';

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

export function reducer(state: UsersState = initialState, action): UsersState {
  switch (action.type) {
    case 'MASK_USER_NAME':
      return {
        ...state,
        maskUserName: action.payload,
      };
    default:
      return state;
  }
}
