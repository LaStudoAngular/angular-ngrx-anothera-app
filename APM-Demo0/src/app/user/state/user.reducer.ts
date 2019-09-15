export function reducer(state, action) {
  switch (action.type) {
    case 'MASK_USER_NAME':
      return {
        ...state,
        maskUserName: action.type,
      };
    default:
      return state;
  }
}
