import Cookies from "js-cookie";

export default function userReducer(
  state = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  action
) {
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
