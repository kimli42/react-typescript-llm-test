import React, { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";
import type { Joke } from "../types/joke";

// Joke API URL
// https://icanhazdadjoke.com/

const Home: React.FC = () => {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { addFavorite } = useFavorites();

  const fetchJoke = async (previousJoke?: Joke | null) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const data: Joke = await res.json();
      if (previousJoke && data.id === previousJoke.id) {
        // Avoid duplicate joke
        return fetchJoke(previousJoke);
      }
      setJoke(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Link to="/favorites">Go to Favorites</Link>
      <h1>Joke Generator</h1>
      <button onClick={() => fetchJoke(joke)} disabled={loading}>
        Joke Please!
      </button>
      <hr />
      <p>{error ? error : joke?.joke}</p>
      <button onClick={() => joke && addFavorite(joke)} disabled={!joke}>
        Add To Favorites
      </button>
    </section>
  );
};

export default Home;
