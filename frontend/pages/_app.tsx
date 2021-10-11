import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../config/apollo";
import "tailwindcss/tailwind.css";
import React from "react";
import Navbar from "../components/common/Navbar";
import "alertifyjs/build/css/alertify.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <div>
        <Navbar />
        <div className="container-fluid">
          <Component {...pageProps} />
        </div>
      </div>
    </ApolloProvider>
  );
};

export default MyApp;
