import { AllPokemon } from "./pokemon-types";

export interface PokemonContextProps {
  handleOnClick: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  pokemons: AllPokemon | undefined;
}

export interface PokemonDataProviderProps {
  children?: React.ReactNode;
}
