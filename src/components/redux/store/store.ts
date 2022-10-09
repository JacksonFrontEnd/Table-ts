import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "../slicer/tableSlicer";
export const store = configureStore({
  //store configuration
  reducer: {
    table: tableReducer,
  },
});
