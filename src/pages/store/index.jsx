import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";

import "./index.css";
import buttonList from "../../assets/buttonCategories/categories.json";
import useAxios from "../../customHooks/useAxios";
import PageHeading from "../../components/pageHeading";
import ProductCard from "../../components/productCard";

const Store = ({ handleClick, warning }) => {
  const axiosInstance = useAxios();

  const [productData, setProductData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [categoryUpdated, setCategoryUpdated] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");

  const searchItems = (searchValue) => {
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

  function getResponse() {
    axiosInstance
      .then((respponse) => setProductData(respponse.data))
      .catch((error) => console.log(error));
  }

  const filterItem = (categoryItem, name) => {
    const updateItem = productData.filter((currentItem) => {
      return currentItem.category === categoryItem;
    });
    setFilteredResults(updateItem);
    setCategoryUpdated(true);
    setActiveCategory(name);
  };

  useEffect(() => {
    getResponse();
  }, [searchInput]);

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
      <div className="product-section">
        {searchInput.length > 2 || categoryUpdated
          ? filteredResults.map((item) => {
              return (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  handleClick={handleClick}
                  name={item.name}
                  price={item.price}
                  rating={item.rating}
                  image={item.image}
                  amount={item.amount}
                />
              );
            })
          : productData.map((item) => {
              return (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  handleClick={handleClick}
                  name={item.name}
                  price={item.price}
                  rating={item.rating}
                  image={item.image}
                  amount={item.amount}
                />
              );
            })}
      </div>
    </>
  );
};

export default Store;