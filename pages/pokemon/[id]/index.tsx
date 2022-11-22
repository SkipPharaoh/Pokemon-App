import { Box, Grid, Paper, styled } from "@mui/material";
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
    <Grid item xs={2} sm={4} md={4} lg={5} xl={6} key={pokemon?.name}>
      <Item>
        <Image
          src={pokemon?.frontImage}
          alt={pokemon?.name}
          width={500}
          height={500}
        />
        {pokemon?.name}
      </Item>
    </Grid>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3, lg: 4, xl: 5 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 16, xl: 20 }}
      >
        {pokemonCard}
      </Grid>
    </Box>
  );
}
