import './App.scss';
import Header from "./containers/client/Header/Header";
import {Routes, Route, Link} from "react-router-dom";
import Home from "./containers/client/home/Home";
import Client from "./routes/Client.route";
import Admin from "./routes/Admin.route";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/admin/*" element={<Admin/>}/>
        <Route path="/*" element={<Client/>}/>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
      />
    </div>
  );
}

export default App;
