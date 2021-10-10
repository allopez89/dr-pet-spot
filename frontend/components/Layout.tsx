import { FC } from "react";
import Head from "next/head";

const Layout: FC = ({ children }): JSX.Element => {
  return (
    <div>
      <Head>
        <title>Dr Pet Spot</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        <meta name="description" content="Report lost animals" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Layout</h1>
      {children}
    </div>
  );
};

export default Layout;
