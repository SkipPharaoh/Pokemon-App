import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "../graphQL/get-pokemon";

interface GQLVariableType {
  limit: number;
  offset: number;
}

const gqlVariables: GQLVariableType = {
  limit: 150,
  offset: 1,
};

export default function Home() {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
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
