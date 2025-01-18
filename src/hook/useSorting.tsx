import { useState } from "react";

export type SortConfigType = {
  key: string | null;
  direction: "asc" | "desc" | null;
}

const useSorting = () => {
  const [sortConfig, setSortConfig] = useState<SortConfigType>({ key: null, direction: null });

  const handleSorting = (column: string) => {
    let newDirection: "asc" | "desc" | null = null;

    if (sortConfig.key === column) {
      if (sortConfig.direction === "asc") {
        newDirection = "desc";
      }
      else if (sortConfig.direction === "desc") {
        newDirection = null;
      }
      else {
        newDirection = "asc";
      }
    } else {
      newDirection = "asc";
    }

    setSortConfig({
      key: column,
      direction: newDirection,
    });
  };

  return { sortConfig, handleSorting };
};

export default useSorting;
