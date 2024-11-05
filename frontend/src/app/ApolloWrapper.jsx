"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

function makeClient() {
  const httpLink = new HttpLink({
      uri: "http://127.0.0.1:4000/query",
      headers: {
          'Content-Type': 'application/json',
      }
  });

  return new NextSSRApolloClient({
      cache: new NextSSRInMemoryCache(),
      link: typeof window === "undefined"
          ? ApolloLink.from([
              new SSRMultipartLink({
                  stripDefer: true,
              }),
              httpLink,
          ])
          : httpLink,
      defaultOptions: {
          watchQuery: {
              fetchPolicy: 'network-only',
              errorPolicy: 'all',
          },
          query: {
              fetchPolicy: 'network-only',
              errorPolicy: 'all',
          },
          mutate: {
              errorPolicy: 'all',
          },
      },
  });
}
export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}