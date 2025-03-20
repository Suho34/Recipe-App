import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import RecipeItem from "../RecipeItem";
export default function Favourite() {
  const { favouritesList, loading } = useContext(GlobalContext);
  if (loading) return <div className="loading-state">Loading...</div>;
  return (
    <div className="item-holder">
      {favouritesList.length > 0 ? (
        favouritesList.map((item, index) => (
          <RecipeItem item={item} key={index} />
        ))
      ) : (
        <div className="empty-state">
          <h2>
            Your favourites list is feeling lonely! Start adding your favorite
            recipes to keep it company.
          </h2>
        </div>
      )}
    </div>
  );
}
