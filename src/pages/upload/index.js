import { useState, useRef } from "react";
import Header from "../../components/header";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFileAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Upload() {
  const [file, setFile] = useState();
  const title = useRef(null);
  const description = useRef(null);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  const deleteFile = () => {
    setFile("");
  };

  const uploadFile = () => {
    console.log(title.current.value);
    console.log(description.current.value);
    const formData = new FormData();
    formData.append(file.name, file);
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
                  Upload
                </button>
              </div>
            )}
          </div>
        </div>

        <button className="upload_btn" onClick={uploadFile}>
          Upload
        </button>
      </div>
    </div>
  );
}
