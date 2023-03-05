import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";

import { FaRegCopyright } from "react-icons/fa";

function App() {
  return (
    <div className="App">
      <div className="header">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <div className="footer">
        <FaRegCopyright /> ROHAN PAUL
      </div>
    </div>
  );
}

export default App;
