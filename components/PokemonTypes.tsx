import { useQuery } from "@apollo/client";
import { Avatar, Box, Tooltip } from "@mui/material";
import Image from "next/image";
import { GetPokemonType } from "../graphQL/pokemon-data";
import { usePokemonData } from "../hooks/FeedProvider/usePokemonData";
import useFormatString from "../hooks/FormatString/useFormatString";
import { PokemonData, PokemonTypes } from "../types/pokemon-types";
import { useEffect } from "react";

type backgroundColor = Record<string, string>;
interface Props {
  name: string;
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

export default function PokemonTypesInfo({ name }: Props) {
  const { pokemons, setPokemons } = usePokemonData();
  const { data } = useQuery(GetPokemonType, {
    variables: { name: name },
  });

  const pokeTypes = data?.pokemon.types;

  useEffect(() => {
    setPokemons({
      pokemonData: pokemons?.pokemonData?.map((pokemon) => {
        if (pokemon.name === name) {
          return {
            ...pokemon,
            types: pokeTypes,
          };
        }
        return pokemon;
      }),
    });
  }, [pokeTypes]);

  const type = pokeTypes?.map((type: PokemonTypes, id: number) => {
    const typeName = type.type.name;

    return (
      <Box sx={{ mx: 1 }} key={id}>
        <Tooltip
          title={useFormatString(typeName)}
          sx={{ objectFit: "contain" }}
        >
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
}
