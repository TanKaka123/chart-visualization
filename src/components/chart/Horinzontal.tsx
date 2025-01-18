import { ChartData } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
import { DataColumn } from "../types/table";
import { getRandomColor } from "@/utils/randomColor";

const convertData = (columns: DataColumn[]): ChartData<any> => {
  const labels = columns.map(c => c.name);

  return {
    labels: Array.from({ length: columns[0].value.length }, (_, index) => index + 1),
    datasets: columns.map(c => {
      const primaryColor = getRandomColor();
      const secondColor = getRandomColor();
      return {
        label: c.name,
        backgroundColor: primaryColor,
        borderColor: secondColor,
        borderWidth: 1,
        hoverBorderColor: secondColor,
        data: c.value,
      }
    })
  }
};

type HorizontalBarChartProps = {
  columns: DataColumn[]
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({ columns }) => (
  <div>
    <Bar data={convertData(columns)} width={400} height={400} />
  </div>
);

export default HorizontalBarChart;
