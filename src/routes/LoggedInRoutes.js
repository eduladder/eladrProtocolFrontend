import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import ConnectWallet from "../pages/connect_wallet/index.js";

export default function LoggedInRoutes() {
  const { user } = useSelector((state) => ({ ...state }));
  return user ? <Outlet /> : <ConnectWallet />;
}
