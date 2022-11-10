import { Link } from "react-router-dom";
import "./style.css";
export default function Footer({ scrollable }) {
  return (
    <div
      className="footer"
      style={{ position: `${scrollable ? "relative" : "absolute"}` }}
    >
      <Link to={"/terms_of_services"} className="footer_item">
        TERMS OF SERVICES
      </Link>
      <Link to={"/contacts"} className="footer_item">
        CONTACT
      </Link>
    </div>
  );
}
