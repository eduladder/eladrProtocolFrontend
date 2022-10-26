import { Routes, Route } from "react-router-dom";
import './App.css';
import ConnectWallet from "./pages/connect_wallet";
import Home from "./pages/home";


function App() {
  return (
    <div >
      <Routes>
        <Route  path="/" element={<Home/>}  exact />
        <Route  path="/connect_wallet" element={<ConnectWallet/>} exact />
      </Routes>
    </div>
  );
}

export default App;
