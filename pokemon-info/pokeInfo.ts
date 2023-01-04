import { backgroundColor } from "../types/pokemon-types";

export const regions = [
  {
    name: "Kanto",
    image: [
      "/assets/starters/pokemon-gen-1-starters.png",
      "/assets/regions/Kanto.png",
    ],
    limit: 151,
    offset: 0,
  },
  {
    name: "Johto",
    image: [
      "/assets/starters/pokemon-gen-2-starters.png",
      "/assets/regions/Johto.png",
    ],
    limit: 100,
    offset: 151,
  },
  {
    name: "Hoenn",
    image: [
      "/assets/starters/pokemon-gen-3-starters.png",
      "/assets/regions/Hoenn.png",
    ],
    limit: 135,
    offset: 251,
  },
  {
    name: "Sinnoh",
    image: [
      "/assets/starters/pokemon-gen-4-starters.png",
      "/assets/regions/Sinnoh.png",
    ],
    limit: 107,
    offset: 386,
  },
  {
    name: "Unova",
    image: [
      "/assets/starters/pokemon-gen-5-starters.png",
      "/assets/regions/Unova.png",
    ],
    limit: 156,
    offset: 493,
  },
  {
    name: "Kalos",
    image: [
      "/assets/starters/pokemon-gen-6-starters.png",
      "/assets/regions/Kalos.png",
    ],
    limit: 72,
    offset: 649,
  },
  {
    name: "Alola",
    image: [
      "/assets/starters/pokemon-gen-7-starters.png",
      "/assets/regions/Alola.png",
    ],
    limit: 88,
    offset: 721,
  },
  {
    name: "Galar",
    image: [
      "/assets/starters/pokemon-gen-8-starters.png",
      "/assets/regions/Galar.png",
    ],
    limit: 96,
    offset: 809,
  },
  {
    name: "Variants",
    image: ["/assets/starters/variants.png", ""],
    limit: 249,
    offset: 905,
  },
];

export const types = [
  "grass",
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water",
];

export const theme: backgroundColor = {
  grass: "#5FBD58",
  bug: "#92BC2C",
  dark: "#595761",
  dragon: "#0C69C8",
  electric: "#F2D94E",
  fairy: "#EE90E6",
  fighting: "#D3425F",
  fire: "#dc872f",
  flying: "#A1BBEC",
  ghost: "#5F6DBC",
  ground: "#DA7C4D",
  ice: "#75D0C1",
  normal: "#A0A29F",
  poison: "#B763CF",
  psychic: "#ff2ca8",
  rock: "#a38c21",
  steel: "#5695A3",
  water: "#539DDF",
} as const;
