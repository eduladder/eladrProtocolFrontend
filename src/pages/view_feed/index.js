import "./style.css";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/header";
import axios from "axios";
import Footer from "../../components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";

export default function ViewFeed() {
  const thumbnailUrl =
    "https://imgs.search.brave.com/GXGbRVeD_32-H6zLNebob4rYhpRuSvne1fmEF9md9yc/rs:fit:960:981:1/g:ce/aHR0cDovL2Nkbi5v/bmxpbmV3ZWJmb250/cy5jb20vc3ZnL2Rv/d25sb2FkXzI5OTU5/MS5wbmc";
  const ipfsGateway = "https://gateway.ipfs.io/ipfs/";
  const [contentHash, setContentHash] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [fileType, setFileType] = useState("");
  const { metaHash } = useParams();
  console.log(metaHash);
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  };
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/meta/${metaHash}`, axiosConfig)
    .then((response) => {
      console.log("response-->", response);
      const { name, description, wallet, fileHash, fileType } = response.data;
      setTitle(name);
      setDescription(description);
      setPostedBy(wallet);
      setContentHash(fileHash);
      setFileType(fileType.split("/")[0]);
    });
  return (
    <div className="view_feed">
      <Header />
      <div className="view_feed_container">
        {console.log("FileType-->", fileType)}
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
              <Link
                to={`${ipfsGateway}${contentHash}`}
                target="_blank"
                download
              >
                <span className="download_btn">Download</span>
              </Link>
            </>
          )}
          {fileType === "video" && (
            <>
              <video controls src={`${ipfsGateway}${contentHash}`} />
              <Link
                to={`${ipfsGateway}${contentHash}`}
                target="_blank"
                download
              >
                <span className="download_btn">Download</span>
              </Link>
            </>
          )}
          {fileType === "audio" && (
            <>
              <audio controls src={`${ipfsGateway}${contentHash}`} />
              <Link
                to={`${ipfsGateway}${contentHash}`}
                target="_blank"
                download
              >
                <span className="download_btn">Download</span>
              </Link>
            </>
          )}
          {fileType !== "image" &&
            fileType !== "video" &&
            fileType !== "audio" &&
            contentHash && (
              <Link
                to={`${ipfsGateway}${contentHash}`}
                target="_blank"
                download
              >
                <div className="file_box ">
                  <FontAwesomeIcon icon={faFileAlt} />
                  <p>{contentHash}</p>
                  <div className="actions"></div>
                </div>
              </Link>
            )}
        </div>
        <div className="details">
          <h3>Title: {title}</h3>
          <br />
          <h3>Description: {description}</h3>
          <br />
          <h3>Uploaded By: {postedBy}</h3>
          <br />
          <h3>File Type: {fileType}</h3>
          <Link to={`/report/${metaHash}`} className="report_link">
            Report
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
