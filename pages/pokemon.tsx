import React, { useEffect, useState } from "react";
import { GetAllPokemon } from "../graphQL/pokemon-data";
import { useQuery } from "@apollo/client";

interface GQLVariableType {
  limit: number;
  offset: number;
}

const gqlVariables: GQLVariableType = {
  limit: 1,
  offset: 0,
};

interface AllPokemon {
  id: number[];
  name: string[];
  image: string[];
  next: string;
  previous: string;
}

export default function Pokemon() {
  const [pokemon, setPokemon] = useState<AllPokemon>();
  const {
    loading: AllPokemonLoading,
    error: AllPokemonError,
    data: AllPokemon,
  } = useQuery(GetAllPokemon, {
    variables: gqlVariables,
  });

  const PokemonList = {
    id: AllPokemon?.pokemons.results.map((pokemon: AllPokemon) => pokemon.id),
    name: AllPokemon?.pokemons.results.map(
      (pokemon: AllPokemon) => pokemon.name
    ),
    image: AllPokemon?.pokemons.results.map(
      (pokemon: AllPokemon) => pokemon.image
    ),
    previous: AllPokemon?.pokemons.previous,
    next: AllPokemon?.pokemons.next,
  };

  useEffect(() => {
    setPokemon(PokemonList);
  }, [AllPokemonLoading]);

  console.log(pokemon);

  return <>{pokemon?.name}</>;
}
