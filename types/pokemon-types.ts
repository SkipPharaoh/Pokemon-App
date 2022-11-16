export interface GQLVariableType {
  limit: number;
  offset: number;
}

export interface AllPokemon {
  id: AllPokemonId;
  name: AllPokemonName;
  image: AllPokemonImage;
  next: string;
  previous: string;
}

export interface AllPokemonId {
  id: number[];
}
export interface AllPokemonName {
  name: string[];
}
export interface AllPokemonImage {
  dreamworld: string[];
}
