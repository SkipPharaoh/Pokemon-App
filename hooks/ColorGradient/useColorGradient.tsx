import React from "react";
import { theme } from "../../pokemon-info/pokeInfo";
// import {} from '../../pokemon-info/pokeInfo';

export default function useColorGradient(type1: string, type2: string) {
  if (type2 === undefined) {
    type2 === type1;
    // console.log(`${theme[type1]}, ${theme[type1]}`);
    return `${theme[type1]}, ${theme[type1]}`;
  }
  //   console.log(`${theme[type1]}, ${theme[type2]}`);
  return `${theme[type1]}, ${theme[type2]}`;
  //   console.log(theme);
}
