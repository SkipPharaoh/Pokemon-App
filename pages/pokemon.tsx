import { useQuery } from "@apollo/client";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import Image from "next/image";
import Link from "next/link";
import FilterBar from "../components/FilterBar";
import { GetPokemonType } from "../graphQL/pokemon-data";
import { usePokemonData } from "../hooks/FeedProvider/usePokemonData";

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
            <Avatar sx={{ bgcolor: red[900] }} aria-label="type">
              <Image
                src={`/assets/pokeTypes/${typeName}.png`}
                alt={`${typeName} image`}
                width="30"
                height="30"
              />
            </Avatar>
          </Tooltip>
        </Box>
      );
    });
    return type;
  };

  const pokemonCard = pokemons?.pokemonData?.map((pokemon) => {
    const id = pokemon.id;
    const name = pokemon.name;
    const image = pokemon.dreamworld || pokemon.artwork;
    console.log(image);
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
            onError={(e) => {
              e.currentTarget.src = `${pokemon.artwork}`;
            }}
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
