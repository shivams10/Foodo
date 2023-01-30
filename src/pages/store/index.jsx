import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { SyncLoader } from "react-spinners";

import "./index.css";
import buttonList from "../../assets/buttonCategories/categories.json";
import PageHeading from "../../components/pageHeading";
import ProductCard from "../../components/productCard";
import { useAuthContext } from "../../context/authContext";
import DummyImage from "../../assets/images/vegetable.webp";

const Store = ({ handleClick, isSelected }) => {
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [categoryUpdated, setCategoryUpdated] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");

  const { user } = useAuthContext();

  function fetchFoodData() {
    setLoading(true);
    axios.get("http://localhost:1337/api/foods?populate=*").then((response) => {
      const foodData = response.data.data.map((food) => {
        const { name, category, rating, amount, price, description, image } =
          food?.attributes;
        return {
          id: food?.id,
          name,
          category,
          rating,
          amount,
          price,
          description,
          image: image.data? `http://localhost:1337${image?.data?.attributes?.url}`: DummyImage,
        };
      });
      setProductData(foodData);
      setLoading(false);
    });
  }

  const searchItems = (searchValue) => {
    searchValue = searchValue.trim();
    console.log(searchValue)
    setActiveCategory("");
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = productData.filter((item) => {
        return Object.values(item.name)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(productData);
    }
  };

  const filterItem = (categoryItem, name) => {
    const updateItem = productData.filter((currentItem) => {
      return currentItem.category === categoryItem;
    });
    setFilteredResults(updateItem);
    setCategoryUpdated(true);
    setActiveCategory(name);
  };

  useEffect(() => {
    if (user) {
      fetchFoodData();
    }
  }, [user]);

  return (
    <>
      <PageHeading>Store</PageHeading>
      <div className="category-filter">
        {buttonList.map(({ id, name, slug }) => {
          return (
            <button
              className={`category-button ${
                activeCategory === name && "active-category"
              }`}
              key={id}
              onClick={() => filterItem(`${slug}`, name)}
            >
              {name}
            </button>
          );
        })}
      </div>
      <div className="filters">
        <div className="search-filter">
          <BsSearch className="search-icon" />
          <input
            icon="search"
            placeholder="Search Food"
            onChange={(e) => searchItems(e.target.value)}
          />
        </div>
      </div>
      {loading ? (
        <SyncLoader
          color="hsla(261, 67%, 53%, 1)"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10%",
          }}
        />
      ) : (
        <div className="product-section">
          {searchInput.length > 2 || categoryUpdated ? (
            filteredResults.length ? (
              filteredResults.map((item) => {
                return (
                  <ProductCard
                    key={item.id}
                    details={item}
                    handleClick={handleClick}
                    isSelected={isSelected}
                  />
                );
              })
            ) : (
              <h2 className="not-found">No Item found</h2>
            )
          ) : (
            productData?.map((item) => {
              return (
                <ProductCard
                  key={item.id}
                  details={item}
                  handleClick={handleClick}
                  isSelected={isSelected}
                />
              );
            })
          )}
        </div>
      )}
    </>
  );
};

export default Store;
