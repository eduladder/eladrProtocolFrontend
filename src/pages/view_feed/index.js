import "./style.css";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header";
import axios from "axios";

export default function ViewFeed() {
  const thumbnailUrl =
    "https://imgs.search.brave.com/GXGbRVeD_32-H6zLNebob4rYhpRuSvne1fmEF9md9yc/rs:fit:960:981:1/g:ce/aHR0cDovL2Nkbi5v/bmxpbmV3ZWJmb250/cy5jb20vc3ZnL2Rv/d25sb2FkXzI5OTU5/MS5wbmc";
  const ipfsGateway = "https://gateway.ipfs.io/ipfs/";
  const [contentHash, setContentHash] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const { id } = useParams();
  console.log(id);
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  };
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/database/${id}`, axiosConfig)
    .then((response) => {
      console.log("response-->", response);
      const { title, description, wallet, hashvideo } = response.data;
      setTitle(title);
      setDescription(description);
      setPostedBy(wallet);
      setContentHash(hashvideo);
    });
  return (
    <div className="view_feed">
      <Header />
      <div className="view_feed_container">
        <div className="content">
          <a
            href={`${ipfsGateway}/${contentHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={thumbnailUrl} height="500px" width="600px" />
          </a>
        </div>
        <div className="details">
          <h3>Title: {title}</h3>
          <br />
          <h3>Description: {description}</h3>
          <br />
          <h3>Uploaded By: {postedBy}</h3>
          <br />
        </div>
      </div>
    </div>
  );
}
