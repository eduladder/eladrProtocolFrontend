import "./style.css";
import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/header";
import axios from "axios";
import Footer from "../../components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faHourglass1 } from "@fortawesome/free-solid-svg-icons";
import { saveAs } from "file-saver";
import { useMediaQuery } from "react-responsive";

export default function ViewFeed() {
  const thumbnailUrl =
    "https://imgs.search.brave.com/GXGbRVeD_32-H6zLNebob4rYhpRuSvne1fmEF9md9yc/rs:fit:960:981:1/g:ce/aHR0cDovL2Nkbi5v/bmxpbmV3ZWJmb250/cy5jb20vc3ZnL2Rv/d25sb2FkXzI5OTU5/MS5wbmc";
  const ipfsGateway = "https://gateway.ipfs.io/ipfs/";
  const [feed, setFeed] = useState("");
  const [contentHash, setContentHash] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postedBy, setPostedBy] = useState("");

  const [copyButton, setCopyButton] = useState("Copy");
  const { metaHash } = useParams();
  const container = useRef(null);

  const [spaceLeft, setSpaceLeft] = useState();

  useEffect(() => {
    get_feed();
    function handleWindowResize() {
      setSpaceLeft(window.innerHeight - (container.current.clientHeight + 128));
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  useEffect(() => {
    feed &&
      setSpaceLeft(window.innerHeight - (container.current.clientHeight + 128));
    console.log();
  }, [feed]);
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  const desktopView = useMediaQuery({
    query: "(max-width: 850px)",
  });
  const w650 = useMediaQuery({
    query: "(max-width: 650px)",
  });

  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  };
  const get_feed = async () =>
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/meta/${metaHash}`, axiosConfig)
      .then((response) => {
        setFeed(response.data);
      });

  const copyAddress = () => {
    navigator.clipboard.writeText(postedBy);
    setCopyButton("Copied");
  };

  const downloadFile = () => {
    saveAs(`${ipfsGateway}${contentHash}`, contentHash);
  };

  return (
    <div className="view_feed">
      <Header />
      {console.log(feed)}
      {feed ? (
        <div className="view_feed_container" ref={container}>
          <div className="conent_title">{feed.name}</div>
          <div className="content">
            {feed.fileType.split("/")[0] === "image" && (
              <a
                href={`${ipfsGateway}${feed.fileHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={`${ipfsGateway}${feed.fileHash}`} className="img" />
              </a>
            )}
            {feed.fileType.split("/")[0] === "video" && (
              <figure className="video">
                <div className="video_container">
                  <video
                    controls
                    src={`${ipfsGateway}${feed.fileHash}`}
                    className="video"
                  />
                </div>
              </figure>
            )}
            {feed.fileType.split("/")[0] === "audio" && (
              <audio controls src={`${ipfsGateway}${feed.fileHash}`} />
            )}
            {feed.fileType.split("/")[0] !== "image" &&
              feed.fileType.split("/")[0] !== "video" &&
              feed.fileType.split("/")[0] !== "audio" &&
              feed.fileHash && (
                <div className="file_box " onClick={downloadFile}>
                  <FontAwesomeIcon icon={faFileAlt} />

                  {desktopView && !w650 ? (
                    <p>{`${feed.fileHash.slice(0, 30)}`}...</p>
                  ) : w650 ? (
                    <p>{`${feed.fileHash.slice(0, 15)}`}...</p>
                  ) : (
                    <p>{feed.fileHash}</p>
                  )}

                  <div className="actions"></div>
                </div>
              )}
          </div>
          <div className="details">
            <div className="view_feed_description">
              <h3>{feed.description}</h3>
            </div>

            <br />
            <div className="address_container">
              <h3>By:</h3>
              <div className="address" style={{ display: "inline-block" }}>
                {`${feed.wallet.slice(0, 9)}......${postedBy.slice(-9)}`}
                &nbsp;&nbsp;&nbsp;
                <button className="copy_address" onClick={copyAddress}>
                  {copyButton}
                </button>
              </div>
            </div>

            <Link to={`/report/${metaHash}`} className="report_link">
              Report
            </Link>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}

      {feed && (spaceLeft < 90 ? <Footer scrollable /> : <Footer />)}
    </div>
  );
}
