import type { NextPage } from "next";
import Head from "next/head";
import BarChart from "../components/BarChart";
import Nav from "../components/Nav";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>AlgoAnimation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col h-screen bg-gray-200">
        <Nav />
        <BarChart />
      </main>
    </div>
  );
};

export default Home;
