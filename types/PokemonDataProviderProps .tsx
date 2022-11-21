import { AllPokemon } from "./pokemon-types";

export interface PokemonContextProps {
  region: string;
  handleOnClick: (evt: React.SyntheticEvent) => void;
  pokemon: AllPokemon | undefined;
}

export interface PokemonDataProviderProps {
  children?: React.ReactNode;
}
