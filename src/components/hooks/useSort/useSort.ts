import React, {useState} from "react";
import { endpointType } from "../../constants/types";

const useSort = (items:Array<endpointType>, config = null) => {
  const [sortConfig, setSortConfig] = useState<{key:string,direction:string, type: string | undefined} | null>(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const { direction, key, type} = sortConfig
        let aElem = a[key as keyof typeof a]
        let bElem = b[key as keyof typeof b]
        if(type && type === 'date' ){ 
          aElem = Date.parse(aElem as string)
          bElem = Date.parse(bElem as string) 
        }
        if (aElem < bElem) {
          return direction === "ascending" ? -1 : 1;
        }
        if (aElem > bElem) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (keyParam:string, type: string | undefined) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === keyParam &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key:keyParam, direction, type});
  };

  return { items: sortedItems, requestSort, sortConfig };
};

export default useSort;
