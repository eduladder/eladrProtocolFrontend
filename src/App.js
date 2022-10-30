import { Routes, Route } from "react-router-dom";
import "./App.css";
import ConnectWallet from "./pages/connect_wallet";
import Contact from "./pages/Contact";
import Home from "./pages/home";
import Report from "./pages/report";
import TermsOfServices from "./pages/terms_of_services";
import Upload from "./pages/upload";
import ViewFeed from "./pages/view_feed";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/upload" element={<Upload />} exact />
        <Route path="/connect_wallet" element={<ConnectWallet />} exact />
        <Route path="/:id" element={<ViewFeed />} exact />
        <Route path="/report/:id" element={<Report />} exact />
        <Route path="/terms_of_services" element={<TermsOfServices />} exact />
        <Route path="/contacts" element={<Contact />} exact />
      </Routes>
    </div>
  );
}

export default App;
