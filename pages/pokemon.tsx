import React from "react";
import {
  Grid,
  Paper,
  Box,
  styled,
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Pokemon() {
  const { pokemons, handleViewPokemon } = usePokemonData();

  console.log(typeof pokemons?.pokemonData);

  const pokemonCard = pokemons?.pokemonData.map((pokemon) => {
    const id = pokemon.id;
    const name = pokemon.name;
    const image = pokemon.image;
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
                <Link href={`/pokemon/${name}`}>
                  <MoreVertIcon />
                </Link>
              </IconButton>
            }
            title={`#${id}`}
          />
          <CardMedia component="img" height="194" image={image} alt={name} />
          <CardContent>
            <Typography variant="body2" color="text.primary" align="center">
              {name}
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Tooltip title="Pokemon Type">
              <IconButton>
                <Avatar sx={{ bgcolor: red[500] }} aria-label="type">
                  R
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Card>
      </Grid>
    );
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
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
