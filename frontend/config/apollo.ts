import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  // @ts-ignore
  link: authLink.concat(httpLink),
});

export default client;
