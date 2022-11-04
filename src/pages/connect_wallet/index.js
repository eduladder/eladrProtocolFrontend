import "./style.css";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";
import { Component, useEffect, useState } from "react";

const { utils } = require("@stricahq/typhonjs")

export default function ConnectWallet() {
  const [walletSelected, setWalletSelected] = useState('')
  const [walletAddress, setWalletAddress] = useState({})
  let [wallets, setWallets] = useState([])

  

  const enableWallet = async () => {
    try {
        console.log(wallets)
        console.log(window.cardano)
        const walletAPI = await window?.cardano?.[walletSelected].enable()

        const rawAddress = await walletAPI.getUsedAddresses()

        const changeAddress = utils.getAddressFromHex(rawAddress.toString()).getBech32()        
        console.log(changeAddress)
        setWalletAddress(changeAddress)
       
    } catch(err) {
        console.log(err);
    }
}
  const detectWallets = () => {
    const wlet = []
    setTimeout(() => {}, 2000);
    for (const key in window.cardano) {
        if (window.cardano[key].enable && wallets.indexOf(key) === -1) {
            wlet.push(key)
        }
    }
    // if (wlet.length === 0 && count < 3) {
      
    //   return;
    // }

    setWallets(wlet)

    return wlet

    // console.log(wallets, window.cardano)

  }

  useEffect(() => {
    const wlet = detectWallets();
    console.log(wallets)
  }, [])

  return (
    <div className="wallet_connect_wrapper">
      <div className="wallet_radio_wrapper">
        {wallets.map(key => 
        <div key={key}>
          <input key={key} type="radio" value={key} name="wallet" onChange={() => { setWalletSelected(key) }}/> {key}<br/>
        </div>
        )}
      </div>
      
      
        <button className="connect_wallet" onClick={enableWallet}>Connect Wallet</button>
      <Footer />
    </div>
  );
}
