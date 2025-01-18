import { ChartData } from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";
import { DataColumn } from "../types/table";
import { getRandomColor } from "@/utils/randomColor";

const convertData = (columns: DataColumn[]): ChartData<any> => {
  const labels = columns.map(c => c.name)
  return {
    labels: labels,
    datasets: [
      {
        data: columns.map(c => (c.value as number[]).reduce((acc: number, item) => {
          const parsedItem = parseInt(item as any, 10); // Safely parse item to number
          if (isNaN(parsedItem)) return acc;  // Ignore if item cannot be parsed to a number
          return acc + parsedItem;
        }, 0)),
        backgroundColor: Array.from({ length: columns.length }, (_) => getRandomColor()),
        hoverBackgroundColor: Array.from({ length: columns.length }, (_) => getRandomColor()),
      }
    ]

  }
};

type PieChartProps = {
  columns: DataColumn[]
}

const PieChart: React.FC<PieChartProps> = ({ columns }) => (
  <div>
    <Pie data={convertData(columns)} width={400} height={400} />
  </div>
);

export default PieChart;
