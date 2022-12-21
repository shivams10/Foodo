import { useEffect, useState, useRef } from "react";

import "./index.css";
import PageHeading from "../../components/pageHeading";

const Recipe = () => {

  const [loading, setLoading] = useState(false);
  const [ingredientList, setIngredientList] = useState([]);
  const inputRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [recipeSteps, setRecipeSteps] = useState([]);
  const [label, setLabel] = useState("");

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const search = () => {
    searchForRecipe(inputRef.current.value);
    inputRef.current.value = "";
  };

  const searchForRecipe = (query) => {
    setLoading(true);
    let url = `search?q=${query}&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}`;
    fetch(url, { mode: "no-cors" })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setIngredientList(response.hits);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    searchForRecipe("chicken");
  }, []);
  return (
    <>
      <PageHeading>Recipe</PageHeading>
      <header className="recipe-header">
        <div className="input-wrapper">
          <input ref={inputRef} placeholder="Search for Recipe" />
          <button onClick={search}>Search</button>
        </div>
        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <h2>{label}</h2>
              <ul>
                {recipeSteps.map((item, index) => {
                  return <li key={index}>{item}</li>;
                })}
              </ul>
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
            {ingredientList.map(({ recipe }) => {
              const { label, image, ingredientLines } = recipe;
              return (
                <div className="ingredient" key={recipe.label}>
                  <span>{label}</span>
                  <img src={image} />
                  <button
                    className="get-recipe-button"
                    onClick={() => {
                      toggleModal();
                      setRecipeSteps(ingredientLines);
                      setLabel(label);
                    }}
                  >
                    Get Recipe
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </header>
    </>
  );
};

export default Recipe;