import React from "react";
import { Grid, Box } from "@mui/material";
import { usePokemonData } from "../hooks/FeedProvider/usePokemonData";

export default function Home() {
  const { region, handleOnClick, regionName } = usePokemonData();

  console.log(region);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3, lg: 4, xl: 5 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 16, xl: 20 }}
      >
        {regionName}
      </Grid>
    </Box>
  );
}
