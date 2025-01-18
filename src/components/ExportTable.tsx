import { ButtonGroup, Button } from "@chakra-ui/react";
import React from "react";

type ExportButtonsProps = {
  sortedData: any[];
  exportToJson: (data: any[]) => void;
  exportToCsv: (data: any[]) => void;
  exportToXlsx: (data: any[]) => void;
};

const ExportButtons: React.FC<ExportButtonsProps> = ({
  sortedData,
  exportToJson,
  exportToCsv,
  exportToXlsx,
}) => {
  return (
    <ButtonGroup spacing={4} mb={4}>
      <Button
        onClick={() => exportToJson(sortedData)}
        colorScheme="blue"
        variant="solid"
        size="md"
      >
        Export to JSON
      </Button>
      <Button
        onClick={() => exportToCsv(sortedData)}
        colorScheme="blue"
        variant="solid"
        size="md"
      >
        Export to CSV
      </Button>
      <Button
        onClick={() => exportToXlsx(sortedData)}
        colorScheme="blue"
        variant="solid"
        size="md"
      >
        Export to XLSX
      </Button>
    </ButtonGroup>
  );
};

export default ExportButtons;
