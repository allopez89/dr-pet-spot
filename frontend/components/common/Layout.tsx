import { FC } from "react";
import Head from "next/head";
// import Navbar from "./Navbar";

const Layout: FC = ({ children }): JSX.Element => {
  return (
    <>
      <Head>
        <title>Dr Pet Spot</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>

        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css"
        />
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css"
        />
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/semantic.min.css"
        />
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/bootstrap.min.css"
        />

        <meta name="description" content="Report lost animals" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">{children}</div>
    </>
  );
};

export default Layout;
