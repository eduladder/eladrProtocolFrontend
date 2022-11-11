import React, { useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useClickOutside from "../../helpers/clickOutside";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function SearchMenu({
  searchedTerm,
  seachedResults,
  showSearch,
  setShowSearch,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const navigate = useNavigate();
  const results_box = useRef();

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
    <div className={`search ${showSearch ? "responsive_search" : ""}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          goToSearchResultsPage();
        }}
      >
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
          <button type="submit" className="search_btn">
            <i>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size="2x"
                className="search_icon"
              />
            </i>
          </button>
          {showSearch && (
            <div
              className="close_input_btn"
              onClick={() => {
                setShowSearch(false);
              }}
            >
              <FontAwesomeIcon icon={faXmark} size="3x" />
            </div>
          )}
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
                    ? result.description.toString().length > 16
                      ? `${result.description.toString().slice(0, 17)}...`
                      : result.desciption
                    : result.title.toString().length > 16
                    ? `${result.title.toString().slice(0, 17)}...`
                    : result.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
