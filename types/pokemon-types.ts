export interface GQLVariableType {
  limit: number;
  offset: number;
}

export interface AllPokemon {
  id: number[];
  name: string[];
  image: string[];
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

export interface PokemonEvolution {
  EvolutionTrigger: string;
  nextEvolution: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  frontImage: string;
  backImage: string;
  typeName: string[];
  abilities: string[];
  isAbilityHidden: boolean[];
  gameIndex: number[];
  gameAvailable: string[];
  statName: string[];
  statNumber: number[];
  moves: string[];
  levelForMoves: number[];
  methodForMoves: string[];
  versionMoveAvailable: string[];
}
