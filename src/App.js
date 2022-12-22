import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import "./App.css";

function App() {
  const [navVisible, showNavbar] = useState(false);

  return (
    <>
      <Navbar visible={navVisible} show={showNavbar} size={cart.length} />
      <Routes>
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
