import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import useFormatString from "../hooks/FormatString/useFormatString";
import { regions, types } from "../pokemon-info/pokeInfo";

export default function FilterBar() {
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
            <TextField
              {...params}
              label="Choose A Type"
              //   inputProps={{
              //     ...params.inputProps,
              //     autoComplete: "new-password", // disable autocomplete and autofill
              //   }}
            />
          )}
        />
      </Box>

      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="Sort-By-label">Sort By</InputLabel>
        <Select
          labelId="Sort-By-label"
          id="Sort-By"
          //   value={age}
          //   onChange={handleChange}
          autoWidth
          label="Sort-By-label"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>ID</MenuItem>
          <MenuItem value={21}>Name</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ m: 1 }}>
        <TextField id="search" label="Search" variant="outlined" />
      </Box>
    </Box>
  );
}
