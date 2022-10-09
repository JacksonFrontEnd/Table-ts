import React from "react";

const Highlight:React.FC<{str:string, inputValue:string}>= (props) => {
    const string = props.str
    const inputValue = props.inputValue
    if(!inputValue) return (<>{string}</>)
    const regex = new RegExp(inputValue, 'ig')
    
    const matchValue = string.match(regex)
    if(matchValue){
      return <>{string.split(regex).map((str,i,arr)=>{
        if(i<arr.length-1){
         const c = matchValue.shift()
         return (<>{str}<span className={'highlight'}>{c}</span></>)
        }
        return <>{str}</>
      })}</>
    }
    return  <>{string}</>
};
export default Highlight;