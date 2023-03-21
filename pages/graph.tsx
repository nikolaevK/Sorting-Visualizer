import Head from "next/head";
import React from "react";
import GraphChart from "../components/GraphChart";
import GraphsNav from "../components/GraphsNav";

type Props = {};

const graph = (props: Props) => {
  return (
    <div>
      <Head>
        <title>AlgoAnimation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col h-screen bg-gray-200">
        <GraphsNav />
        <GraphChart />
      </main>
    </div>
  );
};

export default graph;
