import useSorting, { SortConfigType } from "@/hook/useSorting";
import { Box, Table, Thead, Tr, Th, Flex, Input, IconButton, Tbody, Td, useToast, Text } from "@chakra-ui/react"
import { ChevronUpIcon, ChevronDownIcon, ArrowsUpDownIcon } from "@heroicons/react/24/solid"
import { FaTrashAlt } from "react-icons/fa"
import { DataRow, EDataType } from "./types/table";
import React from "react";

type TableDataProps = {
    visibleColumns: { name: string, dataType: EDataType }[];
    columnSearch: { [key: string]: string };
    currentData: DataRow[];
    handleSearchInColumn: (key: string, value: string) => void;
    handleColumnDelete: (key: string) => void;
    handleDataChange: (rowIndex: number, colIndex: number, value: any) => void;
    handleRowDelete: (rowIndex: number) => void;
    handleColumnNameChange: (oldName: string, newName: string) => void,
    handleSorting: (column: string) => void
    sortConfig: SortConfigType
}

export const TableData = ({
    visibleColumns,
    columnSearch,
    currentData,
    handleSearchInColumn,
    handleDataChange,
    handleRowDelete,
    handleColumnDelete,
    handleSorting,
    sortConfig,
    handleColumnNameChange
}: TableDataProps) => {
    const toast = useToast();
    const [tempInputValue, setTempInputValue] = React.useState<string>("");
    const [posTempInput, setPosTempInput] = React.useState<{
        rowIndex: number,
        colIndex: number
    } | undefined>();

    return (
        <Box
            rounded="lg"
            border="4px solid"
            borderColor="blue.500"
            mt={4}
            bg="rgb(59,130,246, 0.1)"
            color="gray.800"
            fontWeight="semibold"
        >
            <Box overflowX="auto">
                <Table variant="simple" minWidth="full" border="4px solid" borderColor="blue.500" rounded="lg">
                    <Thead>
                        <Tr>
                            {visibleColumns.map(c => c.name).map((name, index) =>
                                <Th
                                    key={`${Math.floor(Math.random())}-${name}-${index}`}
                                    border="1px solid"
                                    borderColor="blue.500"
                                    px={4}
                                    py={2}
                                    roundedTopLeft="lg"
                                    roundedTopRight="lg"
                                >
                                    <Flex direction="row" gap={2} justifyContent={'center'} alignItems={'center'}>
                                        <Input
                                            type="text"
                                            value={columnSearch[name] || ""}
                                            onChange={(e) => handleSearchInColumn(name, e.target.value)}
                                            placeholder={`Search ${name}`}
                                            mb={2}
                                        />
                                        <IconButton
                                            aria-label="Sort"
                                            icon={
                                                sortConfig.key === name ? (
                                                    sortConfig.direction === "asc" ? (
                                                        <ChevronUpIcon />
                                                    ) : (
                                                        <ChevronDownIcon />
                                                    )
                                                ) : (
                                                    <ArrowsUpDownIcon />
                                                )
                                            }
                                            onClick={() => handleSorting(name)}
                                            size="sm"
                                            w="15px"
                                            h="15px"
                                            color="blue.600"
                                            bg='transparent'
                                            _hover={{ color: "cyan.500" }}
                                        />
                                        <IconButton
                                            aria-label="Delete Column"
                                            icon={<FaTrashAlt />}
                                            onClick={() => handleColumnDelete(name)}
                                            size="sm"
                                            w="15px"
                                            h="15px"
                                            bg='transparent'
                                            color="red.500"
                                            _hover={{ color: "red.700" }}
                                        />
                                    </Flex>
                                    <Flex justifyContent={'space-between'} alignItems={'center'} gap="5px">
                                        <Input
                                            type="text"
                                            value={name}
                                            onChange={(e) =>
                                                handleColumnNameChange(name, e.target.value)
                                            }

                                            border="none"
                                            fontWeight={"600"}
                                            color="black"
                                            h="26px"
                                        />
                                        <Text>
                                            {visibleColumns.find(c => c.name === name)?.dataType}
                                        </Text>
                                    </Flex>
                                </Th>
                            )}
                            <Th
                                border="1px solid"
                                borderColor="blue.500"
                                px={4}
                                py={2}
                                roundedTopLeft="lg"
                                roundedTopRight="lg"
                                textAlign="center"
                            >
                                {visibleColumns.length ? 'Delete Rows' : ''}
                            </Th>
                        </Tr>
                    </Thead>
                    {
                        visibleColumns.length ?

                            <Tbody>
                                {currentData.map((row, rowIndex) => {
                                    return (
                                        <Tr
                                            key={`${Math.floor(Math.random())}-${row.length}-${rowIndex}`}
                                            borderTop="1px solid"
                                            bg={rowIndex % 2 === 0 ? "gray.50" : "white"}
                                            _hover={{ bg: "blue.50" }}
                                            color="gray.600"
                                        >
                                            {row
                                                .filter((r) => visibleColumns.map(c => c.name).includes(r.name))
                                                .map((dataCell, colIndex) => (
                                                    <Td key={`${Math.floor(Math.random())}-${colIndex}-${rowIndex}-${dataCell.name}`} border="1px solid" borderColor="blue.500" px={4} py={2} onClick={() => setPosTempInput({ rowIndex, colIndex })}>
                                                        {
                                                            posTempInput?.colIndex === colIndex && posTempInput.rowIndex === rowIndex ?
                                                                <Input
                                                                    value={tempInputValue !== "" ? tempInputValue : dataCell.value}
                                                                    onChange={(e) => {
                                                                        if (dataCell.dataType === EDataType.NUMBER &&
                                                                            isNaN(Number(e.target.value))
                                                                        ) {
                                                                            toast({
                                                                                title: "Data type is number",
                                                                                status: "error",
                                                                                duration: 3000,
                                                                                isClosable: true,
                                                                                position: 'top-right'
                                                                            });
                                                                            return;
                                                                        }
                                                                        setTempInputValue(e.target.value)
                                                                    }}
                                                                    bg="transparent"
                                                                    autoFocus
                                                                    onBlur={() => {

                                                                        handleDataChange(rowIndex, colIndex, tempInputValue || dataCell.value); // Update the data
                                                                        setPosTempInput(undefined);
                                                                        setTempInputValue("");
                                                                    }}
                                                                />
                                                                :
                                                                <Box w='full' border="1px solid rgb(213, 212, 212)" borderRadius={"5px"} py="5px" px="5px">
                                                                    {dataCell.value ?? ' '}
                                                                </Box>
                                                        }
                                                    </Td>
                                                ))}

                                            <Td textAlign="center" border="1px solid" borderColor="blue.500" px={4} py={2}>
                                                <IconButton
                                                    aria-label="Delete Row"
                                                    icon={<FaTrashAlt />}
                                                    onClick={() => handleRowDelete(rowIndex)}
                                                    color="red.500"
                                                    bg='transparent'
                                                    _hover={{ color: "red.700" }}
                                                />
                                            </Td>
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                            : null
                    }
                </Table>
            </Box>
        </Box>
    )
}