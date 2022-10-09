import React, { useState, useEffect,useCallback, FC } from "react";
import Table from "react-bootstrap/Table";
import useSort from "../hooks/useSort/useSort";
import "./spaTable.styles.scss";
import { useSelector } from "react-redux";
import { columns } from "../constants/constants";
import { Trash } from "react-bootstrap-icons";
import Highlight from "../Highlight/HighLight"
import UserModal from "../Modal/Modal"
import { addressType, companyType, tableRow } from "./types";


const SpaTable:FC<{rows: tableRow[]}> = ( props ) => {
  const {rows} = props
  const tableData = useSelector((state:{table:{tableData:[]}}) => state.table.tableData);
  const [localTableData, setLocalTableData] = useState(rows);
  const [inputValue,setInputValue] = useState("")
  const [isModalOpen,setIsModalOpen] = useState(false)
  const [userData,setUserData] = useState<{address:addressType,company:companyType}>()
  const [isDeleteRow,setIsDeleteRow] = useState(false)
  const { items, requestSort, sortConfig } = useSort(localTableData);

  useEffect(() => {
    setLocalTableData(items);
  }, []);

  useEffect(() => {
    setLocalTableData(items);
  }, [sortConfig]);

  const handleRemoveRow = (rowID:number|string) => { 
    setIsDeleteRow(true)
    const newData = localTableData.filter(row => {
      return row.id !== rowID ? row : null
    });
    setLocalTableData(newData);
    setIsDeleteRow(false)
  }

  const getClassNamesFor = (name:string) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  const applyFilterHandler = (findStr:string) => {
    setInputValue(findStr)
    setLocalTableData(prevState=>{
      const regex = new RegExp(findStr, 'ig')  
      return prevState.filter(el=> el.name.match(regex) || el.username.match(regex) || el.email.match(regex))
    })
  };

  const useResetFilterHandler = () => {
    setLocalTableData(tableData);
  };
const handleUserClick = (address:addressType,company:companyType)=>{
  if(!isDeleteRow){
    setUserData({address,company})
    setIsModalOpen(true)
  }
}
  const light = useCallback((str:string)=>{
    return (<Highlight str={str} inputValue ={inputValue} />)
  },[inputValue])
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {columns.map((column) => {
            return (
              <th key={column.field}>
                <button
                  type="button"
                  className={
                    column.isSort ? getClassNamesFor(column.field) : ""
                  }
                  onClick={
                    column.isSort ? () => requestSort(column.field) : undefined
                  }
                >
                  {column.fieldName}
                </button>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {localTableData.map((row: tableRow) => {
          return (   
           <>
            <tr key={row.id} onClick={()=>handleUserClick(row.address, row.company)}>
              <td>{row.id}</td>
              <td>{light(row.name)}</td>
              <td>{light(row.username)}</td>
              <td>{light(row.email)}</td>  
            </tr>
            <button onClick={() => handleRemoveRow(row.id)} className='custom-table__action-btn zindex-fixed'>
            <Trash />
          </button>
          </>
          );
        })}
      </tbody>
      <div className="d-flex p-2 m-2 justify-content-between">
        <div>
          <div className="d-flex gap-3">
            <input
              type="text"
              className="form-control"
              placeholder="Field value"
              name="name"
              onChange={(e) => applyFilterHandler(e.target.value)}
            />
            <button
              onClick={useResetFilterHandler}
              type="button"
              className="btn btn-outline-danger px-5 "
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      {isModalOpen &&!isDeleteRow&& (<UserModal onClose={setIsModalOpen} userData={userData}/>)}
    </Table>
   
  );
};
export default SpaTable;
