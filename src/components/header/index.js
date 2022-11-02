import "./style.css";
import SearchMenu from "./SearchMenu";
import { Link } from "react-router-dom";

export default function Header({ searchedTerm, seachedResults }) {
  return (
    <div className="header">
      <SearchMenu searchedTerm={searchedTerm} seachedResults={seachedResults} />
      <Link to={"/"}>
        <div className="nav_btn">Home</div>
      </Link>
      <Link to={"/upload"}>
        <div className="nav_btn">Upload</div>
      </Link>

      <Link to="/connect_wallet" className="disconnect_btn">
        Disconnect
      </Link>
    </div>
  );
}
