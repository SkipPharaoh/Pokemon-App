import { useMemo } from "react";
import NavigationBar from "../../components/NavigationBar";
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
    <PokemonContext.Provider value={value}>
      <NavigationBar />
      {children}
    </PokemonContext.Provider>
  );
};
