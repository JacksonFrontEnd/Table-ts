import React, {useState} from "react";
import { tableRow } from "../../SpaTable/types";

const useSort = (items:Array<tableRow>, config = null) => {
  const [sortConfig, setSortConfig] = useState<{key:string,direction:string} | null>(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (keyParam:string) => {
    // specifying sorting configuration
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === keyParam &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key:keyParam, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

export default useSort;
