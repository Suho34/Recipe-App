import { Link } from "react-router-dom";
import PropTypes from "prop-types";
export default function RecipeItem({ item }) {
  return (
    <div className="recipe-card">
      <img src={item.image_url} alt={item.title} className="recipe-image" />
      <span className="recipe-publisher">{item.publisher}</span>
      <h3 className="recipe-title">{item.title}</h3>
      <Link className="details-link" to={`/details/${item.id}`}>
        View Details
      </Link>
    </div>
  );
}
RecipeItem.propTypes = {
  item: PropTypes.shape({
    image_url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};
