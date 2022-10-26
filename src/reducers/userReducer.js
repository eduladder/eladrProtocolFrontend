export default function userReducer(state = null, action) {
  switch (action.type) {
    case "WALLETCONNECTED":
      return action.payload;
      break;
    case "WALLETDISCONNECTED":
      return null;
      break;

    default:
      return state;
  }
}
