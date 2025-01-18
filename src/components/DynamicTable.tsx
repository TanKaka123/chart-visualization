"use client";
import useSorting from "@/hook/useSorting";
import fetchData from "@/utils/fetchData";
import { handleFileUpload } from "@/utils/handleFileUpload";
import { useFileExport } from "@/utils/useFileExport";
import React, { useState, useEffect, useCallback } from "react";
import ExportButtons from "./ExportTable";
import Pagination from "./Pagination";
import { SearchInputTableImport } from "./SearchInputTableImport";
import { Box, Flex, Button, Input, HStack, IconButton } from "@chakra-ui/react";
import { TableData } from "./TableData";
import { DataRow, EDataType, DateCell } from "./types/table";
import { useDataContext } from "@/hook/useData";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const DynamicTable: React.FC = () => {
  const { dataTable, visibleColumns, setDataTable, setVisibleColumns } = useDataContext()
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);

  const [columnSearch, setColumnSearch] = useState<{ [key: string]: string }>({});
  const { sortConfig, handleSorting } = useSorting();
  
  console.log(sortConfig)

  useEffect(() => {
    if (dataTable.length > 0) {
      setVisibleColumns(dataTable[0].map(d => ({
        name: d.name,
        dataType: d.dataType
      })));
      setVisibleColumns(
        dataTable[0].map(d => ({
          dataType: d.dataType,
          name: d.name
        }))
      );
    }

    const fetchDataFromAPI = async () => {
      try {
        const fetchedData = await fetchData();
        setDataTable(fetchedData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchDataFromAPI();
  }, []);


  const handleDataChange = useCallback(
    (rowIndex: number, key: string, value: string | number) => {
      const updatedData = [...dataTable];
      const pageIndex = (currentPage - 1) * itemsPerPage;
      const rowIndexInPage = rowIndex + pageIndex;
      for (var i = 0; i < updatedData[rowIndexInPage].length; i++) {
        if (key === updatedData[rowIndexInPage][i].name) {
          console.log(updatedData[rowIndexInPage][i].name, i)
          updatedData[rowIndexInPage][i].value = value
        }
      }
      setDataTable(updatedData);
    },
    [dataTable, currentPage, itemsPerPage]
  );

  const handleRowDelete = useCallback(
    (rowIndex: number) => {
      const updatedData = dataTable.filter((_, index) => index !== rowIndex);
      setDataTable(updatedData);
    },
    [dataTable]
  );

  const handleRowAdd = () => {
    const newRow: DataRow = dataTable[0].map((column) => {
      return {
        dataType: column.dataType,
        name: column.name,
        value: column.dataType === EDataType.NUMBER ? 0 : 'name'
      } as DateCell
    });

    setDataTable(prev => [...prev, newRow]);
  };

  const handleColumnAdd = () => {
    const newColumnName = `new column`;
    const newColumn = {
      name: newColumnName,
      dataType: EDataType.NUMBER,
      value: '0'
    }
    setDataTable(rows => (rows.map(
      (r) => ([
        ...r,
        newColumn as DateCell
      ])
    )));
    setVisibleColumns((prev) => [...prev, newColumn]);
  };

  const filterRows = React.useMemo(() => dataTable.filter((row: DataRow) => {
    return row.every((cell) => {
      if (!columnSearch[cell.name]) {
        return true;
      }
      return (
        cell.value.toString().toLowerCase().includes(columnSearch[cell.name].toLowerCase())
      )
    });
  }), [dataTable, columnSearch])

  const filterColumns = React.useMemo(() => filterRows.map((row: DataRow) => {
    return row.filter((cell) => {
      const columnFilter = cell.name || "";
      return (
        columnFilter &&
        cell.name.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    });
  }), [filterRows, searchTerm]);

  const filterVisibleColumns = visibleColumns.filter(c => c.name.toLowerCase().includes(searchTerm))

  const sortedData = React.useMemo(() => {
    let sortableItems = [...filterColumns];
    console.log(filterColumns)

    if (sortConfig.key && sortConfig.direction) {
      sortableItems.sort((a, b) => {
        const key = sortConfig.key;
        const cellA = a.find(cell => cell.name === key);
        const cellB = b.find(cell => cell.name === key);

        if (cellA && cellB) {
          const valueA = cellA.value;
          const valueB = cellB.value;

          if (cellA.dataType === EDataType.STRING && cellB.dataType === EDataType.STRING) {
            const stringA = valueA.toString().toLowerCase();
            const stringB = valueB.toString().toLowerCase();

            if (stringA < stringB) return sortConfig.direction === "asc" ? -1 : 1;
            if (stringA > stringB) return sortConfig.direction === "asc" ? 1 : -1;
          }

          if (cellA.dataType === EDataType.NUMBER && cellB.dataType === EDataType.NUMBER) {
            const numberA = valueA as number;
            const numberB = valueB as number;

            if (numberA < numberB) return sortConfig.direction === "asc" ? -1 : 1;
            if (numberA > numberB) return sortConfig.direction === "asc" ? 1 : -1;
          }
        }

        return 0;
      });
    }

    return sortableItems;
  }, [filterColumns, sortConfig]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const { exportToJson, exportToCsv, exportToXlsx } = useFileExport();

  const handleSearchInColumn = (column: string, value: string) => {
    setColumnSearch((prev) => ({ ...prev, [column]: value }));
  };

  const onFileChange = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const data = await handleFileUpload(file);
        setDataTable(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleColumnDelete = React.useCallback(
    (columnName: string) => {
      const updatedData = dataTable.map((row) => {
        // Filter out the column for each row
        const updatedRow = row.filter(cell => cell.name !== columnName);
        return updatedRow;
      });
      setDataTable(updatedData);

      setVisibleColumns((prev) => prev.filter((col) => col.name !== columnName));
    },
    [dataTable]
  );

  const handleColumnNameChange = (oldName: string, newName: string) => {
    if (!newName) {
      return;
    }

    setDataTable(prev => prev.map((row) => {
      return row.map((cell) => {
        if (cell.name === oldName) {
          return { ...cell, name: newName };
        }
        return cell;
      });
    }));

    setVisibleColumns(prev => prev.map((col) =>
      col.name === oldName ? { ...col, name: newName } : col
    ));
  };

  const router = useRouter();

  return (
    <Box p={6}>
      <HStack position={'relative'} justifyContent={'center'} alignItems={'center'}>
        <SearchInputTableImport
          setSearchTerm={setSearchTerm}
          setCurrentPage={setCurrentPage}
        />
        <Button
          colorScheme="orange"
          pos='absolute'
          top={0}
          right={0}
          px={4}
          py={2}
          borderRadius="full"
          boxShadow="md"
          size="lg"
          rightIcon={<ArrowRightIcon />}
          onClick={() => router.push("/visualize-data")}
        >
          Visualize Data
        </Button>
      </HStack>
      <Box minH="400px">
        <TableData
          visibleColumns={filterVisibleColumns}
          columnSearch={columnSearch}
          currentData={currentData}
          handleSearchInColumn={handleSearchInColumn}
          handleColumnDelete={handleColumnDelete}
          handleDataChange={handleDataChange}
          handleRowDelete={handleRowDelete}
          handleColumnNameChange={handleColumnNameChange}
          sortConfig={sortConfig}
          handleSorting={handleSorting}
          />

      </Box>
      <Flex direction={'row'} justify="space-between" mt={10}>
        <ExportButtons
          exportToJson={() => exportToJson(dataTable)}
          exportToCsv={() => exportToCsv(dataTable)}
          exportToXlsx={() => exportToXlsx(dataTable)}
          sortedData={[]}
        />

        <Flex gap={4} align="center" justify="center" mb={4}>
          <Button
            onClick={handleRowAdd}
            colorScheme="blue"
            px={4}
            py={2}
            borderRadius="md"
            boxShadow="md"
            _hover={{ bg: 'blue.600' }}
          >
            Add row
          </Button>
          <Button
            onClick={handleColumnAdd}
            colorScheme="blue"
            px={4}
            py={2}
            borderRadius="md"
            boxShadow="md"
            _hover={{ bg: 'blue.600' }}
          >
            Add Column
          </Button>
        </Flex>
      </Flex>
      <Box pos='relative'>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filterColumns.filter(c => c.length).length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
        <Flex align="center" justify="flex-start" pos={'absolute'} left={0} top={0}>
          <Box my={5}>
            <Input
              type="file"
              accept=".json"
              onChange={onFileChange}
              borderColor="blue.300"
              borderRadius="md"
              p={2}
              boxShadow="sm"
              _hover={{ bg: 'blue.600' }}

              id="file-input"
              bg="blue.200"
            />
          </Box>
        </Flex>
      </Box>

    </Box>
  );
};

export default DynamicTable;
