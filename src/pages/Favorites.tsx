import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";

const Favorites: React.FC = () => {
  const { favorites, clearFavorites } = useFavorites();
  return (
    <section>
      <Link to="/">Go to Home</Link>
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <>
          <button onClick={clearFavorites} style={{ marginBottom: 12 }}>
            Delete All Favorites
          </button>
          <ul>
            {favorites.map((joke) => (
              <li key={joke.id}>{joke.joke}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default Favorites;
