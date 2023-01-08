import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { client } from "../apollo-client";
import { PokemonDataProvider } from "../hooks/FeedProvider/PokemonDataProvider";
import ScrollToTop from "../components/ScrollToTop";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <PokemonDataProvider>
        <Component {...pageProps} />
        <ScrollToTop />
      </PokemonDataProvider>
    </ApolloProvider>
  );
}
