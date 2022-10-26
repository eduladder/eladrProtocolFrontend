import { useEffect, useReducer, useRef, useState } from "react";
import axios from "axios";
import { postsReducer } from "../../reducers/reducers";
import Header from "../../components/header";
import Feed from "../../components/feed";
import "./style.css";

export default function Home() {
  const [{ loading, error, feeds }, dispatch] = useReducer(postsReducer, {
    loading: false,
    feeds: [],
    error: "",
  });
  useEffect(() => {
    getAllFeeds();
  }, []);

  const getAllFeeds = async () => {
    try {
      dispatch({ type: "FEEDS_REQUEST" });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/files`
      );

      dispatch({ type: "FEEDS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FEEDS_ERROR", payload: error.response.data.message });
    }
  };

  return (
    <div className="home">
      <Header />

      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div className="feeds">
          {feeds.map((feed, i) => (
            <Feed feed={feed} key={i} />
          ))}
        </div>
      )}
    </div>
  );
}
