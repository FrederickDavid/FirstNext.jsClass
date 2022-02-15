import Head from "next/head";
import react from "react";
import HeaderComponent from "./HeaderComponent";

const Main = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Learning Dynamic Routing</title>
        <meta name="description" content="This is the best way to go" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderComponent />
      <div>{children}</div>
    </div>
  );
};

export default Main;
