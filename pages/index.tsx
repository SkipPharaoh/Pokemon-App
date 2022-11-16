import { regions } from "../pokemon-info/pokeInfo";
import React, { useState } from "react";
import { GQLVariableType } from "../types/pokemon-types";

const variableInfo: GQLVariableType = {
  limit: regions[0].limit,
  offset: regions[0].offset,
};

export default function Home() {
  const [region, setRegion] = useState<string>(regions[0].name);
  const [variable, setVariable] = useState<GQLVariableType>(variableInfo);

  const regionName = regions.map((region) => {
    return <div>{region.name}</div>;
  });

  console.log(region);
  console.log(variable);
  return (
    <div>
      <>{regionName}</>
    </div>
  );
}
