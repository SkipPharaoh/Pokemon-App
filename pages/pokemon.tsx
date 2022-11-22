import React from "react";
import { Card, Grid, Paper, Box, styled } from "@mui/material";
import { usePokemonData } from "../hooks/FeedProvider/usePokemonData";
import NavigationBar from "../components/NavigationBar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Pokemon() {
  const { pokemons } = usePokemonData();

  const pokeId = pokemons?.id;
  const pokeName = pokemons?.name.map((name) => {
    return (
      <Grid item xs={2} sm={4} md={4} lg={5} xl={6} key={name}>
        <Item>{name}</Item>
      </Grid>
    );
  });
  const pokeImage = pokemons?.image;
  const pokePrevious = pokemons?.previous;
  const pokeNext = pokemons?.next;

  console.log(pokeName);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3, lg: 4, xl: 5 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 16, xl: 20 }}
      >
        {pokeName}
      </Grid>
    </Box>
  );
}
