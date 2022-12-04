import { Routes, Route } from "react-router-dom";
import "./App.css";
import ConnectWallet from "./pages/connect_wallet";
import Contact from "./pages/Contact";
import Home from "./pages/home";
import Report from "./pages/report";
import SearchResults from "./pages/search_result/indexjs";
import TermsOfServices from "./pages/terms_of_services";
import Upload from "./pages/upload";
import ViewFeed from "./pages/view_feed";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import MyFiles from "./pages/my_files";
import YourFiles from "./pages/your_files";


function App() {
  return (
    <div>
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element={<Home />} exact />
          <Route path="/upload" element={<Upload />} exact />
          <Route path="/my_files" element={<MyFiles />} exact />
          <Route path="/your_files/:wallet" element={<YourFiles />} exact />
          <Route path="/:metaHash" element={<ViewFeed />} exact />
          <Route path="/search_results" element={<SearchResults />} exact />
          <Route path="/report/:id" element={<Report />} exact />
          <Route
            path="/terms_of_services"
            element={<TermsOfServices />}
            exact
          />
          <Route path="/contacts" element={<Contact />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/connect_wallet" element={<ConnectWallet />} exact />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
