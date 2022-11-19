export interface PokemonsType {
  pokemons: {
    id: {
      id: number[];
    };
    name: {
      name: string[];
    };
    dreamworld: {
      dreamworld: string[];
    };
    next: string;
    previous: string;
  };
}
export interface PokemonType {
  pokemon: {
    id: number;
    name: string;
    weight: number;
    height: number;
    sprites: {
      front_default: string;
      back_default: string;
    };
    types: {
      type: {
        name: string[];
      };
    };
    abilities: {
      is_hidden: boolean[];
      ability: {
        name: string[];
      };
    };
    game_indices: {
      game_index: number[];
      version: {
        name: string[];
      };
    };
    stats: {
      base_stat: number[];
      stat: {
        name: string[];
      };
    };
    moves: {
      move: {
        name: string[];
      };
      version_group_details: {
        level_learned_at: number[];
        move_learn_method: {
          name: string[];
        };
        version_group: {
          name: string[];
        };
      };
    };
  };
}
export interface PokeEvoChainType {
  evolutionChain: {
    response: {
      chain: {
        evolves_to: {
          species: {
            name: string;
          };
          evolution_details: {
            trigger: {
              name: string;
            };
          };
        };
      };
    };
  };
}

export interface usePokemonParserHookResults {
  usePokemons: (pokemons: PokemonsType) => void;
  usePokemonDetail: (pokemon: PokemonType) => void;
  usePokemonEvolution: (pokeEvoChain: PokeEvoChainType) => void;
}
