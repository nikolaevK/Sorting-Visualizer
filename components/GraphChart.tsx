import { useContext } from "react";
import { itemsContext, settingContext } from "./utils/AlgoContext";

const GraphChart = () => {
  const { settings } = useContext(settingContext);
  const { nodes } = useContext(itemsContext);

  return (
    <section className="h-full mt-20 m-auto text-center">
      <label className="text-purple-500 text-4xl font-semibold pb-6">
        {settings.algoName}
      </label>
      <div className="relative grid grid-cols-4 gap-9 mt-8">
        {nodes.map((div, idx) => {
          return (
            <div
              key={idx}
              id={`${idx}`}
              style={{}}
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
      </div>
    </section>
  );
};

export default GraphChart;
