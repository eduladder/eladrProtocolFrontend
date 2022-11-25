import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Feed from "../../components/feed";
import Header from "../../components/header";
import "./style.css";

export default function SearchResults() {
  const location = useLocation();
  const { searchTerm, results } = location.state;
  const [searchedResults, setSearchedResults] = useState();

  const customConfig = {
    headers: {
      "Content-Type": "application/json",
      Connection: "keep-alive",
    },
    mode: "cors",
  };

  useEffect(() => {
    search();
  }, []);

  const search = async () => {
    try {
      if (searchTerm === "" || searchTerm === []) {
        setSearchedResults("");
      } else {
        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/search/${searchTerm}`,
          customConfig
        );
        setSearchedResults(data);
      }
    } catch (error) {
      return error.response.data.message;
    }
  };

  return (
    <div className="searchResults">
      <Header searchedTerm={searchTerm} seachedResults={results} />
      <div className="results_feed">
        {searchedResults && searchedResults.length !== 0 ? (
          results.map((result, i) => <Feed feed={result} key={i} />)
        ) : (
          <h1>No Result Available</h1>
        )}
      </div>
    </div>
  );
}
