import { ButtonGroup, Button } from "@chakra-ui/react";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ButtonGroup spacing={2} mb={4} display="flex" justifyContent="center">
      <Button
        onClick={handlePrevPage}
        isDisabled={currentPage === 1}
        colorScheme={currentPage === 1 ? "gray" : "blue"}
        variant={currentPage === 1 ? "outline" : "solid"}
        size="sm"
      >
        Previous
      </Button>

      {pageNumbers.map((number) => (
        <Button
          key={number}
          onClick={() => onPageChange(number)}
          colorScheme={number === currentPage ? "blue" : "gray"}
          variant={number === currentPage ? "solid" : "outline"}
          size="sm"
        >
          {number}
        </Button>
      ))}

      <Button
        onClick={handleNextPage}
        isDisabled={currentPage === totalPages}
        colorScheme={currentPage === totalPages ? "gray" : "blue"}
        variant={currentPage === totalPages ? "outline" : "solid"}
        size="sm"
      >
        Next
      </Button>
    </ButtonGroup>
  );
};

export default Pagination;
