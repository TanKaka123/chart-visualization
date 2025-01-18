import { Box, Flex, Heading, Button, } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useDataContext } from "@/hook/useData";
import { Widget } from "@/components/widget";
import { EChartType } from "@/types/chart";
import { generateRandomId } from "@/utils/id";
import { BlankWidgetType, WidgetType } from "@/types/widget";
import React from "react";


export default function VisualizeData() {
  const { widgetsData, setWidgetsData } = useDataContext();

  const onAddNewWidget = React.useCallback(() => {
    const blankWidget: BlankWidgetType = {
      type: 'blank',
      id: generateRandomId(),
    }
    setWidgetsData(prev => [...prev, blankWidget])
  }, [setWidgetsData])

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
      {
        widgetsData.map((widget, idx) => (
          <Widget data={widget} onAddNewWidget={onAddNewWidget} isLastWidget={idx +1 === widgetsData.length}/>
        ))
      }
    </Box>
  );
}
