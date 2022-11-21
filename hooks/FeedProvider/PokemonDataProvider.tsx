import { useMemo, useState, useEffect } from "react";
import NavigationBar from "../../components/NavigationBar";
import { GQLVariableType } from "../../types/pokemon-types";
import {
  PokemonContextProps,
  PokemonDataProviderProps,
} from "../../types/PokemonDataProviderProps ";
import { PokemonContext } from "./PokemonContext";
import { regions } from "../../pokemon-info/pokeInfo";

const variableInfo: GQLVariableType = {
  limit: regions[0].limit,
  offset: regions[0].offset,
};

export const PokemonDataProvider = ({
  children,
}: PokemonDataProviderProps): JSX.Element => {
  const [region, setRegion] = useState<string>(regions[0].name);
  const [variable, setVariable] = useState<GQLVariableType>(variableInfo);

  const handleOnClick = (evt: React.SyntheticEvent) => {
    useEffect(() => {
      // setRegion(region[EventTarget])
    }, [region]);
    evt.preventDefault();
  };

  const value: PokemonContextProps = useMemo(
    () => ({ region, handleOnClick: handleOnClick }),
    [region, handleOnClick]
  );

  return (
    <PokemonContext.Provider value={value}>
      <NavigationBar />
      {children}
    </PokemonContext.Provider>
  );
};
