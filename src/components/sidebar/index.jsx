import { useEffect, useState } from "react";
import { GiRiceCooker } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaAngleRight,
  FaAngleLeft,
  FaChartBar,
  FaThLarge,
  FaShoppingCart,
  FaBars,
  FaWpforms,
} from "react-icons/fa";

import "./index.css";
import { useAuthContext } from "../../context/authContext";
import { removeToken } from "../../helpers";
import { AUTH_TOKEN } from "../../constants";
import Header from "../header";

const ICON_SIZE = 20;

const Navbar = ({ visible, show, size }) => {
  const [IsloggedIn, SetIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuthContext();

  const handleLogout = () => {
    removeToken();
    SetIsLoggedIn(false);
    // LogIn(false);
    navigate("/sign-in");
  };

  useEffect(() => {
    SetIsLoggedIn(localStorage.getItem(AUTH_TOKEN) ? true : false);
    // if (IsloggedIn) {
    //   LogIn(IsloggedIn);
    // }
  }, [user, IsloggedIn]);

  return (
    <>
    <Header />
      {IsloggedIn && <><div className="mobile-nav">
        <button className="mobile-nav-button" onClick={() => show(!visible)}>
          <FaBars size={24} />
        </button>
        <div className="navbar-items">
          <NavLink to="/cart">
            <div className="cart-quantity">
              {size}
              <FaShoppingCart size={24} className="shopping-cart" />
            </div>
          </NavLink>
          
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          
        </div>
      </div>
      <nav className={!visible ? "navbar" : ""}>
        <button
          type="button"
          className="nav-button"
          onClick={() => show(!visible)}
        >
          {!visible ? (
            <div className="menu-option">
              <FaAngleRight size={30} />
              Menu
            </div>
          ) : (
            <FaAngleLeft size={30} />
          )}
        </button>
        <div>
          <NavLink className="logo" to="/">
            <img src={require("../../assets/images/logo.jpeg")} alt="logo" />
          </NavLink>
          <div className="links nav-top">
            <NavLink to="/" className="nav-link">
              <FaThLarge size={ICON_SIZE} />
              <span>Home</span>
            </NavLink>
            <NavLink to="/store" className="nav-link">
              <FaChartBar size={ICON_SIZE} />
              <span>Store </span>
            </NavLink>
            <NavLink to="/cart" className="nav-link">
              <FaShoppingCart size={ICON_SIZE} />
              <span>Cart</span>
            </NavLink>
            <NavLink to="/recipe" className="nav-link">
              <GiRiceCooker size={ICON_SIZE} />
              <span>Recipe</span>
            </NavLink>
          </div>
        </div>

        <div className="links">
          <NavLink to="/contact" className="nav-link">
            <FaWpforms size={ICON_SIZE} />
            <span>Contact</span>
          </NavLink>
        </div>
      </nav></>}
    </>
  );
};
export default Navbar;
