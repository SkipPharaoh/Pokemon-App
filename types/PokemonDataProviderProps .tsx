export interface PokemonContextProps {
  region: string;
  handleOnClick: (evt: React.SyntheticEvent) => void;
}

export interface PokemonDataProviderProps {
  children?: React.ReactNode;
}
