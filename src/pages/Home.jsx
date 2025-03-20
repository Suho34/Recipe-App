import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import RecipeItem from "../RecipeItem";
export default function Home() {
  const { recipeList, loading } = useContext(GlobalContext);
  if (loading) return <div className="loading-state">Loading...</div>;
  return (
    <div className="item-holder">
      {recipeList.length > 0 ? (
        recipeList.map((item, index) => <RecipeItem item={item} key={index} />)
      ) : (
        <div className="empty-state">
          <h2>
            Welcome to Kitchen Wizard! Discover, cook, and enjoy delicious
            recipes tailored just for you
          </h2>
        </div>
      )}
    </div>
  );
}
