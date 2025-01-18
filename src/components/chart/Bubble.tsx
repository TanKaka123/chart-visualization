import React from "react";
import { Bubble } from "react-chartjs-2";
import { DataColumn, EDataType } from "@/components/types/table";

type BubbleChartProps = {
  columns: DataColumn[];
};

const BubbleChart: React.FC<BubbleChartProps> = ({ columns }) => {
  // Convert `columns` into the `datasets` format expected by the Bubble chart
  const datasets = columns.map((column, index) => {
    const formattedData = column.value.map((value, i) => ({
      x: column.dataType === EDataType.NUMBER ? value : i + 1, // Use value if NUMBER, else use index as x
      y: i + 1, // Example logic for y-axis, could be adjusted based on needs
      r: 5, // Example radius for bubbles; customize as needed
    }));

    return {
      label: column.name,
      fill: false,
      lineTension: 0.1,
      backgroundColor: `rgba(${(index + 1) * 50}, 100, 150, 0.4)`,
      borderColor: `rgba(${(index + 1) * 50}, 100, 150, 1)`,
      borderWidth: 1,
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: formattedData,
    };
  });

  const data = {
    labels: columns.map((col) => col.name),
    datasets,
  };

  return (
    <div>
      <Bubble data={data} width={400} height={200} />
    </div>
  );
};

export default BubbleChart;
