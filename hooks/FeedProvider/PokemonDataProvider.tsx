import { useMemo, useState, useEffect } from "react";
import NavigationBar from "../../components/NavigationBar";
import {
  AllPokemon,
  GQLVariableType,
  AllPokemonId,
  AllPokemonName,
  AllPokemonImage,
  PokemonDetail,
  PokemonTypes,
  PokemonAbilities,
  PokemonMoves,
  PokemonMove,
  PokemonGame,
  PokemonStats,
  PokemonNameVariable,
} from "../../types/pokemon-types";
import {
  PokemonContextProps,
  PokemonDataProviderProps,
} from "../../types/PokemonDataProviderProps ";
import { PokemonContext } from "./PokemonContext";
import { regions } from "../../pokemon-info/pokeInfo";
import { useQuery } from "@apollo/client";
import { GetAllPokemon, GetPokemonDetail } from "../../graphQL/pokemon-data";
import useFormatString from "../FormatString/useFormatString";

export const PokemonDataProvider = ({
  children,
}: PokemonDataProviderProps): JSX.Element => {
  const [pokemons, setPokemons] = useState<AllPokemon>();
  const [pokemon, setPokemon] = useState<PokemonDetail>();
  const [regionVariable, setRegionVariable] = useState<GQLVariableType>({
    limit: regions[0].limit,
    offset: regions[0].offset,
  });
  const [pokemonVariable, setPokemonVariable] = useState<PokemonNameVariable>({
    name: "pikachu",
  });

  const {
    loading: AllPokemonLoading,
    error: AllPokemonError,
    data: AllPokemon,
  } = useQuery(GetAllPokemon, {
    variables: regionVariable,
  });

  const {
    loading: PokemonDetailLoading,
    error: PokemonDetailError,
    data: PokemonDetail,
  } = useQuery(GetPokemonDetail, {
    variables: pokemonVariable,
  });

  const PokemonList: AllPokemon = {
    id: AllPokemon?.pokemons.results.map((pokemon: AllPokemonId) => pokemon.id),
    name: AllPokemon?.pokemons.results.map(
      (pokemon: AllPokemonName) => pokemon.name
    ),
    image: AllPokemon?.pokemons.results.map(
      (pokemon: AllPokemonImage) => pokemon.dreamworld
    ),
    previous: AllPokemon?.pokemons.previous,
    next: AllPokemon?.pokemons.next,
  };

  const PokemonInfo: PokemonDetail = {
    id: PokemonDetail?.pokemon.id,
    name: PokemonDetail?.pokemon.name,
    height: PokemonDetail?.pokemon.height,
    weight: PokemonDetail?.pokemon.weight,
    frontImage: PokemonDetail?.pokemon.sprites.front_default,
    backImage: PokemonDetail?.pokemon.sprites.back_default,
    typeName: PokemonDetail?.pokemon.types.map(
      (types: PokemonTypes) => types.type.name
    ),

    abilities: PokemonDetail?.pokemon.abilities.map(
      (abilities: PokemonAbilities) => abilities.ability.name
    ),
    isAbilityHidden: PokemonDetail?.pokemon.abilities.map(
      (hidden: PokemonAbilities) => hidden.is_hidden
    ),
    gameIndex: PokemonDetail?.pokemon.game_indices.map(
      (game: PokemonGame) => game.game_index
    ),
    gameAvailable: PokemonDetail?.pokemon.game_indices.map(
      (game: PokemonGame) => game.version.name
    ),
    statName: PokemonDetail?.pokemon.stats.map(
      (stats: PokemonStats) => stats.stat.name
    ),
    statNumber: PokemonDetail?.pokemon.stats.map(
      (stat: PokemonStats) => stat.base_stat
    ),
    moves: PokemonDetail?.pokemon.moves.map(
      (moves: PokemonMoves) => moves.move.name
    ),
    levelForMoves: PokemonDetail?.pokemon.moves.map(
      (moves: PokemonMoves) => moves.version_group_details.level_learned_at
    ),
    methodForMoves: PokemonDetail?.pokemon.moves.map((moves: PokemonMoves) =>
      moves.version_group_details.map(
        (move: PokemonMove) => move.move_learn_method?.name
      )
    ),
    versionMoveAvailable: PokemonDetail?.pokemon.moves.map(
      (moves: PokemonMoves) =>
        moves.version_group_details.map(
          (move: PokemonMove) => move.version_group?.name
        )
    ),
  };

  let regionName: string | HTMLElement;
  let pokemonName: string | HTMLElement;
  console.log(PokemonInfo);

  useEffect(() => {
    if (!PokemonDetailLoading) {
      setPokemon(PokemonInfo);
    }
  }, [PokemonDetail]);

  useEffect(() => {
    if (!AllPokemonLoading) {
      setPokemons(PokemonList);
    }
  }, [AllPokemon]);

  const handleOnClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    regionName = evt.target as HTMLElement;
    regionName = useFormatString(regionName.innerText);
    regions.map((region) => {
      if (region.name === regionName)
        setRegionVariable({ limit: region.limit, offset: region.offset });
    });
  };

  const handleViewPokemonDetail = (
    evt: React.MouseEvent<HTMLButtonElement>
  ) => {
    pokemonName = evt.target as HTMLElement;
    pokemonName = useFormatString(pokemonName.innerText).toLowerCase();
    setPokemonVariable({ name: pokemonName });
  };

  const value: PokemonContextProps = useMemo(
    () => ({
      handleOnClick: handleOnClick,
      pokemons,
      pokemon,
      handleViewPokemon: handleViewPokemonDetail,
    }),
    [handleOnClick, pokemons, pokemon, handleViewPokemonDetail]
  );

  return (
    <PokemonContext.Provider value={value}>
      <NavigationBar />
      {children}
    </PokemonContext.Provider>
  );
};
