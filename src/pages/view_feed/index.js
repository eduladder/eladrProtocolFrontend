import "./style.css";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/header";
import axios from "axios";
import Footer from "../../components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { saveAs } from "file-saver";

export default function ViewFeed() {
  const thumbnailUrl =
    "https://imgs.search.brave.com/GXGbRVeD_32-H6zLNebob4rYhpRuSvne1fmEF9md9yc/rs:fit:960:981:1/g:ce/aHR0cDovL2Nkbi5v/bmxpbmV3ZWJmb250/cy5jb20vc3ZnL2Rv/d25sb2FkXzI5OTU5/MS5wbmc";
  const ipfsGateway = "https://gateway.ipfs.io/ipfs/";
  const [contentHash, setContentHash] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [fileType, setFileType] = useState("");
  const [copyButton, setCopyButton] = useState("Copy");
  const { metaHash } = useParams();
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  };
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/meta/${metaHash}`, axiosConfig)
    .then((response) => {
      const { name, description, wallet, fileHash, fileType } = response.data;
      setTitle(name);
      setDescription(description);
      setPostedBy(wallet);
      setContentHash(fileHash);
      setFileType(fileType.split("/")[0]);
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
      <div className="view_feed_container">
        <div className="conent_title">{title}</div>
        <div className="content">
          {fileType === "image" && (
            <>
              <a
                href={`${ipfsGateway}${contentHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`${ipfsGateway}${contentHash}`}
                  height="500px"
                  width="600px"
                />
              </a>
            </>
          )}
          {fileType === "video" && (
            <>
              <video controls src={`${ipfsGateway}${contentHash}`} />
            </>
          )}
          {fileType === "audio" && (
            <>
              <audio controls src={`${ipfsGateway}${contentHash}`} />
            </>
          )}
          {fileType !== "image" &&
            fileType !== "video" &&
            fileType !== "audio" &&
            contentHash && (
              <div className="file_box " onClick={downloadFile}>
                <FontAwesomeIcon icon={faFileAlt} />
                <p>{contentHash}</p>
                <div className="actions"></div>
              </div>
            )}
        </div>
        <div className="details">
          <h3>{description}</h3>
          <br />
          <div className="address_container">
            <h3>By:</h3>
            <div className="address" style={{ display: "inline-block" }}>
              {`${postedBy.slice(0, 9)}......${postedBy.slice(-9)}`}
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
      <Footer />
    </div>
  );
}
