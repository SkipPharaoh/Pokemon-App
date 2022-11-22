import { useMemo, useState, useEffect, useCallback } from "react";
import NavigationBar from "../../components/NavigationBar";
import {
  AllPokemon,
  GQLVariableType,
  AllPokemonId,
  AllPokemonName,
  AllPokemonImage,
  PokemonDetail,
} from "../../types/pokemon-types";
import {
  PokemonContextProps,
  PokemonDataProviderProps,
} from "../../types/PokemonDataProviderProps ";
import { PokemonContext } from "./PokemonContext";
import { regions } from "../../pokemon-info/pokeInfo";
import { useQuery } from "@apollo/client";
import { GetAllPokemon, GetPokemonDetail } from "../../graphQL/pokemon-data";
import useFormatString from "../FormatString/useFormatString";

const defaultVariable: GQLVariableType = {
  limit: regions[0].limit,
  offset: regions[0].offset,
};

export const PokemonDataProvider = ({
  children,
}: PokemonDataProviderProps): JSX.Element => {
  const [region, setRegion] = useState<string | HTMLElement>(regions[0].name);
  const [variable, setVariable] = useState<GQLVariableType>(defaultVariable);
  const [pokemons, setPokemons] = useState<AllPokemon>();
  const [pokemon, setPokemon] = useState<PokemonDetail>();

  const {
    loading: AllPokemonLoading,
    error: AllPokemonError,
    data: AllPokemon,
  } = useQuery(GetAllPokemon, {
    variables: variable,
  });

  const { loading, error, data } = useQuery(GetPokemonDetail, {
    variables: "",
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

  let regionName: string | HTMLElement;

  useEffect(() => {
    if (!AllPokemonLoading) {
      setPokemons(PokemonList);
      console.log(pokemons);
    }
  }, [AllPokemon]);

  const handleOnClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    regionName = evt.target as HTMLElement;
    evt.preventDefault();
    regionName = useFormatString(regionName.innerText);
    setRegion(regionName);
    regions.map((region) => {
      if (region.name === regionName)
        setVariable({ limit: region.limit, offset: region.offset });
    });
  };

  const value: PokemonContextProps = useMemo(
    () => ({ handleOnClick: handleOnClick, pokemons }),
    [handleOnClick, pokemons]
  );

  return (
    <PokemonContext.Provider value={value}>
      <NavigationBar />
      {children}
    </PokemonContext.Provider>
  );
};
