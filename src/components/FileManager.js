import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function FileManager() {
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    let { id } = useParams();

    const [currentFolder, setCurrentFolder] = useState("Root");
    const [lastPage, setLastPage] = useState("");
    const [back, setBack] = useState([]);

    const fetchData = async () => {
        if (id != null) {
            await axios.get(`http://localhost:8080/folders/${id}`).then((response) => {
                setCurrentFolder(response.data.folderName);

                if (response.data.parentFolderId) {
                    setLastPage(response.data.parentFolderId);
                } else {
                    setLastPage("");
                }

                setBack("Go Back");
                if (response.data.folders) {
                    setFolders(response.data.folders);
                }
                if (response.data.files) {
                    setFiles(response.data.files);
                }
            });
        } else {
            await axios.get("http://localhost:8080/folders/").then((response) => {
                setCurrentFolder("Root");
                setLastPage("");

                setBack("");
                if (response.data.folders) {
                    setFolders(response.data.folders);
                }
                if (response.data.files) {
                    setFiles(response.data.files);
                }
            });
        }
    }

    useEffect(() => {
        fetchData();
    }, [id]);

    return (
        <div class="">
            <div class="text-center ">
                <h2 class="font-monospace">File Manager</h2>
                <h3>Folder: {currentFolder}</h3>
            </div>
            <div class="mx-auto">
                <table cellPadding="3" class="table">
                    <thead>
                        <tr>
                            <th class="text-center">Type</th>
                            <th>Name</th>
                            <th class="text-center">File Version</th>
                            <th class="text-center">Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {folders.map((folder) => (
                            <tr key={folder.id}>
                                <td style={{ textAlign: "center" }}><img src={"https://img.icons8.com/ios/24/000000/folder-invoices--v1.png"} /></td>
                                <td>
                                    <Link to={`/${folder.id}`} >
                                        {folder.name}
                                    </Link>
                                </td>
                                <td style={{ textAlign: "center" }}></td>
                                <td style={{ textAlign: "center" }}>
                                    <Link
                                        onClick={() => {
                                            axios
                                                .delete(`http://localhost:8080/folders/${folder.id}`)
                                                .then(() => {
                                                    let newFolders = folders.filter(
                                                        (e) => e.id !== folder.id
                                                    );
                                                    setFolders(newFolders);
                                                });
                                        }}
                                    >
                                        <img src="https://img.icons8.com/color/50/000000/waste--v1.png" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {files.map((file) => (
                            <tr key={file.id}>

                                <td style={{ textAlign: "center" }}><img src={"https://img.icons8.com/ios/24/000000/file--v1.png"} /></td>
                                <td>
                                    <a href={`http://localhost:8080/folders/files/${file.name}`} download>
                                        {file.name}
                                    </a>
                                </td>
                                <td class="text-center">{file.version}</td>
                                <td style={{ textAlign: "center" }}>
                                    <Link
                                        onClick={() => {
                                            axios
                                                .delete(`http://localhost:8080/folders/files/${file.id}`)
                                                .then(() => {
                                                    let newFiles = files.filter(
                                                        (e) => e.id !== file.id
                                                    );
                                                    setFiles(newFiles);
                                                });
                                        }}
                                    >
                                        <img src="https://img.icons8.com/color/50/000000/waste--v1.png" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p> <Link to={`/createFolder/${id || ""}`}>Create Folder</Link></p>
            <p> <Link to={`/fileUpload/${id || ""}`}>Upload File</Link></p>
            <p>
                <Link to={`/${lastPage}`}>
                    {back}
                </Link>
            </p>
        </div>
    );
}

export default FileManager;
