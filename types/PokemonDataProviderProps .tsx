import { AllPokemon, PokemonDetail } from "./pokemon-types";

export interface PokemonContextProps {
  handleOnClick: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  handleViewPokemon: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  pokemons: AllPokemon | undefined;
  pokemon: PokemonDetail | undefined;
}

export interface PokemonDataProviderProps {
  children?: React.ReactNode;
}
