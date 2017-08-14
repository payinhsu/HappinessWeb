export function auth(state={}, action) {
  switch(action.type) {
    case 'AUTH_SUCCESS':
      return {user:action.user};
    case 'LOGIN':
      return action.data;
    case 'HAPPINESS_RECEIVE_AUTH':
      return action.data;
    default:
      return state;
  }
}