import React from "react";
import {
  Grid,
  Box,
  Card,
  Avatar,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import { usePokemonData } from "../hooks/FeedProvider/usePokemonData";
import Link from "next/link";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterBar from "../components/FilterBar";
import { useQuery } from "@apollo/client";
import { GetPokemonType } from "../graphQL/pokemon-data";

export default function Pokemon() {
  const { pokemons, handleViewPokemon } = usePokemonData();

  const PokemonTypes = ({ name }) => {
    const { data } = useQuery(GetPokemonType, {
      variables: { name: name },
    });
    const pokeTypes = data?.pokemon.types;
    const type = pokeTypes?.map((type, id: number) => {
      const typeName = type.type.name;
      return (
        <Box sx={{ mx: 1 }} key={id}>
          <Tooltip title="Pokemon Type" sx={{ objectFit: "contain" }}>
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="type"
              srcSet={`/assets/pokeTypes/${typeName}.png`}
            />
          </Tooltip>
        </Box>
      );
    });
    return type;
  };

  const pokemonCard = pokemons?.pokemonData?.map((pokemon) => {
    const id = pokemon.id;
    const name = pokemon.name;
    const image = pokemon.dreamworld;
    return (
      <Grid item xs={1} sm={2} md={3} lg={4} xl={6} key={id}>
        <Card>
          <CardHeader
            action={
              <IconButton
                aria-label="View Pokemon Details"
                onClick={() => {
                  handleViewPokemon(name);
                }}
              >
                <Tooltip title="Pokemon Details">
                  <Link href={`/pokemon/${name}`}>
                    <MoreVertIcon />
                  </Link>
                </Tooltip>
              </IconButton>
            }
            title={`#${id}`}
          />
          <CardMedia
            component="img"
            height="194"
            image={image}
            alt={name}
            sx={{ objectFit: "contain" }}
          />
          <CardContent>
            <Typography variant="body2" color="text.primary" align="center">
              {name}
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 1,
            }}
          >
            <PokemonTypes name={name} />
          </Box>
        </Card>
      </Grid>
    );
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FilterBar />
      <Grid
        container
        spacing={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
        columns={{ xs: 2, sm: 8, md: 16, lg: 32, xl: 64 }}
      >
        {pokemonCard}
      </Grid>
    </Box>
  );
}
