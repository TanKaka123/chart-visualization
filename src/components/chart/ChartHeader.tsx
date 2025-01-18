import { EChartType } from "@/types/chart"
import { VStack, Heading, Text, Box, Select, HStack, IconButton, Input } from "@chakra-ui/react"
import _ from "lodash";
import React from "react";
import { MdEdit } from "react-icons/md";

type ChartHeaderProps = {
    title: string,
    description: string,
    selectedChart: string
    setSelectedChart: React.Dispatch<React.SetStateAction<string>>
    setChartTitle: React.Dispatch<React.SetStateAction<string>>
    setChartDescription: React.Dispatch<React.SetStateAction<string>>
}

export const ChartHeader = ({ title, description, selectedChart, setSelectedChart, setChartTitle, setChartDescription }: ChartHeaderProps) => {
    const [isEditChartTitle, setIsEditChartTitle] = React.useState<boolean>(false);
    const [isEditChartDescription, setIsEditChartDescription] = React.useState<boolean>(false);

    return (
        <VStack textAlign={"left"} w='full' pos='relative'>
            <HStack>
                <HStack pos='relative' w='fit-content' maxW='full'>
                    {!isEditChartTitle ? <Heading as="h3" size="lg" mb={4} textAlign={"left"} onDoubleClick={() => setIsEditChartTitle(true)}>
                        {title}
                    </Heading>
                        :
                        <Input
                            value={title}
                            onChange={(e) => setChartTitle(e.target.value)}
                            onBlur={() => setIsEditChartTitle(false)}
                            autoFocus
                            mb={"12px"}
                        />
                    }

                    <IconButton
                        aria-label={""}
                        icon={<MdEdit />}
                        pos='absolute'
                        right={"-40px"}
                        bg='transparent'
                        top={0}
                        _hover={{
                            backgroundColor: 'transparent'
                        }}
                        _selected={{
                            backgroundColor: 'transparent'
                        }}
                        _active={{
                            backgroundColor: 'transparent'
                        }}
                        onClick={() => setIsEditChartTitle(true)}
                    />
                </HStack>

                <Box pos='absolute' right={0}>
                    <Select
                        value={selectedChart}
                        onChange={(e) => setSelectedChart(e.target.value)}
                        placeholder="Select a Chart"
                        width="250px"
                        colorScheme="teal"
                        variant="outline"
                    >
                        {Object.values(EChartType).map((chart, index) => (
                            <option key={chart} value={chart}>
                                {chart}
                            </option>
                        ))}
                    </Select>
                </Box>
            </HStack>

            {!isEditChartDescription ? <Text isTruncated textAlign={"center"} w="500px" my="5px" onDoubleClick={() => setIsEditChartDescription(true)}>
                {description}
            </Text> :
                <Input
                    value={description}
                    onChange={(e) => setChartDescription(e.target.value)}
                    onBlur={() => setIsEditChartDescription(false)}
                    autoFocus
                    h="30px"
                    mb={"12px"}
                />
            }
        </VStack>
    )
}