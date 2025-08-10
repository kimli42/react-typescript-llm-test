import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";

// Pages
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Routes>
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}
