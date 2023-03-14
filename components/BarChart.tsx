import { useContext } from "react";
import { itemsContext } from "./utils/AlgoContext";

const BarChart = () => {
  const { items } = useContext(itemsContext);
  return (
    <section className="h-full mt-4">
      <div className="flex justify-center h-[80vh] w-[90vh] m-auto items-end gap-[1px]">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex-1"
            id={`${idx}`}
            style={{
              backgroundColor: "rgb(168, 85, 247)",
              height: `${item / 7}%`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default BarChart;
