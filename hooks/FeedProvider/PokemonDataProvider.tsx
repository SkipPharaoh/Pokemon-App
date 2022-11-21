import { useMemo, useState, useEffect } from "react";
import NavigationBar from "../../components/NavigationBar";
import { GQLVariableType } from "../../types/pokemon-types";
import {
  PokemonContextProps,
  PokemonDataProviderProps,
} from "../../types/PokemonDataProviderProps ";
import { PokemonContext } from "./PokemonContext";
import { regions } from "../../pokemon-info/pokeInfo";
import { Grid, Paper, styled, Button } from "@mui/material";

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

export const PokemonDataProvider = ({
  children,
}: PokemonDataProviderProps): JSX.Element => {
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

  const value: PokemonContextProps = useMemo(
    () => ({ region, handleOnClick: handleOnClick, regionName: regionName }),
    [region, handleOnClick, regionName]
  );

  return (
    <PokemonContext.Provider value={value}>
      <NavigationBar />
      {children}
    </PokemonContext.Provider>
  );
};
