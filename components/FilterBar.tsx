import { Autocomplete, Box, TextField } from "@mui/material";
import React, { useRef } from "react";
import { usePokemonData } from "../hooks/FeedProvider/usePokemonData";
import useFormatString from "../hooks/FormatString/useFormatString";
import { regions, types } from "../pokemon-info/pokeInfo";
import { useRouter } from "next/router";

export default function FilterBar() {
  const { setRegionVariable, pokemons, setPokemons, setPokemonVariable } =
    usePokemonData();
  const inputRef = useRef<HTMLInputElement | null>();
  const router = useRouter();

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

  const handleOnSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    const searchInput = inputRef.current?.value;

    const isFound = pokemonData?.some((data) => {
      return data.name === searchInput;
    });

    if (isFound) {
      setPokemonVariable({ name: searchInput as string });
      router.push(`/pokemon/${searchInput}`);
    }
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

      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ m: 1 }}
        onSubmit={handleOnSubmit}
      >
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          inputRef={inputRef}
        />
      </Box>
    </Box>
  );
}
