import type { NextPage } from "next";
import Head from "next/head";
import Nav from "../components/Nav";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen f">
        <Nav />
      </main>
    </div>
  );
};

export default Home;
