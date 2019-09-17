import { User } from '../user';

export interface UsersState {
  maskUserName: boolean;
  currentUser: User;
}

export function reducer(state: UsersState, action): UsersState {
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
