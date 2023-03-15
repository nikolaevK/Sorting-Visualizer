import { useContext, useEffect } from "react";
import { itemsContext, settingContext } from "./utils/AlgoContext";

const BarChart = () => {
  const { items } = useContext(itemsContext);
  const { settings } = useContext(settingContext);

  useEffect(() => {
    items.map((item, index) => console.log(item, index));
  }, [items]);

  return (
    <section className="h-full mt-4">
      <div className="flex justify-center h-[80vh] w-[90vw] m-auto items-end gap-[1px]">
        {items.map((item, idx) => (
          <div
            key={`${item}-${settings.arrayLength}-${idx}`}
            className="flex-1"
            id={`${idx}`}
            style={{
              backgroundColor: "rgb(168, 85, 247)",
              height: `${Math.floor(item / 7)}%`,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BarChart;
