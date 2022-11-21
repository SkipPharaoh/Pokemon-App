import React, { useEffect, useState } from "react";
import { GetAllPokemon } from "../graphQL/pokemon-data";
import { useQuery } from "@apollo/client";
import { Card, Grid, Paper, Box, styled } from "@mui/material";
import {
  GQLVariableType,
  AllPokemon,
  AllPokemonId,
  AllPokemonName,
  AllPokemonImage,
} from "../types/pokemon-types";

const gqlVariables: GQLVariableType = {
  limit: 9,
  offset: 0,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
    id: AllPokemon?.pokemons.results.map((pokemon: AllPokemonId) => pokemon.id),
    name: AllPokemon?.pokemons.results.map((pokemon: AllPokemonName) => {
      return (
        <Grid
          item
          xs={2}
          sm={4}
          md={4}
          lg={5}
          xl={6}
          key={pokemon.name.toString()}
        >
          <Item>{pokemon.name}</Item>
        </Grid>
      );
    }),
    image: AllPokemon?.pokemons.results.map(
      (pokemon: AllPokemonImage) => pokemon.dreamworld
    ),
    previous: AllPokemon?.pokemons.previous,
    next: AllPokemon?.pokemons.next,
  };

  useEffect(() => {
    if (AllPokemon) {
      setPokemon(PokemonList);
    }
  }, [AllPokemon]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3, lg: 4, xl: 5 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 16, xl: 20 }}
      >
        {pokemon?.name}
      </Grid>
    </Box>
  );
}
