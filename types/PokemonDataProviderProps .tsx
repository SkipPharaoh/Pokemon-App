export interface PokemonContextProps {
  region: string;
  handleOnClick: (evt: React.SyntheticEvent) => void;
  regionName: JSX.Element[];
}

export interface PokemonDataProviderProps {
  children?: React.ReactNode;
}
