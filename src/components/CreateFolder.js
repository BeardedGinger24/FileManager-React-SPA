import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

function CreateFolder() {
    const [name, setName] = useState("");
    let { id } = useParams();
    let history = useHistory();

    const onSubmit = function (e) {
        e.preventDefault();
        if (id) {
            axios
                .post(`http://localhost:8080/folders/${id}`,
                    {
                        name
                    }
                )
                .then(() => history.push(`/${id}`));
        } else {
            axios
                .post("http://localhost:8080/folders/",
                    {
                        name
                    }
                )
                .then(() => history.push("/"));
        }
    };
    
    return (
        <form onSubmit={onSubmit}>
            Name:{" "}
            <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br />
            <button>Create Folder</button>
        </form>
    );
}

export default CreateFolder;
