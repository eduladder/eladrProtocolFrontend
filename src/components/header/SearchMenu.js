import React, { useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useClickOutside from "../../helpers/clickOutside";
import { useEffect } from "react";

export default function SearchMenu({ searchedTerm, seachedResults }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(true);

  const navigate = useNavigate();
  const results_box = useRef();
  console.log(searchedTerm, seachedResults);
  useEffect(() => {
    searchedTerm && setSearchTerm(searchedTerm);
    setResults(seachedResults);
    setShowResults(false);
  }, []);
  useClickOutside(results_box, () => {
    setShowResults(false);
  });

  const customConfig = {
    headers: {
      "Content-Type": "application/json",
      Connection: "keep-alive",
    },
    mode: "cors",
  };

  const search = async () => {
    try {
      console.log("Hello");
      if (searchTerm === "" || searchTerm === []) {
        setResults("");
      } else {
        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/search/${searchTerm}`,
          customConfig
        );
        setResults(data);
      }
    } catch (error) {
      return error.response.data.message;
    }
  };

  const goToSearchResultsPage = async () => {
    if (searchTerm !== "") {
      navigate("/search_results", {
        state: { searchTerm: searchTerm, results: results },
      });
    }
  };

  return (
    <div className="search">
      <div className="input_and_result_wrap" ref={results_box}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onFocus={() => {
            setShowResults(true);
          }}
          onClick={() => {
            setShowResults(true);
          }}
          onKeyUp={search}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        {console.log("Header Results-->", results, showResults)}
        {showResults && results && results.length !== 0 && (
          <div className="search_result_box">
            {results.map((result, i) => (
              <Link
                to={`/${result.hashmeta}`}
                className="search_result_box_item"
                key={i}
                onClick={() => {
                  setResults("");
                  setSearchTerm("");
                }}
              >
                {!result.title.includes(searchTerm) &&
                result.description.includes(searchTerm)
                  ? result.description
                  : result.title}
              </Link>
            ))}
          </div>
        )}
      </div>

      <button className="nav_btn" onClick={goToSearchResultsPage}>
        Search
      </button>
    </div>
  );
}
