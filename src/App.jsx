import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import "./App.css";
import Navbar from "./components/sidebar";
import Home from "./pages/home";
import Store from "./pages/store";
import Cart, { fetchCartData } from "./pages/cart";
import Contact from "./pages/contact";
import Recipe from "./pages/recipe";
import ProductDetails from "./pages/productDetails";
import NotFound from "./pages/notFound";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import ProtectedRoute from "./components/protectedRoute";
import { AUTH_TOKEN } from "./constants";
import { useAuthContext } from "./context/authContext";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [navVisible, showNavbar] = useState(false);
  const [warning, setWarning] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [updateItemDetails, setUpdateItemDetails] = useState([]);
  const [cart, setCart] = useState([]);

  const token = localStorage.getItem(AUTH_TOKEN);
  const { user } = useAuthContext();

  function getCart() {
      fetchCartData().then((response) => {
        const newItems = response?.data?.data?.filter((strapiCartItem) => {
          return strapiCartItem?.attributes.user_Id === user?.id;
        });
        const setData = newItems?.map((item) => {
          const { name, image, amount, price, user_Id, product_Id } =
            item.attributes;
          return {
            name,
            image,
            amount,
            price,
            user_Id,
            id: product_Id,
          };
        });
        setCart(setData);
      });
  }

  async function filterCartData(item, action) {
    await fetchCartData().then((response) => {
      const currentItem = response?.data?.data?.filter((strapiCartItem) => {
        if (
          strapiCartItem?.attributes?.product_Id === item?.id &&
          strapiCartItem?.attributes?.user_Id == user?.id
        ) {
          const { name, price, product_Id, image, user_Id } =
            strapiCartItem?.attributes;
          var quantity = strapiCartItem?.attributes.amount;
          quantity += action;
          setUpdateItemDetails({
            name,
            price,
            product_Id,
            image,
            user_Id,
            amount: quantity,
          });
          return strapiCartItem?.id;
        }
      });
      setCurrentItemIndex(currentItem[0]?.id);
    });
  }

  const handleClick = (item) => {
    var isPresent = false; 
    cart?.forEach((product) => {
      if (item.id === product.id) {
        isPresent = true;
        setWarning(true);
        alert(`${item.name} item already present`);
        return;
      }
    });
    if (!isPresent) {
      const { name, price, id, amount, image } = item;
      axios
        .post("http://localhost:1337/api/carts", {
          data: {
            name,
            price,
            product_Id: id,
            amount,
            image,
            user_Id: user?.id,
          },
        })
        .then((response) => {
          console.log(response);
          getCart();
        });
    }
  };

  useEffect(() => {
    const { name, price, id, amount, image } = updateItemDetails;
    if (currentItemIndex) {
      axios
        .put(`http://localhost:1337/api/carts/${currentItemIndex}`, {
          data: {
            name,
            price,
            product_Id: id,
            amount,
            image,
            user_Id: user?.id,
          },
        })
        .then((response) => {
          console.log(response);
        });
    }
  }, [currentItemIndex,updateItemDetails]);

  function isAvailableInTheList(id) {
    return cart?.find((product) => product?.id === id);
  }

  const handleChange = async (item, action) => {
    await filterCartData(item, action);
  };

  useEffect(() => {
    if(user){
      getCart();
    }
  }, [user,currentItemIndex,updateItemDetails]);

  useEffect(() => {
    if (
      token &&
      (location.pathname === "/sign-in" || location.pathname === "/sign-up")
    ) {
      setRedirect(true);
      navigate("/");
      return;
    }
    if (!token) {
      setRedirect(false);
      return;
    }
  }, [redirect, token]);

  return (
    <>
      <Navbar visible={navVisible} show={showNavbar} size={cart?.length} />
      <Routes>
        {!redirect && (
          <Route
            path="/sign-in"
            element={
              <div className={!navVisible ? "page " : "page page-with-navbar"}>
                <Login />
              </div>
            }
          />
        )}
        <Route
          path="/sign-up"
          element={
            <div className={!navVisible ? "page " : "page page-with-navbar"}>
              <SignUp />
            </div>
          }
        />
        <Route
          path="/"
          element={
            <div className={!navVisible ? "page " : "page page-with-navbar"}>
              <ProtectedRoute Component={Home} />
            </div>
          }
        />
        <Route
          path="/store/*"
          element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <Store
                handleClick={handleClick}
                warning={warning}
                isSelected={isAvailableInTheList}
              />
            </div>
          }
        />
        <Route
          path="/cart"
          element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <Cart cart={cart} handleChange={handleChange} setCart={setCart}/>
            </div>
          }
        />
        <Route
          path="/recipe"
          element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <ProtectedRoute Component={Recipe} />
            </div>
          }
        />
        <Route
          path="/contact"
          element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <ProtectedRoute Component={Contact} />
            </div>
          }
        />
        <Route
          path={`/product/:id`}
          element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <ProtectedRoute Component={ProductDetails} />
            </div>
          }
        />
        <Route
          path={`*`}
          element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <NotFound />
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
