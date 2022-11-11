import { useQuery } from "@apollo/client";
import { GetAllPokemon } from "../graphQL/pokemon-data";

interface GQLVariableType {
  limit: number;
  offset: number;
}

const gqlVariables: GQLVariableType = {
  limit: 150,
  offset: 150,
};

export default function Home() {
  const { loading, error, data } = useQuery(GetAllPokemon, {
    variables: gqlVariables,
  });

  console.log(loading);
  console.log(error);
  console.log(data);
  return (
    <div>
      <>hi!</>
    </div>
  );
}
