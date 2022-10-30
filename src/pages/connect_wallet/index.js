import "./style.css";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";

export default function ConnectWallet() {
  return (
    <div className="wallet_connect_wrapper">
      <Link to={"/"}>
        <button className="connect_wallet">Connect Wallet</button>
      </Link>
      <Footer />
    </div>
  );
}
