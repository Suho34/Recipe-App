import PropTypes from "prop-types";
import { GlobalContext } from "./GlobalContext";
import { useState } from "react";

export default function GlobalState({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favouritesList, setFavouritesList] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchTerm}`
      );
      const data = await response.json();
      if (data.data.recipes) {
        setRecipeList(data.data.recipes);
        setSearchTerm("");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleAddToFavorites(recipe) {
    setFavouritesList((prevFavourites) => {
      const isAlreadyFavourite = prevFavourites.some(
        (fav) => fav.id === recipe.id
      );
      return isAlreadyFavourite
        ? prevFavourites.filter((fav) => fav.id !== recipe.id)
        : [...prevFavourites, recipe];
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        searchTerm,
        loading,
        setLoading,
        recipeList,
        setSearchTerm,
        handleSubmit,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavorites,
        favouritesList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

GlobalState.propTypes = {
  children: PropTypes.node.isRequired,
};
