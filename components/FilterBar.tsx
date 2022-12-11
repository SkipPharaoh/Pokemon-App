import { Autocomplete, Box, TextField } from "@mui/material";
import React from "react";
import { usePokemonData } from "../hooks/FeedProvider/usePokemonData";
import useFormatString from "../hooks/FormatString/useFormatString";
import { regions, types } from "../pokemon-info/pokeInfo";
import SearchBar from "./SearchBar";

export default function FilterBar() {
  const { setRegionVariable, pokemons, setPokemons } = usePokemonData();

  const sortInfo = ["ID", "Name"];
  const pokemonData = pokemons?.pokemonData;
  let sortedArr = pokemonData?.map((data) => data);

  const handleRegionClick = (regionName: string) => {
    regions.map((region) => {
      if (region.name === regionName)
        setRegionVariable({ limit: region.limit, offset: region.offset });
    });
  };

  const handleSortByClick = (sortSelection: string) => {
    const sortedData =
      sortSelection === "Name"
        ? sortedArr?.sort((a, b) =>
            a.name > b.name ? 1 : a.name < b.name ? -1 : 0
          )
        : sortedArr?.sort((a, b) => a.id - b.id);
    setPokemons({ ...pokemons, pokemonData: sortedData });
  };

  return (
    <Box
      sx={{
        display: { xs: "table", sm: "flex" },
        justifyContent: ["center", "space-evenly"],
        margin: { xs: "auto" },
        paddingTop: 8,
        paddingBottom: 2,
      }}
    >
      <Box sx={{ m: 1 }}>
        <Autocomplete
          id="country-select-demo"
          sx={{ width: 175 }}
          options={regions}
          autoHighlight
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
              onClick={() => handleRegionClick(option.name)}
            >
              {option.name} ({option.offset + 1}-{option.limit + option.offset})
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose A Region"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
      </Box>

      <Box sx={{ m: 1 }}>
        <Autocomplete
          id="country-select-demo"
          sx={{ width: 160 }}
          options={types}
          autoHighlight
          getOptionLabel={(option) => useFormatString(option)}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {useFormatString(option)}
            </Box>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Choose A Type" />
          )}
        />
      </Box>

      <Box sx={{ m: 1, minWidth: 100 }}>
        <Autocomplete
          id="country-select-demo"
          options={sortInfo}
          autoHighlight
          getOptionLabel={(option) => option}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
              onClick={() => handleSortByClick(option)}
            >
              {option}
            </Box>
          )}
          renderInput={(params) => <TextField {...params} label="Sort By" />}
        />
      </Box>

      <SearchBar />
    </Box>
  );
}
