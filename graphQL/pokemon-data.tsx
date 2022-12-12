import { gql } from "@apollo/client";

export const GetAllPokemon = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      next
      previous
      results {
        id
        name
        dreamworld
      }
    }
  }
`;

export const GetPokemonDetail = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      weight
      height
      sprites {
        front_default
        back_default
      }
      types {
        type {
          name
        }
        slot
      }
      abilities {
        ability {
          name
        }
        is_hidden
      }
      game_indices {
        version {
          name
        }
        game_index
      }
      stats {
        stat {
          name
        }
        base_stat
      }
      moves {
        move {
          name
        }
        version_group_details {
          version_group {
            name
          }
          level_learned_at
          move_learn_method {
            name
          }
        }
      }
    }
  }
`;

export const GetPokemonEvolution = gql`
  query evolutionChain($id: String!) {
    evolutionChain(id: $id) {
      response
    }
  }
`;

export const GetPokemonType = gql`
  query getType($name: String!) {
    pokemon(name: $name) {
      types {
        type {
          id
          name
        }
      }
    }
  }
`;
