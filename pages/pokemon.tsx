import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import FilterBar from "../components/FilterBar";
import PokemonTypes from "../components/PokemonTypes";
import useColorGradient from "../hooks/ColorGradient/useColorGradient";
import { usePokemonData } from "../hooks/FeedProvider/usePokemonData";
import useFormatString from "../hooks/FormatString/useFormatString";

export default function Pokemon() {
  const {
    pokemons,
    handleViewPokemon,
    filteredPokemons,
    setPokemons,
    AllPokemonLoading,
  } = usePokemonData();

  let typesArray: unknown[] = [];

  const pokemonCard = pokemons?.pokemonData?.map((pokemon) => {
    const id = pokemon.id;
    const name = pokemon.name;
    const image = pokemon.dreamworld || pokemon.artwork;

    return (
      <Grid item xs={1} sm={2.5} md={4} lg={6} xl={8} key={id}>
        <Card
          sx={{
            boxShadow: 20,
            borderRadius: 10,
            //   background: `linear-gradient(to bottom, ${useColorGradient(
            //     filteredPokemons?.pokemonData[id]?.type[0]?.type.name,
            //     filteredPokemons?.pokemonData[id]?.type[1]?.type.name
            //   )})`,
          }}
        >
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
            onError={(e) => {
              e.currentTarget.src = `${pokemon.artwork}`;
            }}
            alt={name}
            sx={{ objectFit: "contain" }}
          />
          <CardContent>
            <Typography variant="body2" color="text.primary" align="center">
              {useFormatString(name)}
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 1,
            }}
          >
            <PokemonTypes name={name} typesArray={typesArray} />
          </Box>
        </Card>
      </Grid>
    );
  });

  // if (AllPokemonLoading || !pokemons?.pokemonData) {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "100vh",
  //       }}
  //     >
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FilterBar />
      {AllPokemonLoading || !pokemons?.pokemonData ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress size={100} />
        </Box>
      ) : (
        <Grid
          container
          spacing={{ xs: 5, sm: 5, md: 5, lg: 5, xl: 5 }}
          columns={{ xs: 2, sm: 8, md: 16, lg: 32, xl: 52 }}
          sx={{ justifyContent: "center" }}
        >
          {pokemonCard}
        </Grid>
      )}
    </Box>
  );
}
