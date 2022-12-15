import React, { useEffect, useRef, useState } from "react";
import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material";
import { usePokemonData } from "../hooks/FeedProvider/usePokemonData";
import { PokemonData } from "../types/pokemon-types";
import useFormatString from "../hooks/FormatString/useFormatString";
import { useRouter } from "next/router";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function SearchBar() {
  const { pokemons, setPokemonVariable } = usePokemonData();
  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<readonly PokemonData[]>([]);
  const inputRef = useRef<HTMLInputElement | null>();
  const router = useRouter();
  const loading = open && options.length === 0;
  const pokemonData = pokemons?.pokemonData;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...(pokemonData !== undefined ? pokemonData : [])]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleOnChange = () => {
    const searchInput = inputRef.current?.value.toLowerCase();
    if (open) {
      return;
    }
    const isFound = pokemonData?.some((data) => {
      return data.name === searchInput;
    });

    if (isFound) {
      setPokemonVariable({ name: searchInput as string });
      router.push(`/pokemon/${searchInput}`);
    }
  };

  return (
    <Box sx={{ m: 1 }}>
      <Autocomplete
        id="SearchBar"
        sx={{ width: 160 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        getOptionLabel={(option) => useFormatString(option.name)}
        options={options}
        loading={loading}
        onSelect={handleOnChange}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              loading="lazy"
              width="20"
              src={`${option.artwork}`}
              srcSet={`${option.artwork}`}
              alt=""
            />
            {useFormatString(option.name)}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            inputRef={inputRef}
            label="Search"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </Box>
  );
}
