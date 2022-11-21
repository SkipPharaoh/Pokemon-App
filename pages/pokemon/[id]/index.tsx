import { PokemonDataProvider } from "../../../hooks/FeedProvider/PokemonDataProvider";

export default function PokemonPage() {
  return (
    <PokemonDataProvider>
      <div>"pokemon"</div>
    </PokemonDataProvider>
  );
}
