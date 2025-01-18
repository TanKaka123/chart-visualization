import { ChartData } from "chart.js"; 
import React from "react";
import { PolarArea } from "react-chartjs-2";
import { DataColumn, EDataType } from "../types/table";
import { getRandomColor } from "@/utils/randomColor";

const convertData = (columns: DataColumn[]): ChartData<any> => {
  // Extract the names and values dynamically
  const labels = columns.map(c => c.name);
  const datasets = columns.map(c => ({
    data: c.dataType === EDataType.NUMBER ? c.value : [0], // Use the first value for string[] or handle accordingly
    backgroundColor: getRandomColor(), // You can adjust this based on your needs
    label: c.name, // Set label to column name
  }));

  return {
    datasets: datasets,
    labels: labels,
  };
};

type PolarChartProps = {
  columns: DataColumn[];
};

const PolarChart: React.FC<PolarChartProps> = ({ columns }) => (
  <div>
    <PolarArea data={convertData(columns)} width={400} height={400} />
  </div>
);

export default PolarChart;
