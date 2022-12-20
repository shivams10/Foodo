import { useState } from "react";

import Navbar from "./components/navbar";
import "./App.css";

function App() {
  const [navVisible, showNavbar] = useState(false);

  return <Navbar visible={navVisible} show={showNavbar} size={cart.length} />;
}

export default App;
