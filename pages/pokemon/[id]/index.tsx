import { Box, Paper, styled } from "@mui/material";
import Image from "next/image";
import { usePokemonData } from "../../../hooks/FeedProvider/usePokemonData";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function PokemonPage() {
  const { pokemon } = usePokemonData();

  const pokemonCard = (
    <Item>
      <Image
        src={pokemon?.officialImage}
        alt={pokemon?.name}
        width={350}
        height={350}
        // loading="lazy"
        priority
      />
      {pokemon?.name}
    </Item>
  );
  return <Box sx={{ flexGrow: 1, marginTop: 10 }}>{pokemonCard}</Box>;
}
