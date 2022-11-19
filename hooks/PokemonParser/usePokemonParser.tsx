import {
  PokeEvoChainType,
  PokemonsType,
  PokemonType,
  usePokemonParserHookResults,
} from "../../types/pokemonParserTypes";
import {
  AllPokemon,
  PokemonEvolution,
  PokemonDetail,
} from "../../types/pokemon-types";
/*
We will create 3 hooks in one function, that we can use in other components to parse the pokemon data. In the appropriate component, we will call the desired hook to clean up the data
*/

export const usePokemonParser = (): usePokemonParserHookResults => {
  const usePokemons = (pokemons: PokemonsType): AllPokemon => {
    const id = pokemons.pokemons.id;
    const name = pokemons.pokemons.name;
    const image = pokemons.pokemons.dreamworld;
    const next = pokemons.pokemons.next;
    const previous = pokemons.pokemons.previous;
    return { id, name, image, next, previous };
  };

  const usePokemonDetail = (pokemon: PokemonType): PokemonDetail => {
    const id = pokemon.pokemon.id;
    const name = pokemon.pokemon.name;
    const weight = pokemon.pokemon.weight;
    const height = pokemon.pokemon.height;
    const frontImage = pokemon.pokemon.sprites.front_default;
    const backImage = pokemon.pokemon.sprites.back_default;
    const typeName = pokemon.pokemon.types.type.name;
    const abilities = pokemon.pokemon.abilities.ability.name;
    const isAbilityHidden = pokemon.pokemon.abilities.is_hidden;
    const gameIndex = pokemon.pokemon.game_indices.game_index;
    const gameAvailable = pokemon.pokemon.game_indices.version.name;
    const statName = pokemon.pokemon.stats.stat.name;
    const statNumber = pokemon.pokemon.stats.base_stat;
    const moves = pokemon.pokemon.moves.move.name;
    const levelForMoves =
      pokemon.pokemon.moves.version_group_details.level_learned_at;
    const methodForMoves =
      pokemon.pokemon.moves.version_group_details.move_learn_method.name;
    const versionMoveAvailable =
      pokemon.pokemon.moves.version_group_details.version_group.name;
    return {
      id,
      name,
      height,
      weight,
      frontImage,
      backImage,
      typeName,
      abilities,
      isAbilityHidden,
      gameIndex,
      gameAvailable,
      statName,
      statNumber,
      moves,
      levelForMoves,
      methodForMoves,
      versionMoveAvailable,
    };
  };

  const usePokemonEvolution = (
    pokeEvoChain: PokeEvoChainType
  ): PokemonEvolution => {
    const EvolutionTrigger =
      pokeEvoChain.evolutionChain.response.chain.evolves_to.evolution_details
        .trigger.name;
    const nextEvolution =
      pokeEvoChain.evolutionChain.response.chain.evolves_to.species.name;
    return { EvolutionTrigger, nextEvolution };
  };

  return { usePokemons, usePokemonDetail, usePokemonEvolution };
};
