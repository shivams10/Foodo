import { Link } from "react-router-dom";
import {BiCommentDots} from "react-icons/bi"
import { BsStarFill } from "react-icons/bs";

import "./index.css";

const ProductCard = (props) => {
  const { name, price, rating, image, amount, handleClick, id } =
    props;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} />
      </div>
      <div className="product-info">
        <h4 className="product-name">{name}</h4>
        <div className="extra-info">
          <p className="product-price">₹ {price}</p>
          <span>
          <BsStarFill />{rating} 
            <Link to={`/product/${id}`} className="review-button" props={props}>
               <BiCommentDots size="16px" />
            </Link>
          </span>
        </div>
        <button
          className="button"
          onClick={() =>
            handleClick({ name, price, rating, image, amount, id })
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
