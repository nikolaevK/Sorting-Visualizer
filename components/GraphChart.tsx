type Props = {};

const GraphChart = (props: Props) => {
  const array = [];
  for (let i = 0; i < 168; i++) {
    array.push([]);
  }

  for (let j = 0; j < 10; j++) {
    array[Math.round(Math.random() * 128)].push(j);
  }
  return (
    <section className="h-full mt-2 md:mt-4 m-auto">
      <div className="grid grid-cols-12 gap-4">
        {array.map((div) => {
          return (
            <div
              style={{
                border: typeof div[0] === "number" ? "1px solid black" : "",
              }}
              className="h-12 w-12 text-center rounded-full"
            >
              {div[0]}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GraphChart;
