import { EChartType } from "@/types/chart";
import { DataRow, EDataType } from "@/types/table";
import { convertDataRowsToColumns } from "@/utils/convertDataRowsToColumns";
import { HStack, VStack, Heading, Text } from "@chakra-ui/react"
import BubbleChart from "../chart/chartType/Bubble";
import DoughnutChart from "../chart/chartType/Doughnut";
import HorizontalBarChart from "../chart/chartType/Horinzontal";
import LineChart from "../chart/chartType/Line";
import PieChart from "../chart/chartType/Pie";
import PolarChart from "../chart/chartType/Polar";
import RadarChart from "../chart/chartType/Rada";
import ScatterChart from "../chart/chartType/Scatter";
import { ChartHeader } from "../chart/ChartHeader";
import React from "react";

type ChartWidgetProps = {
    chartType: EChartType;
    data: DataRow[],
    title: string,
    description: string
};

const ChartVisualization = (dataTable: DataRow[]): Record<string, React.ReactElement> => {
    const filterData = dataTable.map(data => data.filter(d => d.dataType === EDataType.NUMBER) as DataRow);
    const columnsData = convertDataRowsToColumns(filterData);
    return {
        // Heatmap: <Heatmap columns={columnsData} />,
        // Plot: <Plot  columns={columnsData} />
        [EChartType.LINE_CHART]: <LineChart columns={columnsData} />,
        [EChartType.PIE_CHART]: <PieChart columns={columnsData} />,
        [EChartType.RADAR_CHART]: <RadarChart columns={columnsData} />,
        [EChartType.POLAR_CHART]: <PolarChart columns={columnsData} />,
        [EChartType.SCATTER_CHART]: <ScatterChart columns={columnsData} />,
        [EChartType.HORIZONTAL_BAR_CHART]: <HorizontalBarChart columns={columnsData} />,
        [EChartType.DOUGHNUT_CHART]: <DoughnutChart columns={columnsData} />,
        [EChartType.BUBBLE_CHART]: <BubbleChart columns={columnsData} />
    };
};

export const ChartWidget = ({ chartType, data, title, description }: ChartWidgetProps) => {
    const [selectedChart, setSelectedChart] = React.useState<string>(chartType);
    const [chartTitle, setChartTitle] = React.useState<string>(title)
    const [chartDescription, setChartDescription] = React.useState<string>(description)


    return (
        <React.Fragment>
            <ChartHeader
                title={chartTitle}
                setChartTitle={setChartTitle}
                description={chartDescription}
                setChartDescription={setChartDescription}
                selectedChart={selectedChart}
                setSelectedChart={setSelectedChart}
            />
            {ChartVisualization(data)[selectedChart]}

        </React.Fragment>
    )
}