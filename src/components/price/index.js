import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css";

export default function Price({ show, connect_wallet, balanceInr }) {
  const [eladInr, setEladrInr] = useState(0);
  const customConfig = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };

  const fetchPrice = async () => {
    let response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=CARDANO&vs_currencies=INR",
      customConfig
    );

    const adaInr = response.data["cardano"]["inr"];

    response = await axios.get(
      "https://analyticsv2.muesliswap.com/ticker",
      customConfig
    );

    const eladrAda =
      response.data[
        "2d420236ffaada336c21e3f4520b799f6e246d8618f2fc89a4907da6.EduladderToken_ADA"
      ].last_price;

    setEladrInr(adaInr * eladrAda);
  };

  useEffect(() => {
    async function loadData() {
      await fetchPrice();
    }
    loadData();
  }, []);

  return (
    <div className={`price  eladr_price ${show ? "show_price" : ""}`}>
      <img
        src="https://camo.githubusercontent.com/cd2ef7ae3c1a5ec66d20a154230ec52c32d015d53fbcaae658451e69732267ae/68747470733a2f2f692e696d6775722e636f6d2f505169656c756f2e706e67"
        width="68"
        height="68"
        className="logo"
      />

      {connect_wallet ? (
        <>
          <p> INR(₹): {eladInr.toFixed(5)}</p>
        </>
      ) : (
        <div className="price_section">
          <p>
            Per Token/Total: {eladInr.toFixed(5)}/ {balanceInr.toFixed(5)}{" "}
            INR(₹)
          </p>
          <a
            href="https://eduladder.com/crypto/swapsell.php"
            className="buy_sell"
            target="_blank"
          >
            BUY / SELL
          </a>
        </div>
      )}
    </div>
  );
}
// href="https://eduladder.com/crypto/swapsell.php"
