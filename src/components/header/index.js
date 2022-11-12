import "./style.css";
import SearchMenu from "./SearchMenu";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import Price from "../price";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Header({ searchedTerm, seachedResults }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [eladInr, setEladrInr] = useState(0);
  const [balanceInr, setBalanceInr] = useState(0)
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  const [name, fingerPrint, policyId] = [
    "EduladderToken",
    "asset1ny2ehvl20cp5y7mmn5qq332sgdncdmsgrcqlwh",
    "2d420236ffaada336c21e3f4520b799f6e246d8618f2fc89a4907da6",
  ];

  const customConfig = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };

  const fetchPriceAndBalance = async () => {
    let response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=CARDANO&vs_currencies=INR",
      customConfig
    );

    const adaInr = response.data["cardano"]["inr"];

    response = await axios.get(
      "http://analyticsv2.muesliswap.com/ticker",
      customConfig
    );

    const eladrAda =
      response.data[
        "2d420236ffaada336c21e3f4520b799f6e246d8618f2fc89a4907da6.EduladderToken_ADA"
      ].last_price;

    setEladrInr(adaInr * eladrAda);

    response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/evaluvate/${user.wallet_address.toString()}`);

    for (let token of response.data) {
        if (
          token.name === name &&
          token.fingerPrint === fingerPrint &&
          token.policy === policyId
        ) {
          const balance = (parseFloat(token.balance.replaceAll(",", "")) * adaInr * eladrAda)
          setBalanceInr(balance);
          break;
        }
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchPriceAndBalance();
    }
    loadData();
    console.log(balanceInr)
  }, []);

  const disconnect = () => {
    Cookies.set("user", "");
    dispatch({ type: "WALLETDISCONNECTED" });
    navigate("/connect_wallet");
  };
  return (
    <div className={`header ${showMenu ? "active_menu" : ""}`}>
      {showMenu && <div className="menu"></div>}

      <div
        className="menu_icon"
        onClick={() => {
          setShowMenu(true);
        }}
      >
        <FontAwesomeIcon icon={faBars} size="3x" />
      </div>

      <Link to={"/"} className="full_logo">
        <img
          src="https://eduladder.com/images/app/edu.png"
          width="170"
          height="100"
        />
      </Link>

      <SearchMenu
        searchedTerm={searchedTerm}
        seachedResults={seachedResults}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />
      <Link to={"/"}>
        <div
          className={`nav_btn ${showMenu ? "show" : ""}`}
          onClick={() => {
            setShowMenu(false);
          }}
        >
          Home
        </div>
      </Link>
      <Link to={"/upload"}>
        <div className={`nav_btn ${showMenu ? "show" : ""}`}>Upload</div>
      </Link>

      <button
        className={`disconnect_btn ${showMenu ? "show" : ""}`}
        onClick={disconnect}
      >
        Disconnect
      </button>
      <Price show={showMenu} />
      <div
        className="search_icon_btn"
        onClick={() => {
          setShowSearch(true);
        }}
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size="3x"
          className="search_icon"
        />
      </div>
      <div
        className={`close_btn ${showMenu ? "show" : ""}`}
        onClick={() => {
          setShowMenu(false);
        }}
      >
        <FontAwesomeIcon icon={faXmark} size="4x" />
      </div>
    </div>
  );
}
