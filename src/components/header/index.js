import "./style.css";
import SearchMenu from "./SearchMenu";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Header({ searchedTerm, seachedResults }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [eladInr, setEladrInr] = useState(0)

  const customConfig = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };

  const fetchPrice = async () => {

    let response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=CARDANO&vs_currencies=INR', customConfig)

    const adaInr = response.data['cardano']['inr']

    response = await axios.get('http://analyticsv2.muesliswap.com/ticker', customConfig)
    
    const eladrAda = response.data['2d420236ffaada336c21e3f4520b799f6e246d8618f2fc89a4907da6.EduladderToken_ADA'].last_price
  
    setEladrInr(adaInr * eladrAda)
  }

  

  useEffect(() => {
    async function loadData() {
      await fetchPrice()
    }
    loadData()
    console.log(eladInr)
  }, [])

  const disconnect = () => {
    Cookies.set("user", "");
    dispatch({ type: "WALLETDISCONNECTED" });
    navigate("/connect_wallet");
  };
  return (
    <div className="header">
      <img src="https://camo.githubusercontent.com/cd2ef7ae3c1a5ec66d20a154230ec52c32d015d53fbcaae658451e69732267ae/68747470733a2f2f692e696d6775722e636f6d2f505169656c756f2e706e67" width="60" height="60" />
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

      <div>
        <p>ELADR price in INR: {eladInr}</p>
      </div>
    </div>
  );
}
