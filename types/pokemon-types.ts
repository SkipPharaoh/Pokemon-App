export interface GQLVariableType {
  limit: number;
  offset: number;
}

export interface PokemonNameVariable {
  name: string | HTMLElement;
}

export interface AllPokemonId {
  id: number[];
}
export interface AllPokemonName {
  name: string[];
}
export interface AllPokemonImage {
  image: string[];
}

export interface PokemonData {
  id: number;
  name: string;
  type?: string;
  dreamworld: string;
  artwork: string;
}
export interface AllPokemon {
  pokemonData: PokemonData[] | undefined;
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
  officialImage: string;
  homeImage: string;
  typeName: string[];
  abilities: string[];
  isAbilityHidden: boolean[];
  gameIndex: number[];
  gameAvailable: string[];
  stats: string[];
  moves: string[];
  levelForMoves: number[];
  methodForMoves: string[];
  versionMoveAvailable: string[];
}

export interface PokemonTypes {
  type: {
    name: string;
  };
}

export interface PokemonAbilities {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}

export interface PokemonGame {
  game_index: number;
  version: {
    name: string;
  };
}

export interface PokemonStats {
  stat: {
    name: string;
  };
  base_stat: number;
}

export interface PokemonMoves {
  move: PokemonMove;
  version_group_details: {
    level_learned_at: number;
    map: (move: PokemonMove) => void;
  };
}

export interface PokemonMove {
  name: string;
  move_learn_method?: {
    name: string;
  };
  version_group?: {
    name: string;
  };
}
