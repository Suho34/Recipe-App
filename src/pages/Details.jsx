import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export default function Details() {
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    favouritesList,
    handleAddToFavorites,
  } = useContext(GlobalContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRecipeDetails() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );
        const data = await response.json();
        if (data.data?.recipe) {
          setRecipeDetailsData(data.data.recipe);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    getRecipeDetails();
  }, [id, setRecipeDetailsData]);

  return (
    <div className="recipe-details-page">
      {loading ? (
        <div className="loading-state">Loading...</div>
      ) : recipeDetailsData ? (
        <>
          <div className="recipe-header">
            <img
              src={recipeDetailsData.image_url}
              alt={recipeDetailsData.title}
              className="recipe-image"
            />
            <p className="recipe-publisher">{recipeDetailsData.publisher}</p>
            <h1 className="recipe-title">{recipeDetailsData.title}</h1>
            <div>
              <h2 className="ingredients-count">
                {recipeDetailsData.ingredients.length} Ingredients
              </h2>
            </div>
            <div className="button-group">
              <button
                className="fav-button "
                onClick={() => handleAddToFavorites(recipeDetailsData)}
              >
                {favouritesList.some((fav) => fav.id === recipeDetailsData.id)
                  ? "Remove from Favourites"
                  : "Add to Favourites"}
              </button>
              <button
                className="back-button"
                onClick={() => window.history.back()}
              >
                Back
              </button>
            </div>
          </div>

          <div className="ingredients-section">
            <h3>Ingredients</h3>
            <ul className="ingredients-list">
              {recipeDetailsData.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient-item">
                  {ingredient.quantity} {ingredient.unit} -{" "}
                  {ingredient.description || ingredient.ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="instructions-section">
            <h3>Instructions</h3>

            <div className="source-section">
              <a
                href={recipeDetailsData.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="source-link button"
              >
                View Full Recipe
              </a>
            </div>
          </div>
        </>
      ) : (
        <div className="no-data">No recipe details available</div>
      )}
    </div>
  );
}
