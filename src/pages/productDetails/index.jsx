import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./index.css";
import PageHeading from "../../components/pageHeading";
import Comment from "../../components/comment";
import { BsStarFill } from "react-icons/bs";

const fetchFood = (id) => {
  return axios.get(`http://localhost:1337/api/foods/${id}?populate=*`);
};

const ProductDetails = () => {
  const { id: foodId } = useParams();
  const [producxtData, setProductData] = useState([]);
  const [finalRating, setFinalRating] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const chooseRating = (finalRating) => {
    setFinalRating(parseFloat(finalRating).toFixed(1));
  };

  const { name, image, rating, description } = producxtData;

  useEffect(() => {
    setLoading(true);
    fetchFood(`${foodId}`)
      .then((response) => {
        setProductData(response?.data?.data?.attributes);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
    chooseRating(); 
  }, [foodId]);

  if(error){
    return <h3>{error}</h3>
  }

  return (
    <> 
      <div>
        <PageHeading>{name}</PageHeading>
        {loading && <h3>Loading</h3>}
        <div className="description-container">
          <div className="description">
            <div className="container-image">
              <img
                src={`http://localhost:1337${image?.data?.attributes?.url}`}
              />
            </div>
            <div className="container-details">
              <div className="detail">
                <span>Key points:</span> {description}
              </div>

              <div className="detail">
                <span>Ratings:</span>{" "}
                {isNaN(finalRating) ? (
                  <>
                    {rating} <BsStarFill color="orange" />
                  </>
                ) : (
                  <>
                    {finalRating} <BsStarFill color="orange" />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <Comment chooseRating={chooseRating} />
      </div>
    </>
  );
};

export default ProductDetails;
