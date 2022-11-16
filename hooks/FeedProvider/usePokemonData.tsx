import { useContext } from "react";
import { PokemonContextProps } from "../../types/PokemonDataProviderProps ";
import { PokemonContext } from "./PokemonContext";

export const usePokemonData = (): PokemonContextProps => {
  const context = useContext(PokemonContext);

  if (!context) {
    throw new Error("`usePokemonData` must be used within a `FeedProvider");
  }

  return context;
};
