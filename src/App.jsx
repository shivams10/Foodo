import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import "./App.css";

function App() {
  const [navVisible, showNavbar] = useState(false);
  const [cart, setCart] = useState([]);
  const [warning, setWarning] = useState(false);

  const handleClick = (item) => {
    var isPresent = false;
    cart.forEach((product) => {
      if (item.id === product.id) {
        isPresent = true;
        setWarning(true);
        alert(`${item.name} is already present`);
        return;
      }
    });
    setCart([...cart, item]);
  };

  return (
    <>
      <Navbar visible={navVisible} show={showNavbar} size={cart.length} />
      <Routes>
        <Route
          path="/store"
          element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <Store handleClick={handleClick} warning={warning} />
            </div>
          }
        />
        <Route
          path="/recipe"
          element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <Recipe />
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
