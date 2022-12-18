import SpaTable from "./components/SpaTable/SpaTable";
import { getTableData } from "./api/api";
import {  useDispatch } from "react-redux";
import {
  setTableData,
} from "./components/redux/slicer/tableSlicer";
import React, { useState, useEffect } from "react";
import { endpointType } from "./components/constants/types";
function App() {
  const [rows, setRows] = useState<Array<endpointType>|[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getTableData().then((data) => {
      dispatch(setTableData(data));
      setRows(data); // getting data from DB
    });
  }, []);

  return (
    rows.length !== 0 ? (
      <>
        <SpaTable rows={rows} />
      </>
    ): <></>
  );
}

export default App;
