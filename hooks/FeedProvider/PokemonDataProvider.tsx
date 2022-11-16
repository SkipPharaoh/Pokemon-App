import { useMemo } from "react";
import {
  PokemonContextProps,
  PokemonDataProviderProps,
} from "../../types/PokemonDataProviderProps ";
import { PokemonContext } from "./PokemonContext";

export const PokemonDataProvider = ({
  children,
}: PokemonDataProviderProps): JSX.Element => {
  const value: PokemonContextProps = useMemo(() => ({}), []);

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};
