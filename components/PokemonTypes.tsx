import { useQuery } from "@apollo/client";
import { Avatar, Box, Skeleton, Tooltip } from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";
import { GetPokemonType } from "../graphQL/pokemon-data";
import { usePokemonData } from "../hooks/FeedProvider/usePokemonData";
import useFormatString from "../hooks/FormatString/useFormatString";
import { theme } from "../pokemon-info/pokeInfo";
import { PokemonData, PokemonTypes } from "../types/pokemon-types";

interface Props {
  name: string;
  typesArray: unknown[];
}

export default function PokemonTypesInfo({ name, typesArray }: Props) {
  const { pokemons, setFilteredPokemons } = usePokemonData();
  const { data, loading } = useQuery(GetPokemonType, {
    variables: { name: name },
  });

  const pokeTypes = data?.pokemon.types;

  useEffect(() => {
    pokemons?.pokemonData?.map((pokemon, id: number) => {
      if (pokemon.name === name) {
        return (typesArray[id] = {
          ...pokemon,
          type: pokeTypes,
        });
      }
      return pokemon;
    });

    console.log(typesArray[0]);

    setFilteredPokemons({ pokemonData: typesArray as PokemonData[] });
  }, [pokeTypes, name]);

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
            style={{
              backgroundColor: `${theme[typeName]}`,
              border: "2px solid",
              borderColor: "white",
            }}
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

  return loading ? (
    <Skeleton
      animation="wave"
      variant="circular"
      width={40}
      height={40}
      sx={{ mx: 1 }}
    />
  ) : (
    type
  );
}
