import { Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  PlayIcon,
  XMarkIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Graph } from "./graphs/graph";
import { WeightedGraph } from "./graphs/weightedGraph";
import { settingContext } from "./utils/AlgoContext";

interface Navigation {
  name: string;
  current: boolean;
}

interface NavigationList extends Array<Navigation> {}

// used to render buttons
const navigation: NavigationList = [
  { name: "BFS", current: false },
  { name: "DFS", current: false },
  { name: "Dijkstra", current: false },
];

const GraphsNav = () => {
  const { traverse, settings, setSettings } = useContext(settingContext);
  const [navState, setNavState] = useState(navigation); // mutates state to show active buttons

  // Adding Vertexes, used as id for divs and animation
  const list = new Graph();
  const weightedGraph = new WeightedGraph();

  for (let i = 0; i < 16; i++) {
    list.addVertex(i);
    weightedGraph.addVertex(i);
  }

  // Adding Edges to the graph
  list.addEdge(0, 1);
  list.addEdge(0, 4);
  list.addEdge(1, 2);
  list.addEdge(2, 3);
  list.addEdge(3, 7);
  list.addEdge(4, 5);
  list.addEdge(4, 8);
  list.addEdge(8, 12);
  list.addEdge(12, 13);
  list.addEdge(13, 14);
  list.addEdge(14, 10);
  list.addEdge(14, 11);
  list.addEdge(14, 15);
  list.addEdge(5, 6);
  list.addEdge(5, 9);
  list.addEdge(6, 7);
  list.addEdge(7, 11);
  list.addEdge(9, 10);
  list.addEdge(10, 11);

  // Adding Edges and weights to the weightedGraph
  weightedGraph.addEdge(0, 1, 2);
  weightedGraph.addEdge(0, 4, 1);
  weightedGraph.addEdge(1, 2, 2);
  weightedGraph.addEdge(2, 3, 2);
  weightedGraph.addEdge(3, 7, 1);
  weightedGraph.addEdge(4, 5, 1);
  weightedGraph.addEdge(4, 8, 3);
  weightedGraph.addEdge(8, 12, 5);
  weightedGraph.addEdge(12, 13, 1);
  weightedGraph.addEdge(13, 14, 1);
  weightedGraph.addEdge(14, 10, 2);
  weightedGraph.addEdge(14, 11, 2);
  weightedGraph.addEdge(14, 15, 5);
  weightedGraph.addEdge(5, 6, 4);
  weightedGraph.addEdge(5, 9, 1);
  weightedGraph.addEdge(6, 7, 7);
  weightedGraph.addEdge(7, 11, 3);
  weightedGraph.addEdge(9, 10, 1);
  weightedGraph.addEdge(10, 11, 5);

  function onDelayChange(e: { target: HTMLInputElement }) {
    if (!setSettings) return;
    setSettings((prev) => ({ ...prev, delay: +e.target.value }));
  }

  // changes the algorithm which needs to be ran
  function onAlgorithmChange(name: string) {
    if (!setSettings) return;
    setSettings((prev) => ({ ...prev, algoName: name }));

    // Mutates navState, assigns true to current button
    const newArray = navState.map((algorithm) => {
      if (algorithm.name === name) {
        return { ...algorithm, current: true };
      } else {
        return { ...algorithm, current: false };
      }
    });
    setNavState(newArray);
  }

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-[5rem] items-center justify-between mx-3">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex items-center text-purple-500">
                  <ChartBarIcon className="h-8 w-8" />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 ">
                    {navState.map((item) => (
                      <button
                        onClick={() => onAlgorithmChange(item.name)}
                        key={item.name}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </button>
                    ))}
                    <Link href={"/"}>
                      <button className="rounded-md px-3 py-2 text-sm font-medium text-purple-500 hover:bg-gray-700">
                        Sorts
                      </button>
                    </Link>

                    <div className="flex flex-col justify-center items-center text-gray-300">
                      <label htmlFor="delay">Delay: {settings.delay}</label>
                      <input
                        type="range"
                        name="delay"
                        id="delay"
                        className=" accent-purple-500"
                        min={1}
                        defaultValue={15}
                        onChange={onDelayChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={() => {
                    if (settings.algoName === "BFS")
                      traverse(list.BFS(0), settings.algoName);
                    if (settings.algoName === "DFS")
                      traverse(list.DFSiterative(0), settings.algoName);
                    if (settings.algoName === "Dijkstra") {
                      const { finalPath, animationGraphArray } =
                        weightedGraph.dijkstra(0, 15)!;

                      traverse(
                        finalPath,
                        settings.algoName,
                        animationGraphArray
                      );
                    }
                  }}
                  className="rounded-full bg-gray-800 p-1 text-purple-500 hover:text-purple-500 focus:outline-none  hover:ring-2 hover:ring-purple-500 "
                >
                  <PlayIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile */}
          <Disclosure.Panel className="sm:hidden">
            <div className="absolute z-10 bg-gray-800 space-y-1 px-2 pt-2 pb-3">
              {navState?.map((item) => (
                <Disclosure.Button
                  onClick={() => onAlgorithmChange(item.name)}
                  key={item.name}
                  as="button"
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <Link href={"/"}>
                <button className="rounded-md px-3 py-2 text-sm font-medium text-purple-500 hover:bg-gray-700">
                  Sorts
                </button>
              </Link>

              <div className="flex flex-col justify-center items-center text-gray-300">
                <label htmlFor="delay">Delay: {settings.delay}</label>
                <input
                  type="range"
                  name="delay"
                  id="delay"
                  className=" accent-purple-500"
                  min={3}
                  defaultValue={15}
                  onChange={onDelayChange}
                />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default GraphsNav;
