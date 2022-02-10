import './App.scss';
import Header from "./containers/header/Header";
import {Routes, Route, Link} from "react-router-dom";
import Home from "./containers/home/Home";

function App() {
  return (
    <div className="app">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
