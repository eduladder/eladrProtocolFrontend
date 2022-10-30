import { useState, useRef } from "react";
import Header from "../../components/header";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFileAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Footer from "../../components/footer";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [fileHash, setFileHash] = useState("");
  const [metaHash, setMetaHash] = useState("");
  const [status, setStatus] = useState("No File Chosen");
  const title = useRef(null);
  const description = useRef(null);
  // const customConfig =

  const handleFile = (e) => {
    setFile(e.target.files.item(0));
    setStatus("File selected");
    console.log(file);
  };
  const deleteFile = () => {
    setFile(null);
    setStatus("No File Chosen");
    console.log(file);
  };

  const uploadFile = () => {
    const currentTitle = title.current.value;
    const currentDesc = description.current.value;
    // console.log(!title.current.value);
    // console.log(!description.current.value);
    if (!currentTitle) {
      alert("Please provide a title.");
      return;
    } else if (!currentDesc) {
      alert("Please provide a description.");
      return;
    } else if (!file) {
      setStatus("No File Chosen");
      alert("Please select a file.");
      return;
    } else {
      const formData = new FormData();
      formData.append("file", file);

      setStatus("Uploading File...");

      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/file`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          mode: "cors",
        })
        .then((response) => {
          const fileHashFromResponse = response.data.split("/").at(-1);
          setFileHash(fileHashFromResponse);
          setStatus("File Uploaded");
        })
        .then(() => {
          const metadata = {
            name: currentTitle,
            description: currentDesc,
            wallet: "addr1_dummy",
          };
          setStatus("Uploading Metadata...");
          axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/meta`, metadata, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((response2) => {
              const metaHashFromResponse = response2.data.split("/").at(-1);
              setMetaHash(metaHashFromResponse);
              setStatus("Metadata Uploaded");
            })
            .then(() => {
              console.log(fileHash, metaHash);
              setStatus("Updating database...");
              const dbRecord = {
                vidHash: fileHash,
                metaHash: metaHash,
                wallet: "addr1_dummy",
                title: currentTitle,
                description: currentDesc,
              };
              axios
                .post(
                  `${process.env.REACT_APP_BACKEND_URL}/database`,
                  dbRecord,
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                )
                .then((response) => {
                  console.log(response);
                  setStatus("Upload Complete");
                });
            });
        });
      setFile(null);
      title.current.value = null;
      description.current.value = null;
    }
  };

  return (
    <div className="upload">
      <Header />
      <div className="upload_container">
        <input
          type="text"
          placeholder="Title"
          className="title_box"
          ref={title}
        />

        <textarea
          id="description"
          name="description"
          rows="5"
          cols="100"
          placeholder="Description"
          ref={description}
          className="description_input"
        ></textarea>
        <div className="upload_file">
          <div className="title">Choose File</div>
          <div className="file_card">
            {file ? (
              <div className="file_box">
                <FontAwesomeIcon icon={faFileAlt} />
                <p>{file.name}</p>
                <div className="actions">
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteFile()}
                  />
                </div>
              </div>
            ) : (
              <div className="file_inputs">
                <input type="file" onChange={handleFile} />
                <button>
                  <i>
                    <FontAwesomeIcon icon={faPlus} />
                  </i>
                  Add File
                </button>
              </div>
            )}
          </div>
        </div>

        <button className="upload_btn" onClick={uploadFile}>
          Upload
        </button>
        <br />
        <br />
        <div>
          <p>Upload status: {status}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
