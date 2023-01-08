import { SetStateAction } from "react";
import {
  AllPokemon,
  GQLVariableType,
  PokemonDetail,
  PokemonNameVariable,
} from "./pokemon-types";

export interface PokemonContextProps {
  handleOnClick: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  handleViewPokemon: (name: string) => void;
  pokemons: AllPokemon | undefined;
  pokemon: PokemonDetail | undefined;
  setRegionVariable: (value: SetStateAction<GQLVariableType>) => void;
  setPokemons: (value: SetStateAction<AllPokemon | undefined>) => void;
  setPokemonVariable: (value: SetStateAction<PokemonNameVariable>) => void;
  filteredPokemons: AllPokemon | undefined;
  setFilteredPokemons: (value: SetStateAction<AllPokemon | undefined>) => void;
  isPokemonTypeFilter: boolean;
  setIsPokemonTypeFilter: (value: SetStateAction<boolean>) => void;
  PokemonDetailLoading: boolean;
  AllPokemonLoading: boolean;
  topButton: boolean;
  scrollToTop: () => void;
}

export interface PokemonDataProviderProps {
  children?: React.ReactNode;
}
