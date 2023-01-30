import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import PageHeading from "../../components/pageHeading";
import "./index.css";
import { useAuthContext } from "../../context/authContext";

export const fetchCartData = async () => {
  return await axios.get(`http://localhost:1337/api/carts`);
};

const Cart = ({ cart, handleChange,setCart }) => {
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  
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

  const handleRemove = async (id) => {
    await fetchCartData().then((response) => {
      var deleteItem = false;
      const currentItem = response?.data?.data?.filter((strapiCartItem) => {
        if (
          strapiCartItem?.attributes?.product_Id === id &&
          user?.id === strapiCartItem?.attributes?.user_Id
        ) {
          deleteItem = true;
          return strapiCartItem?.id;
        }
      });
      if (deleteItem) {
        axios.delete(`http://localhost:1337/api/carts/${currentItem[0]?.id}`);
        getCart();
      }
    });
  };

  const handlePrice = () => {
    let totalPrice = 0;
    cart?.map((item) => (totalPrice += item.amount * item.price));
    setPrice(totalPrice);
  };

  const onOrderClick = () => {
    alert("Order Placed");
    navigate("/");
  };

  useEffect(() => {
    handlePrice();
  }, [cart,user]);

  return (
    <>
      <PageHeading>Your Cart</PageHeading>
      {cart?.map((item) => {
        return (
          <div className="cart-table" key={item?.id}>
            <div className="cart-image">
              <img src={item?.image} />
              <p>{item?.name}</p>
            </div>
            <div className="update-quantity">
              <button onClick={() => handleChange(item, +1)}>+</button>
              <button>{item.amount}</button>
              <button onClick={() => handleChange(item, -1)}> - </button>
            </div>
            <div className="remove-button">
              <div className="initial-price">{item.price}</div>
              <button onClick={() => handleRemove(item.id)}>remove</button>
            </div>
          </div>
        );
      })}
      {price ? (
        <div className="total-price">
          <span>Total Price of your cart </span>
          <span>Rs - {price}</span>
        </div>
      ) : (
        <div className="total-price">
          <span>Cart is Empty </span>
        </div>
      )}
      {price ? (
        <button className="order bounce-top" onClick={() => onOrderClick()}>
          Order Now
        </button>
      ) : (
        <></>
      )}
      <Link to="/store">
        <button className="back">Back to Store</button>
      </Link>
    </>
  );
};

export default Cart;
