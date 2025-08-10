import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Joke } from "../types/joke";

interface FavoritesContextType {
  favorites: Joke[];
  addFavorite: (joke: Joke) => void;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Joke[]>(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (joke: Joke) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === joke.id)) return prev;
      return [...prev, joke];
    });
  };

  const clearFavorites = () => setFavorites([]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, clearFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
