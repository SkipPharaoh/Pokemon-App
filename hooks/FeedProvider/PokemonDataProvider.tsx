import { useMemo, useState, useEffect } from "react";
import NavigationBar from "../../components/NavigationBar";
import {
  AllPokemon,
  GQLVariableType,
  AllPokemonId,
  AllPokemonName,
  AllPokemonImage,
} from "../../types/pokemon-types";
import {
  PokemonContextProps,
  PokemonDataProviderProps,
} from "../../types/PokemonDataProviderProps ";
import { PokemonContext } from "./PokemonContext";
import { regions } from "../../pokemon-info/pokeInfo";
import { useQuery } from "@apollo/client";
import { GetAllPokemon } from "../../graphQL/pokemon-data";

const variableInfo: GQLVariableType = {
  limit: regions[0].limit,
  offset: regions[0].offset,
};

const gqlVariables: GQLVariableType = {
  limit: 151,
  offset: 0,
};

export const PokemonDataProvider = ({
  children,
}: PokemonDataProviderProps): JSX.Element => {
  const [region, setRegion] = useState<string>(regions[0].name);
  const [variable, setVariable] = useState<GQLVariableType>(variableInfo);
  const [pokemon, setPokemon] = useState<AllPokemon>();

  const {
    loading: AllPokemonLoading,
    error: AllPokemonError,
    data: AllPokemon,
  } = useQuery(GetAllPokemon, {
    variables: gqlVariables,
  });

  const PokemonList: AllPokemon = {
    id: AllPokemon?.pokemons.results.map((pokemon: AllPokemonId) => pokemon.id),
    name: AllPokemon?.pokemons.results.map(
      (pokemon: AllPokemonName) => pokemon.name
    ),
    image: AllPokemon?.pokemons.results.map(
      (pokemon: AllPokemonImage) => pokemon.dreamworld
    ),
    previous: AllPokemon?.pokemons.previous,
    next: AllPokemon?.pokemons.next,
  };

  useEffect(() => {
    if (!AllPokemonLoading) {
      setPokemon(PokemonList);
      console.log(pokemon);
    }
  }, [AllPokemon]);

  const handleOnClick = (evt: React.SyntheticEvent) => {
    useEffect(() => {
      // setRegion(region[EventTarget])
    }, [region]);
    evt.preventDefault();
  };

  const value: PokemonContextProps = useMemo(
    () => ({ region, handleOnClick: handleOnClick, pokemon }),
    [region, handleOnClick, pokemon]
  );

  return (
    <PokemonContext.Provider value={value}>
      <NavigationBar />
      {children}
    </PokemonContext.Provider>
  );
};
