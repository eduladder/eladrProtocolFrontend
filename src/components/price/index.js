import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css";

export default function Price() {
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
      "http://analyticsv2.muesliswap.com/ticker",
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
    <div className="price">
      <a
        href="https://eduladder.com/crypto/swapsell.php"
        className="eladr_price"
        target="_blank"
      >
        <img
          src="https://camo.githubusercontent.com/cd2ef7ae3c1a5ec66d20a154230ec52c32d015d53fbcaae658451e69732267ae/68747470733a2f2f692e696d6775722e636f6d2f505169656c756f2e706e67"
          width="50"
          height="50"
        />
        <p> INR(₹): {eladInr.toFixed(5)}</p>
      </a>
    </div>
  );
}
