import { ChartData } from "chart.js";
import React from "react";
import { Scatter } from "react-chartjs-2";
import { DataColumn } from "../../../types/table";
import { CHART_COLORS, getRandomColor } from "@/utils/randomColor";

export enum EDataType {
  STRING = "string",
  NUMBER = "number",
}

type ScatterChartProps = {
  columns: DataColumn[];
}

const ScatterChart: React.FC<ScatterChartProps> = ({ columns }) => {
  const datasets = columns.map((col, idx) => {
    const randomColor = CHART_COLORS[idx]
    return {
      label: col.name,
      data: col.value.map((value, i) => ({ x: i, y: value })),
      pointBorderColor: randomColor,
      pointBackgroundColor: "#fff",
      pointBorderWidth: 3,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: randomColor,
      pointHoverBorderWidth: 2,
      pointRadius: 3,
      pointHitRadius: 10,
    }
  });

  const data: ChartData<any> = {
    labels: columns.map((col) => col.name),
    datasets,
  };

  return (
    <div>
      <Scatter data={data} width={400} height={400} />
    </div>
  );
};

export default ScatterChart;
