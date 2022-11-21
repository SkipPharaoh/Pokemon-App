import { regions } from "../pokemon-info/pokeInfo";
import React, { useEffect, useState } from "react";
import { GQLVariableType } from "../types/pokemon-types";
import { Grid, Paper, Box, styled, Button } from "@mui/material";
import { PokemonDataProvider } from "../hooks/FeedProvider/PokemonDataProvider";

const variableInfo: GQLVariableType = {
  limit: regions[0].limit,
  offset: regions[0].offset,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const [region, setRegion] = useState<string>(regions[0].name);
  const [variable, setVariable] = useState<GQLVariableType>(variableInfo);

  const handleOnClick = (evt: React.SyntheticEvent) => {
    useEffect(() => {
      // setRegion(region[EventTarget])
    }, [region]);
    evt.preventDefault();
  };

  const regionName = regions.map((region) => {
    return (
      <Grid
        item
        xs={2}
        sm={4}
        md={4}
        lg={5}
        xl={6}
        key={region.name.toString()}
      >
        <Item>
          <Button size="large" onClick={handleOnClick}>
            {region.name}
          </Button>
        </Item>
      </Grid>
    );
  });

  console.log(region);
  console.log(variable);
  return (
    <PokemonDataProvider>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3, lg: 4, xl: 5 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 16, xl: 20 }}
        >
          {regionName}
        </Grid>
      </Box>
    </PokemonDataProvider>
  );
}
