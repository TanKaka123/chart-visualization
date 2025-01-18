import React from "react";
import { Radar } from "react-chartjs-2";
import { DataColumn } from "../../../types/table";
import { ChartData } from "chart.js";

type RadarChartProps = {
  columns: DataColumn[];
};

const RadarChart: React.FC<RadarChartProps> = ({ columns }) => {
  // Convert the columns data into chart.js format
  const labels = columns.map((column) => column.name);

  const datasets = [
    {
      label: "Dataset 1", // Customize the label for your dataset
      data: columns.map((column) =>
        column.dataType === "number" ? column.value.reduce((a, b) => a + b, 0) / column.value.length : column.value.length
      ),
      backgroundColor: "rgba(54, 162, 235, 0.2)", // Semi-transparent fill color
      borderColor: "rgba(54, 162, 235, 1)", // Border color
      borderWidth: 1, // Border width
    },
  ];

  const data: ChartData<"radar"> = {
    labels,
    datasets,
  };

  return (
    <div>
      <Radar data={data} width={400} height={400} />
    </div>
  );
};

export default RadarChart;
