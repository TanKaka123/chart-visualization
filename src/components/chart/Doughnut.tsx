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
        data: columns.map(c => c.value.reduce((acc: number, item) => {
          if (typeof item !== 'number') return acc;
          return acc + item
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
