import React, { useState } from "react";
// import { Link } from "react-router-dom";
import type { Joke } from "../types/joke";

// Joke API URL
// https://icanhazdadjoke.com/

const Main: React.FC = () => {
  const [joke, setJoke] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJoke = async (previousJoke: string) => {
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
      if (data.joke === previousJoke) {
        console.log("---REFETCH---");
        return fetchJoke(previousJoke);
      }
      setJoke(data.joke);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1>Joke Generator</h1>
      <button onClick={() => fetchJoke(joke)} disabled={loading}>
        Joke Please!
      </button>

      <hr />

      <p>{error ? error : joke}</p>

      <button>Favorite</button>
    </section>
  );
};

export default Main;
