import { useEffect, useState } from "react";
import axios from "axios";

import "./index.css";
import { API } from "../../constants";
import PageHeading from "../../components/pageHeading";
import { useAuthContext } from "../../context/authContext";
import DummyImage from "../../assets/images/vegetable.webp";

const Recipe = () => {
  const [loading, setLoading] = useState(false);
  const [ingredientList, setIngredientList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [modal, setModal] = useState(false);
  const [recipeSteps, setRecipeSteps] = useState("");
  const [label, setLabel] = useState("");

  const { user } = useAuthContext();

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  function fetchRecipeData() {
    setLoading(true);
    axios.get(`${API}/recipes?populate=*`).then((response) => {
      const recipeDsta = response.data.data.map((food) => {
        const { name, steps, image } = food?.attributes;
        return {
          id: food?.id,
          name,
          steps,
          image: image.data? `http://localhost:1337${image?.data?.attributes?.url}`: DummyImage,
        };
      });
      setIngredientList(recipeDsta);
      setLoading(false);
    });
  }

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = ingredientList.filter((item) => {
        return Object.values(item.name)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(ingredientList);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRecipeData();
    }
  }, [user]);

  return (
    <>
      <PageHeading>Recipes</PageHeading>
      <header className="recipe-header">
        <div className="input-wrapper">
          <input
            placeholder="Search for Recipe"
            onChange={(e) => searchItems(e.target.value)}
          />
          <button>Search</button>
        </div>
        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <h2>{label}</h2>
              <p>{recipeSteps}</p>
              <button className="close-modal" onClick={toggleModal}>
                X
              </button>
            </div>
          </div>
        )}
        {loading ? (
          <p className="loading">Loading</p>
        ) : (
          <div className="wrapper">
            {searchInput.length > 2 ? (
              <>
                {filteredResults.length ? (
                  <>
                    {filteredResults?.map((recipe) => {
                      const { name, image, steps } = recipe;
                      return (
                        <div className="ingredient" key={recipe.name}>
                          <span>{name}</span>
                          <img src={image} />
                          <button
                            className="get-recipe-button"
                            onClick={() => {
                              toggleModal();
                              setRecipeSteps(steps);
                              setLabel(name);
                            }}
                          >
                            Get Recipe
                          </button>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>no matching results</>
                )}
              </>
            ) : (
              <>
                {ingredientList?.map((recipe) => {
                  const { name, image, steps } = recipe;
                  return (
                    <div className="ingredient" key={recipe.name}>
                      <span>{name}</span>
                      <img src={image} />
                      <button
                        className="get-recipe-button"
                        onClick={() => {
                          toggleModal();
                          setRecipeSteps(steps);
                          setLabel(name);
                        }}
                      >
                        Get Recipe
                      </button>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}
      </header>
    </>
  );
};

export default Recipe;
