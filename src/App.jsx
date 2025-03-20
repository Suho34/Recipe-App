import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import Favourite from "./pages/Favourite";
import Details from "./pages/Details";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favs" element={<Favourite />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </>
  );
}
export default App;
