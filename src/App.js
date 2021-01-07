// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FileManager from "./components/FileManager";
import CreateFolder from "./components/CreateFolder";
import FileUpload from "./components/FileUpload";
import 'bootstrap/dist/css/bootstrap.min.css';
// import CreateFolderId from "./components/CreateFolderId";
// import EditEntry from "./components/EditEntry";

function App() {
  return (
    <Router>
      <Switch>
        
        <Route path="/fileUpload/:id?">
          <FileUpload />
        </Route>

        <Route path="/createFolder/:id?">
          <CreateFolder />
        </Route>

        <Route path="/:id?">
          <FileManager />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
