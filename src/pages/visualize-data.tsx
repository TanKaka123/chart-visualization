import { useState } from "react";
import { Box, Flex, Heading, Select, Button, Text, VStack, HStack } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import Heatmap from "@/components/chart/Heatmap";
import Plot from "@/components/chart/Plot";
import LineChart from "@/components/chart/Line";
import PieChart from "@/components/chart/Pie";
import RadarChart from "@/components/chart/Rada";
import PolarChart from "@/components/chart/Polar";
import ScatterChart from "@/components/chart/Scatter";
import HorizontalBarChart from "@/components/chart/Horinzontal";
import DoughnutChart from "@/components/chart/Doughnut";
import BubbleChart from "@/components/chart/Bubble";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useDataContext } from "@/hook/useData";
import { DataRow, EDataType } from "@/components/types/table";
import { convertDataRowsToColumns } from "@/utils/convertDataRowsToColumns";

const mapChartData = (dataTable: DataRow[]): Record<string, { description: string; component: JSX.Element }> => {
  const filterData = dataTable.map(data => data.filter(d => d.dataType === EDataType.NUMBER) as DataRow);
  const columnsData = convertDataRowsToColumns(filterData);
  return {
    // Heatmap: {
    //   description: "A heatmap visualizes data through variations in coloring, showing the intensity of values.",
    //   component: <Heatmap columns={columnsData} />,
    // },
    // Plot: {
    //   description: "A plot is a graphical representation of data points, typically in 2D space.",
    //   component: <Plot  columns={columnsData} />,
    // },
    LineChart: {
      description: "A line chart displays information using a series of data points connected by straight line segments.",
      component: <LineChart columns={columnsData}/>,
    },
    PieChart: {
      description: "A pie chart is a circular statistical graphic that is divided into slices to illustrate numerical proportions.",
      component: <PieChart columns={columnsData}/>,
    },
    RadarChart: {
      description: "A radar chart shows multivariate data in a two-dimensional graph with axes starting from the same point.",
      component: <RadarChart columns={columnsData} />,
    },
    PolarChart: {
      description: "A polar chart is a circular chart with data points plotted based on angular coordinates.",
      component: <PolarChart columns={columnsData} />,
    },
    ScatterChart: {
      description: "A scatter chart shows data points based on two variables, one plotted along the x-axis and the other along the y-axis.",
      component: <ScatterChart columns={columnsData} />,
    },
    HorizontalBarChart: {
      description: "A horizontal bar chart displays data with rectangular bars with lengths proportional to the values they represent.",
      component: <HorizontalBarChart columns={columnsData} />,
    },
    DoughnutChart: {
      description: "A doughnut chart is similar to a pie chart but with a hole in the center, representing proportions of a whole.",
      component: <DoughnutChart columns={columnsData} />,
    },
    BubbleChart: {
      description: "A bubble chart represents data points in a 2D space with bubbles of varying size based on a third data value.",
      component: <BubbleChart columns={columnsData}/>,
    },
  };
};


export default function VisualizeData() {
  const [selectedChart, setSelectedChart] = useState<string>("LineChart");
  const { dataTable } = useDataContext()
  const router = useRouter();
  const chartData = mapChartData(dataTable)
  
  return (
    <Box maxW="7xl" mx="auto" p={4}>
      <Heading
        as="h1"
        size="2xl"
        textAlign="center"
        fontWeight="bold"
        mb={4}
        color="blue.600"
        userSelect="none"
      >
        Charts Visualization
      </Heading>

      <Flex w="full" justifyContent="space-between">
        <Button
          colorScheme="blue"
          px={4}
          py={2}
          borderRadius="md"
          boxShadow="md"
          _hover={{ bg: 'blue.600' }}
          size="lg"
          leftIcon={<ChevronLeftIcon />}
          onClick={() => router.push("/")}
        >
          Back to Import Data
        </Button>
        <div className={styles.chartSelector}>
          <Select
            value={selectedChart}
            onChange={(e) => setSelectedChart(e.target.value)}
            placeholder="Select a Chart"
            width="250px"
            colorScheme="teal"
            variant="outline"
          >
            {Object.keys(chartData).map((chart) => (
              <option key={chart} value={chart}>
                {chart}
              </option>
            ))}
          </Select>
        </div>
      </Flex>

      <HStack className={styles.chartContainer} p={4} boxShadow="xl" borderRadius="md" gap={"20px"} justifyContent="space-between">
        <VStack textAlign={"left"} w="1/4">
          <Heading as="h3" size="lg" mb={4} textAlign={"left"}>
            {selectedChart}
          </Heading>
          <Text textAlign={"left"} w="500px">
            {chartData[selectedChart]?.description}
          </Text>
        </VStack>

        {chartData[selectedChart]?.component}
      </HStack>
    </Box>
  );
}
