import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import { Component, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import Price from "../../components/price";

const { utils } = require("@stricahq/typhonjs");
const [name, fingerPrint, policyId] = [
  "EduladderToken",
  "asset1ny2ehvl20cp5y7mmn5qq332sgdncdmsgrcqlwh",
  "2d420236ffaada336c21e3f4520b799f6e246d8618f2fc89a4907da6",
];

// [process.env.TOKEN_NAME, process.env.TOKEN_FINGER_PRINT, process.env.TOKEN_POLICY_ID]

export default function ConnectWallet() {
  const [walletSelected, setWalletSelected] = useState("");
  let [wallets, setWallets] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const detectWallets = () => {
    if (!window.cardano) {
      const message =
        "Please install a Cardano wallet extension like Nami, Eternl or Yoroi on your browser, before using this application.";
      alert(message);
      return;
    }
    const wlet = [];
    setTimeout(() => {}, 2000);
    for (const key in window.cardano) {
      if (window.cardano[key].enable && wallets.indexOf(key) === -1) {
        wlet.push(key);
      }
    }

    wlet.length !== 0 && setWallets(wlet);
  };

  const hasEladrBalance = async (address) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/evaluvate/${address.toString()}`
      );

      for (let token of data) {
        const balance = token.balance.replace(",", "");
        if (
          token.name === name &&
          token.fingerPrint === fingerPrint &&
          token.policy === policyId &&
          parseFloat(balance) > 0
        ) {
          return true;
        }
      }

      return false;
    } catch (err) {
      console.log(err);
    }
  };

  const enableWallet = async () => {
    try {
      const walletAPI = await window?.cardano?.[walletSelected].enable();

      const rawAddress = await walletAPI.getUsedAddresses();

      const changeAddress = utils
        .getAddressFromHex(rawAddress.toString())
        .getBech32();

      const hasEladr = await hasEladrBalance(changeAddress);
      // if (!hasEladr) {
      //   const message =
      //     "Wallet doesn't have Eduladder Tokens. Please purchase some tokens or try a different wallet.";
      //   alert(message);
      //   return;
      // }

      if (changeAddress) {
        dispatch({
          type: "WALLETCONNECTED",
          payload: { wallet_address: changeAddress },
        });
        Cookies.set("user", JSON.stringify({ wallet_address: changeAddress }));
        navigate("/");
      }
      console.log("Wallet connection success!!");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    detectWallets();
  }, []);

  return (
    <div className="wallet_connect_wrapper">
      <div className="connect_wallet_nav">
        <img
          src="https://eduladder.com/images/app/edu.png"
          width="170"
          height="100"
        />
        <Price />
      </div>
      <div className="connect_wrapper">
        <div className="wallet_radio_wrapper">
          {wallets.map((key) => (
            <div key={key} className="wallets">
              <input
                key={key}
                type="radio"
                value={key}
                name="wallet"
                onChange={() => {
                  setWalletSelected(key);
                }}
              />
              <img src={window.cardano[key].icon} width="25" height="25" />
              {key}
              <br />
            </div>
          ))}
        </div>
        <button
          className="connect_wallet"
          onClick={() => {
            wallets.length !== 0 ? enableWallet() : detectWallets();
          }}
        >
          Connect Wallet
        </button>
      </div>

      <Footer />
    </div>
  );
}
