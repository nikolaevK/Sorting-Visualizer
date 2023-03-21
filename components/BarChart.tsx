import { useContext } from "react";
import { itemsContext, settingContext } from "./utils/AlgoContext";

const BarChart = () => {
  const { items } = useContext(itemsContext);
  const { settings } = useContext(settingContext);

  return (
    <section className="h-full mt-2 md:mt-4">
      <div className="my-3 md:my-4 w-[95vw] mx-auto border-4 border-gray-700">
        <div className="flex justify-center items-center pt-8 mb-[-3rem]">
          <label className="text-purple-500 text-4xl font-semibold">
            {settings.algoName}
          </label>
        </div>
        <div className="flex justify-center h-[80vh]  px-2 py-2 items-end gap-[1px]">
          {items.map((item, idx) => (
            <div
              key={`${item}-${settings.arrayLength}-${idx}`}
              className="flex-1"
              id={`${idx}`}
              style={{
                backgroundColor: "rgb(168, 85, 247)",
                height: `${Math.floor(item / 7)}%`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BarChart;
