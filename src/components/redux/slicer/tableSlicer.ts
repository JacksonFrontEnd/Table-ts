import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tableData: [],
};

export const tableSlice = createSlice({
  //adding actions to work with storage
  name: "tableStore",
  initialState,
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
  },
});

export const {
  setTableData,
} = tableSlice.actions;

export default tableSlice.reducer;
