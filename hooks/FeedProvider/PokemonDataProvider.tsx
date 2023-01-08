import { useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import { GetAllPokemon, GetPokemonDetail } from "../../graphQL/pokemon-data";
import { regions } from "../../pokemon-info/pokeInfo";
import {
  PokemonContextProps,
  PokemonDataProviderProps,
} from "../../types/PokemonDataProviderProps ";
import {
  AllPokemon,
  GQLVariableType,
  PokemonAbilities,
  PokemonDetail,
  PokemonGame,
  PokemonMove,
  PokemonMoves,
  PokemonNameVariable,
  PokemonStats,
  PokemonTypes,
} from "../../types/pokemon-types";
import useFormatString from "../FormatString/useFormatString";
import { PokemonContext } from "./PokemonContext";

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
  const [topButton, setTopButton] = useState<boolean>(false);
  const [filteredPokemons, setFilteredPokemons] = useState<AllPokemon>();
  const [isPokemonTypeFilter, setIsPokemonTypeFilter] =
    useState<boolean>(false);

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
    pokemonData: AllPokemon?.pokemons.results,
  };

  const PokemonInfo: PokemonDetail = {
    id: PokemonDetail?.pokemon.id,
    name: PokemonDetail?.pokemon.name,
    height: PokemonDetail?.pokemon.height,
    weight: PokemonDetail?.pokemon.weight,
    officialImage: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${PokemonDetail?.pokemon.id}.png`,
    homeImage: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${PokemonDetail?.pokemon.id}.png`,
    typeName: PokemonDetail?.pokemon.types?.map(
      (types: PokemonTypes) => types.type.name
    ),

    abilities: PokemonDetail?.pokemon.abilities.map(
      (abilities: PokemonAbilities) => [
        abilities.ability.name,
        abilities.is_hidden,
      ]
    ),
    gameIndex: PokemonDetail?.pokemon.game_indices.map(
      (game: PokemonGame) => game.game_index
    ),
    gameAvailable: PokemonDetail?.pokemon.game_indices.map(
      (game: PokemonGame) => game.version.name
    ),
    stats: PokemonDetail?.pokemon.stats.map((stats: PokemonStats) => [
      stats.stat.name,
      stats.base_stat,
    ]),
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
  let pokemonName: string;

  useEffect(() => {
    if (!PokemonDetailLoading) {
      setPokemon(PokemonInfo);
    }
  }, [PokemonDetail]);

  useEffect(() => {
    if (!AllPokemonLoading) {
      setPokemons({ ...PokemonList });
      console.log(pokemons);
    }
  }, [AllPokemon, isPokemonTypeFilter]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setTopButton(true);
      } else {
        setTopButton(false);
      }
    });
  }, []);

  const handleOnClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    regionName = evt.target as HTMLElement;
    regionName = useFormatString(regionName.innerText);
    regions.map((region) => {
      if (region.name === regionName)
        setRegionVariable({ limit: region.limit, offset: region.offset });
    });
  };

  const handleViewPokemonDetail = (name: string) => {
    pokemonName = useFormatString(name).toLowerCase();
    setPokemonVariable({ name: pokemonName });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const value: PokemonContextProps = useMemo(
    () => ({
      handleOnClick: handleOnClick,
      pokemons,
      pokemon,
      handleViewPokemon: handleViewPokemonDetail,
      setRegionVariable,
      setPokemons,
      setPokemonVariable,
      filteredPokemons,
      setFilteredPokemons,
      isPokemonTypeFilter,
      setIsPokemonTypeFilter,
      PokemonDetailLoading,
      AllPokemonLoading,
      topButton,
      scrollToTop,
    }),
    [
      handleOnClick,
      pokemons,
      pokemon,
      handleViewPokemonDetail,
      setRegionVariable,
      setPokemons,
      setPokemonVariable,
      filteredPokemons,
      setFilteredPokemons,
      isPokemonTypeFilter,
      setIsPokemonTypeFilter,
      PokemonDetailLoading,
      AllPokemonLoading,
      topButton,
      scrollToTop,
    ]
  );

  return (
    <PokemonContext.Provider value={value}>
      <NavigationBar />
      {children}
    </PokemonContext.Provider>
  );
};
