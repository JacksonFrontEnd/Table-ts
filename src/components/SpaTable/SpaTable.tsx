import React, { useState, useEffect,useCallback, FC } from "react";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import 'bootstrap';
import useSort from "../hooks/useSort/useSort";
import "./spaTable.styles.scss";
import { columns } from "../constants/constants";
import Highlight from "../Highlight/HighLight"
import { endpointType } from "../constants/types";
import { Button, Modal } from "react-bootstrap";
import { checkboxType } from "./types";
import { postResponce } from "../../api/api";


const SpaTable:FC<{rows: Array<endpointType>}> = ( props ) => {
  const {rows} = props

  const tableData = useSelector((state:{table:{tableData:[]}}) => state.table.tableData);

  const [localTableData, setLocalTableData] = useState(rows);
  const [qtySum, setQtySum] = useState(0);
  const [volumeSum, setVolumeSum] = useState(0);
  const [inputValue,setInputValue] = useState("")
  const [checkboxArray, setCheckboxArray] = useState<Array<{id:string,name:string}>>([])
  const [allCheckbox,setAllCheckbox] = useState(false)
  const { items, requestSort, sortConfig } = useSort(localTableData);
  const [isModal,setIsModal] = useState(false)
  useEffect(() => {
    setLocalTableData(items);
    requestSort("delivery_date", 'date')
    getSumForColumn('qty', setQtySum)
    getSumForColumn('volume', setVolumeSum)
  }, []);

  useEffect(() => {
    setLocalTableData(items);
  }, [sortConfig]);

  const getClassNamesFor = (name:string) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  
  function getSumForColumn<colNameType extends keyof endpointType> (colName:colNameType, setState: React.Dispatch<React.SetStateAction<number>>):void {
    setLocalTableData(prevState => { 
      let result = 0 
      if(prevState.length!==0 && typeof prevState[0][colName] === 'number'){
        result = prevState.reduce((sum, elem)=> {
          return sum + (elem[colName] as number)
        },0)
      } 
      setState(result)
      return prevState
    })
  }
  const myFilter = (el:endpointType, regex:RegExp) =>{
    const arr = Object.values(el)
    return arr.find(element => String(element).match(regex)) !== undefined
  }
  const applyFilterHandler =(findStr:string)=> {
    setLocalTableData(tableData);
    setInputValue(findStr)
    setLocalTableData(prevState=>{
      const regex = new RegExp(findStr, 'ig') 
      return prevState.filter(el => myFilter(el, regex))
    })
  };

  const useResetFilterHandler = () => {
    setLocalTableData(tableData);
  }

  const allCheckboxCheck = () =>{
    setAllCheckbox(true)
    setLocalTableData(tableData=>{
      setCheckboxArray(prevState=>{
        prevState = []
        prevState = tableData.map(el => {
          return {id:el.id, name:el.name}
        })
        return prevState
      })
      return tableData
    })
  }

  const removeAllCheckbox = ()=>{
    setAllCheckbox(false)
    setCheckboxArray([])
  }

  const checkboxHandler = (e: checkboxType) =>{
    removeAllCheckbox()
    let fl = true
    setCheckboxArray(prevState=>{
      let arr = prevState
      if(fl)  { 
        fl= false
        if(prevState.find(item => item.id === e.id) === undefined) {
          arr.push(e)
        } else{
          arr = prevState.filter(item => item.id !== e.id)
        }
    }
      return arr
    })   
  }

  const submitNullButtonHandler = ()=>{
    setIsModal(false)
    setCheckboxArray(prevState=>{
      postResponce(prevState)
      return prevState
    })
    
  }
  const light = useCallback((str:string | number)=>{
    return (<Highlight str={String(str)} inputValue ={inputValue} />)
  },[inputValue])
  return (
    <>
    <Table striped bordered hover size="lg">
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
                    column.isSort ? () => requestSort(column.field, column.type) : undefined
                  }
                >
                  {column.fieldName}
                </button>
              </th>
            );
          })}
          <th><input type="checkbox" checked={allCheckbox?true:false} onClick={allCheckbox ? removeAllCheckbox : allCheckboxCheck}/></th>
        </tr>
      </thead>
      {localTableData.length!==0?(<tbody>
        {localTableData.map((row: endpointType) => {
          return (   
           <>
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{light(row.status)}</td>
              <td>{light(row.sum)}</td>
              <td>{light(row.qty)}</td>  
              <td>{light(row.volume)}</td>  
              <td>{light(row.name)}</td>  
              <td>{light(row.delivery_date)}</td>  
              <td>{light(row.currency)}</td> 
              <td className="d-flex justify-content-around">
               <div>{light(`${row.sum + row.qty}`)}</div>
               <div>{light(row.currency)}</div>
              </td> 
              <td><input type="checkbox" checked={allCheckbox?true:undefined} onClick={()=>checkboxHandler({id:row.id, name: row.name})}/></td>
            </tr>
          </>
          );
        })}
      </tbody>):<h3>Поиск не дал результатов или таблица пуста</h3>}
    </Table>
    <>
      <Modal
            show={isModal}
            onHide={()=>setIsModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Аннулировать</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Вы уверены что хотите аннулировать товар(ы):</h4>
              {checkboxArray.length!==0 ?
              (<ul>
                {checkboxArray.map(el=>(<li>{el.name}</li>))}
              </ul>) : (<h5>Не выбрано элементов для аннулирования</h5>)
              }
            </Modal.Body>
            <Modal.Footer>
              <Button 
                className="btn-danger px-5" 
                disabled={checkboxArray.length===0} 
                onClick={submitNullButtonHandler}
                > Применить </Button>
              <Button className="btn-primary px-5"  onClick={()=>setIsModal(false)}>Отклонить</Button>
            </Modal.Footer>
          </Modal>
        </>
    <footer>
      <div className="d-flex justify-content-between m-5">
        <div className="d-flex gap-3 w-25">
          <input
            type="text"
            className="form-control"
            placeholder="Field value"
            name="name"
            onChange={(e) => applyFilterHandler(e.target.value)}
          />
          <Button
            onClick={useResetFilterHandler}
            className="btn btn-danger px-5 "
          >
            Сброс
          </Button>
        </div>
        <Button onClick={()=>setIsModal(true)}>Аннулировать</Button>
        <div className="d-flex flex-column gap-1">
          <div className="m-0">Overall volume: {volumeSum}</div>
          <div className="m-0">Overall quantity: {qtySum}</div>
        </div>
      </div>
    </footer>
 </>
  );
};
export default SpaTable;
