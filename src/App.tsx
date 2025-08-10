import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Pages
import Main from "./pages/Main";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/favorites" element={<Favorites />}></Route>
        <Route path="/" element={<Main />}></Route>
      </Routes>
    </Router>
  );
}
