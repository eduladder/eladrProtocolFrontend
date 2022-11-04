import { useLocation } from "react-router-dom";
import Feed from "../../components/feed";
import Header from "../../components/header";
import "./style.css";

export default function SearchResults() {
  const location = useLocation();
  const { searchTerm, results } = location.state;
  console.log("term-->", results);
  return (
    <div className="searchResults">
      <Header searchedTerm={searchTerm} seachedResults={results} />
      <div className="results_feed">
        {results && results.length !== 0 ? (
          results.map((result, i) => <Feed feed={result} key={i} />)
        ) : (
          <h1>No Result Available</h1>
        )}
      </div>
    </div>
  );
}
