import { Chart, ChartData, ChartOptions, registerables } from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
import { DataColumn } from "../types/table";
import { getRandomColor } from "@/utils/randomColor";
// Register the necessary chart scale
Chart.register(...registerables);

const convertData = (columns: DataColumn[]) => ({
  labels: Array.from({ length: columns[0].value.length }, (_, index) => index + 1),
  datasets: columns.map(c => {
    const randomColor = getRandomColor()
    return {
      label: c.name,
      fill: false,
      backgroundColor: randomColor,
      borderColor: randomColor,
      data: c.value as number[],
    }
  })
});

const options: ChartOptions<"line"> = {
  scales: {
    x: {
      type: "category",
    },
  },
};


type LineChartProps = {
  columns: DataColumn[]
}

const LineChart: React.FC<LineChartProps> = ({ columns }) => (
  <div>
    <Line data={convertData(columns)} options={options} width={400} height={400} />
  </div>
);

export default LineChart;
