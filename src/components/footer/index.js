import { Link } from "react-router-dom";
import "./style.css";
export default function Footer() {
  return (
    <div className="footer">
      <Link to={"/terms_of_services"} className="footer_item">
        TERMS OF SERVICES
      </Link>
      <Link to={"/contacts"} className="footer_item">
        CONTACT
      </Link>
    </div>
  );
}
