import "./style.css";
import SearchMenu from "./SearchMenu";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

export default function Header({ searchedTerm, seachedResults }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const disconnect = () => {
    Cookies.set("user", "");
    dispatch({ type: "WALLETDISCONNECTED" });
    navigate("/connect_wallet");
  };
  return (
    <div className="header">
      <SearchMenu searchedTerm={searchedTerm} seachedResults={seachedResults} />
      <Link to={"/"}>
        <div className="nav_btn">Home</div>
      </Link>
      <Link to={"/upload"}>
        <div className="nav_btn">Upload</div>
      </Link>

      <button className="disconnect_btn" onClick={disconnect}>
        Disconnect
      </button>
    </div>
  );
}
