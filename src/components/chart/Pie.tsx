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
        data: columns.map(c => c.value.reduce((acc: number, item) => {
          if (typeof item !== 'number') return acc;
          return acc + item
        }, 0)),
        backgroundColor: Array.from({ length: columns.length }, (_) => getRandomColor()),
        hoverBackgroundColor: Array.from({ length: columns.length }, (_) => getRandomColor()),
      }
    ]

  }
};

// [
//   {
//     data: [300, 50, 100],
//     backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//     hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//   },
// ],

type PieChartProps = {
  columns: DataColumn[]
}

const PieChart: React.FC<PieChartProps> = ({ columns }) => (
  <div>
    <Pie data={convertData(columns)} width={400} height={400} />
  </div>
);

export default PieChart;
