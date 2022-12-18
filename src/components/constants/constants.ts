import {columnType} from './types' 
export const columns:columnType = [
  { field: "id", fieldName: "#", isSort: false },
  { field: "status", fieldName: "Status", isSort: true },
  { field: "sum", fieldName: "Sum", isSort: true },
  { field: "qty", fieldName: "Qty", isSort: true },
  { field: "volume", fieldName: "Volume", isSort: true },
  { field: "name", fieldName: "Name", isSort: true },
  { field: "delivery_date", fieldName: "Delivery date", isSort: true, type:'date' },
  { field: "currency", fieldName: "Currency", isSort: true },
  {field: "total", fieldName: "Total", isSort: true}
];