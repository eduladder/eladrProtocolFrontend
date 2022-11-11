import { useState, useRef } from "react";
import Header from "../../components/header";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFileAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Footer from "../../components/footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [status, setStatus] = useState("No File Chosen");
  const title = useRef(null);
  const description = useRef(null);
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const container = useRef();
  const [spaceLeft, setSpaceLeft] = useState();

  useEffect(() => {
    function handleWindowResize() {
      setSpaceLeft(window.innerHeight - (container.current.clientHeight + 128));
    }
    setSpaceLeft(window.innerHeight - (container.current.clientHeight + 128));

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  const handleFile = (e) => {
    setFile(e.target.files.item(0));
    setStatus("File selected");
  };

  const handleThumbnail = (e) => {
    setThumbnail(e.target.files.item(0));
    setStatus("Thumbnail selected");
  };

  const deleteFile = () => {
    setFile(null);
    setStatus("No File Chosen");
  };

  const deleteThumbnail = () => {
    setThumbnail(null);
    setStatus("No Thumbnail Chosen");
  };

  const uploadFile = async () => {
    try {
      const currentTitle = title.current.value;
      const currentDesc = description.current.value;

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

        setStatus("Uploading file...");
        let { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/file`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            mode: "cors",
          }
        );
        const fileHash = data.fileHash;
        const fileType = data.fileType;
        console.log(`IPFS hash of uploaded file: ${fileHash}`);

        let thumbHash;

        if (thumbnail) {
          const thumbForm = new FormData();
          thumbForm.append("file", thumbnail);
          let { data } = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/file`,
            thumbForm,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              mode: "cors",
            }
          );
          thumbHash = data.fileHash;
        }

        setStatus("Uploading metadata...");
        ({ data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/meta`,
          {
            name: currentTitle,
            description: currentDesc,
            wallet: user.wallet_address,
            fileHash: fileHash,
            fileType: fileType,
            thumbnailHash: thumbHash,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ));
        const metaHash = data.split("/").at(-1);
        console.log(`IPFS hash of uploaded metadata: ${metaHash}`);

        setStatus("Updating database...");
        const dbRecord = {
          vidHash: fileHash,
          metaHash: metaHash,
          wallet: "addr1_dummy",
          title: currentTitle,
          description: currentDesc,
          hashThumbnail: thumbHash,
        };
        const response3 = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/database`,
          dbRecord,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response3);
        setStatus("Upload Complete.");
        setFile(null);
        setThumbnail(null);
        title.current.value = null;
        description.current.value = null;

        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setStatus("Unexpected error. Please try again.");
      return;
    }
  };

  return (
    <div className="upload">
      <Header />
      <div className="upload_container" ref={container}>
        <input
          type="text"
          placeholder="Title"
          className="title_box"
          ref={title}
        />
        <div className="description_input">
          <textarea
            id="description"
            name="description"
            rows="3"
            cols="100"
            placeholder="Description"
            ref={description}
          ></textarea>
        </div>

        <div className="upload_file_container">
          <div className="upload_file">
            <div className="title" style={{ marginTop: "21px" }}>
              Choose File
            </div>

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

          <div className="upload_file">
            <div className="title">Choose Thumbnail (Optional)</div>

            {thumbnail ? (
              <div className="file_box">
                <FontAwesomeIcon icon={faFileAlt} />
                <p>{thumbnail.name}</p>
                <div className="actions">
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteThumbnail()}
                  />
                </div>
              </div>
            ) : (
              <div className="file_inputs">
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/webp, image/gif, image/jpg"
                  onChange={handleThumbnail}
                />
                <button>
                  <i>
                    <FontAwesomeIcon icon={faPlus} />
                  </i>
                  Add Thumbnail
                </button>
              </div>
            )}
          </div>
        </div>
        <button className="upload_btn" onClick={uploadFile}>
          Upload
        </button>
        <div className="status">
          <p>Upload status: {status}</p>
        </div>
      </div>
      {spaceLeft < 85 ? <Footer scrollable /> : <Footer />}
    </div>
  );
}
