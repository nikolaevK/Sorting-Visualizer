import { useContext } from "react";
import { start } from "repl";
import { itemsContext, settingContext } from "./utils/AlgoContext";

const GraphChart = () => {
  const { settings, setSettings } = useContext(settingContext);
  const { nodes } = useContext(itemsContext);

  function changeStartNode(e: { target: HTMLInputElement }) {
    if (!setSettings) return;
    setSettings((prev) => ({
      ...prev,
      nodeStart: parseInt(e.target.value) || 0,
    }));
  }

  function changeEndNode(e: { target: HTMLInputElement }) {
    if (!setSettings) return;
    setSettings((prev) => ({
      ...prev,
      nodeEnd: parseInt(e.target.value) || 0,
    }));
  }

  return (
    <section className="h-full mt-20 m-auto text-center">
      <label className="text-purple-500 text-4xl font-semibold pb-6">
        {settings.algoName}
      </label>
      {settings.algoName === "Dijkstra" && (
        <div className="pt-4 flex justify-center items-center gap-2 text-gray-200">
          <label className="text-black">Start:</label>
          <input
            className="rounded-lg p-1 w-12 text-center bg-purple-400"
            type="text"
            value={settings.nodeStart}
            onChange={changeStartNode}
          />
          <label className="text-black">End:</label>
          <input
            className="rounded-lg p-1 w-12 text-center bg-purple-400"
            type="text"
            value={settings.nodeEnd}
            onChange={changeEndNode}
          />
        </div>
      )}
      <div className="relative grid grid-cols-4 gap-9 mt-8 group">
        {nodes.map((div, idx) => {
          return (
            <div
              key={idx}
              id={`${idx}`}
              className="h-12 w-12 text-center pt-2 rounded-full border-4 border-purple-500"
            >
              {div}
            </div>
          );
        })}
        {/* Absolutely positioned Edges between Nodes */}
        <div className="absolute border-b-4 border-black w-9 top-[24px] left-[48px]" />
        <div className="absolute border-b-4 border-black w-9 top-[108px] left-[48px]" />
        <div className="absolute border-b-4 border-black w-9 top-[276px] left-[48px]" />
        <div className="absolute border-b-4 border-black w-9 top-[276px] left-[132px]" />
        <div className="absolute border-b-4 border-black w-9 top-[276px] left-[216px]" />
        <div className="absolute border-r-4 border-black h-9 top-[48px] left-[22px]" />
        <div className="absolute border-r-4 border-black h-9 top-[48px] left-[274px]" />
        <div className="absolute border-r-4 border-black h-9 top-[132px] left-[22px]" />
        <div className="absolute border-r-4 border-black h-9 top-[216px] left-[190px]" />
        <div className="absolute border-r-4 border-black h-[73px] top-[202px] left-[236px] transform rotate-45" />
        <div className="absolute border-r-4 border-black h-9 top-[132px] left-[106px]" />
        <div className="absolute border-r-4 border-black h-9 top-[216px] left-[22px]" />
        <div className="absolute border-b-4 border-black w-9 top-[24px] left-[132px]" />
        <div className="absolute border-b-4 border-black w-9 top-[108px] left-[132px]" />
        <div className="absolute border-b-4 border-black w-9 top-[24px] left-[216px]" />
        <div className="absolute border-b-4 border-black w-9 top-[108px] left-[216px]" />
        <div className="absolute border-r-4 border-black h-9 top-[132px] left-[274px]" />
        <div className="absolute border-b-4 border-black w-9 top-[190px] left-[132px]" />
        <div className="absolute border-b-4 border-black w-9 top-[190px] left-[216px]" />
        {/* Absolute positioned Weights */}
        <div className="absolute weight hidden group-hover:block w-9 top-0 left-[48px]">
          2
        </div>
        <div className="absolute weight hidden group-hover:block w-9 top-[84px] left-[48px]">
          1
        </div>
        <div className="absolute weight hidden group-hover:block w-9 top-[252px] left-[48px]">
          1
        </div>
        <div className="absolute weight hidden group-hover:block w-9 top-[252px] left-[132px]">
          1
        </div>
        <div className="absolute weight hidden group-hover:block w-9 top-[282px] left-[216px]">
          5
        </div>
        <div className="absolute weight hidden group-hover:block h-[73px] top-[214px] left-[226px] ">
          2
        </div>
        <div className="absolute weight hidden group-hover:block h-9 top-[52px] left-[6px]">
          1
        </div>
        <div className="absolute weight hidden group-hover:block h-9 top-[52px] left-[284px]">
          1
        </div>
        <div className="absolute weight hidden group-hover:block h-9 top-[136px] left-[6px]">
          3
        </div>
        <div className="absolute weight hidden group-hover:block h-9 top-[220px] left-[172px]">
          2
        </div>
        <div className="absolute weight hidden group-hover:block h-9 top-[136px] left-[90px]">
          1
        </div>
        <div className="absolute weight hidden group-hover:block h-9 top-[220px] left-[6px]">
          5
        </div>
        <div className="absolute weight hidden group-hover:block w-9 top-0 left-[132px]">
          2
        </div>
        <div className="absolute weight hidden group-hover:block w-9 top-[84px] left-[132px]">
          4
        </div>
        <div className="absolute weight hidden group-hover:block w-9 top-0 left-[216px]">
          2
        </div>
        <div className="absolute weight hidden group-hover:block w-9 top-[84px] left-[216px]">
          7
        </div>
        <div className="absolute weight hidden group-hover:block h-9 top-[136px] left-[284px]">
          3
        </div>
        <div className="absolute weight hidden group-hover:block w-9 top-[166px] left-[132px]">
          1
        </div>
        <div className="absolute weight hidden group-hover:block w-9 top-[166px] left-[216px]">
          5
        </div>
      </div>
    </section>
  );
};

export default GraphChart;
