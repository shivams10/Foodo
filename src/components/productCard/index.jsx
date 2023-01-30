import { Link } from "react-router-dom";
import { BiCommentDots } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";

import "./index.css";

const ProductCard = (props) => {
  const { handleClick, details, isSelected } = props;
  const { name, price, rating, image, amount, id } = details;

  return (
    <div className="product-card swing-in-top-fwd">
      <div className="product-image">
        <img src={image} />
      </div>
      <div className="product-info">
        <h4 className="product-name">{name}</h4>
        <div className="extra-info">
          <p className="product-price">₹ {price}</p>
          <span>
            <BsStarFill />
            {rating}
            <Link to={`/product/${id}`} className="review-button" props={props}>
              <BiCommentDots size="16px" />
            </Link>
          </span>
        </div>
        <button
          className="button"
          onClick={() =>
            handleClick({ name, price, image, amount, id })
          }
        >
          {isSelected(id)?<>Added</>:<>Add to cart</>}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
