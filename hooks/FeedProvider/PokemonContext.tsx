import { createContext } from "react";
import { PokemonContextProps } from "../../types/PokemonDataProviderProps ";

export const PokemonContext = createContext<PokemonContextProps | undefined>(
  undefined
);
