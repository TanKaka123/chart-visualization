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
        data: columns.map(c => c.value.reduce((acc, item) => {
          const parseAcc = parseInt(acc  as any)
          if (typeof item !== 'number' && typeof parseAcc !== 'number') return acc;
          return parseAcc + (item as any);
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
