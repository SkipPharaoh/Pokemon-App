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
import Image from "next/image";
import Link from "next/link";
import FilterBar from "../components/FilterBar";
import { GetPokemonType } from "../graphQL/pokemon-data";
import { usePokemonData } from "../hooks/FeedProvider/usePokemonData";

type backgroundColor = Record<string, string>;
interface Props {
  name: string;
}

interface PokemonType {
  type: {
    name: string;
  };
}

const theme: backgroundColor = {
  grass: "#5FBD58",
  bug: "#92BC2C",
  dark: "#595761",
  dragon: "#0C69C8",
  electric: "#F2D94E",
  fairy: "#EE90E6",
  fighting: "#D3425F",
  fire: "#dc872f",
  flying: "#A1BBEC",
  ghost: "#5F6DBC",
  ground: "#DA7C4D",
  ice: "#75D0C1",
  normal: "#A0A29F",
  poison: "#B763CF",
  psychic: "#ff2ca8",
  rock: "#a38c21",
  steel: "#5695A3",
  water: "#539DDF",
} as const;

export default function Pokemon() {
  const { pokemons, handleViewPokemon } = usePokemonData();

  const PokemonTypes = ({ name }: Props) => {
    const { data } = useQuery(GetPokemonType, {
      variables: { name: name },
    });
    const pokeTypes = data?.pokemon.types;
    const type = pokeTypes?.map((type: PokemonType, id: number) => {
      const typeName = type.type.name as string;
      return (
        <Box sx={{ mx: 1 }} key={id}>
          <Tooltip title="Pokemon Type" sx={{ objectFit: "contain" }}>
            <Avatar
              aria-label="type"
              style={{ backgroundColor: `${theme[typeName]}` }}
            >
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
