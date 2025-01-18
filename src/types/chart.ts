import { DataRow } from "./table";

export type ChartWidget = {
    type: 'chart',
    id: string,
    title: string,
    description: string;
    data: DataRow[],
    chartType: EChartType
}

export enum EChartType {
    LINE_CHART = 'LineChart',
    PIE_CHART = 'PieChart',
    RADAR_CHART = 'RadarChart',
    POLAR_CHART = 'PolarChart',
    SCATTER_CHART = 'ScatterChart',
    HORIZONTAL_BAR_CHART = 'HorizontalBarChart',
    DOUGHNUT_CHART = 'DoughnutChart',
    BUBBLE_CHART = 'BubbleChart',
}