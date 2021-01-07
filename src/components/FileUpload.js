import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import FileUploader from "./FileUploader";
import axios from "axios";

const FileUpload = () => {
    const [name, setName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [response, setResponse] = useState(null);

    let { id } = useParams();
    let history = useHistory();

    async function uploadFile(argId = null) {
        const formData = new FormData();
        formData.append("uploadedFile", selectedFile);

        if (argId) {
            const res = await axios
                .post(`http://localhost:8080/folders/${id}/files/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            return res.data;
            // .then((res) => res.data);
        } else {
            const res = await axios
                .post("http://localhost:8080/folders/files/", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            return res.data;
            // .then((res) => res.data);
        }
    }

    const onSubmit = async function (e) {
        e.preventDefault();

        if (id) {
            await uploadFile(id).then(history.push(`/${id}`));
            // .catch((err) => console.log(err));
        } else {
            await uploadFile().then(history.push("/"));
            // .catch((err) => console.log(err));
        }
    };

    return (
        <div className="App">
            <form>
                {/* <h3
                    type="text"
                    value={name}
                    // onChange={(e) => setName(e.target.value)}
                /> */}

                {/* <input
                    type="file"
                    value={selectedFile}
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                /> */}

                <FileUploader
                    onFileSelectSuccess={
                        (file) => {
                            setSelectedFile(file);
                            setName(file.name);
                        }
                    }
                    onFileSelectError={({ error }) => alert(error)}
                />

                <button onClick={onSubmit}>Upload</button>
            </form>
        </div>
    );
};

export default FileUpload;