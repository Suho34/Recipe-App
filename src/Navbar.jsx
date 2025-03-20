import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "./context/GlobalContext";

export default function Navbar() {
  const { searchTerm, setSearchTerm, handleSubmit } = useContext(GlobalContext);
  return (
    <nav>
      <h1>Kitchen Wizard</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search recipes..."
        />
      </form>
      <ul>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/favs">Favourites</NavLink>
      </ul>
    </nav>
  );
}
