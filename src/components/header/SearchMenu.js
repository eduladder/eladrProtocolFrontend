import React, { useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useClickOutside from "../../helpers/clickOutside";

export default function SearchMenu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(true);

  const navigate = useNavigate();
  const results_box = useRef();

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

  const goToSeachResult = async () => {
    if (results && results.length !== 0) {
      navigate(`${results[0].id}`);
      setResults("");
      setSearchTerm("");
    } else {
      alert("Not Found!!");
    }
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onFocus={() => {
          setShowResults(true);
        }}
        onKeyUp={search}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />

      {showResults && results && results.length !== 0 && (
        <div className="search_result_box" ref={results_box}>
          {results.map((result, i) => (
            <Link
              to={`/${result.id}`}
              className="search_result_box_item"
              key={i}
              onClick={() => {
                setResults("");
                setSearchTerm("");
              }}
            >
              {result.title}
            </Link>
          ))}
        </div>
      )}

      <button className="nav_btn" onClick={goToSeachResult}>
        Search
      </button>
    </div>
  );
}
