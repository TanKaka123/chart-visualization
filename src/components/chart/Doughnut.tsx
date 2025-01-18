import { ChartData } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { DataColumn } from "../types/table";
import { getRandomColor } from "@/utils/randomColor";

const convertData = (columns: DataColumn[]): ChartData<any> => {
  const labels = columns.map(c => c.name);
  const randomColor = labels.map(() => getRandomColor())
  return {
    labels,
    datasets: [
      {
        data: columns.map(c => c.value.reduce((acc, item) => {
          const parseAcc = parseInt(acc  as any)
          if (typeof item !== 'number' && typeof parseAcc !== 'number') return acc;
          return parseAcc + (item as any);
        }, 0)),
        backgroundColor: randomColor,
        hoverBackgroundColor: randomColor
      },
    ],
  }

};

type DoughnutChartProps = {
  columns: DataColumn[]
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ columns }) => (
  <div>
    <Doughnut data={convertData(columns)} width={400} height={400} />
  </div>
);

export default DoughnutChart;
