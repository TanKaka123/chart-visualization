import { ChartData } from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";
import { DataColumn } from "../../../types/table";
import { CHART_COLORS, getRandomColor } from "@/utils/randomColor";

const convertData = (columns: DataColumn[]): ChartData<any> => {
  const labels = columns.map(c => c.name)
  const labelColors = Array.from({ length: columns.length }, (_, index) => CHART_COLORS[index])
  return {
    labels: labels,
    datasets: [
      {
        data: columns.map(c => (c.value as number[]).reduce((acc: number, item) => {
          const parsedItem = parseInt(item as any, 10); // Safely parse item to number
          if (isNaN(parsedItem)) return acc;  // Ignore if item cannot be parsed to a number
          return acc + parsedItem;
        }, 0)),
        backgroundColor: labelColors,
        hoverBackgroundColor: labelColors,
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
