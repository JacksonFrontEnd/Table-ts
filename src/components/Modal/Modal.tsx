import React,{ FC } from "react";
import { addressType, companyType } from "../SpaTable/types";
import './Modal.style.scss'

const UserModal:FC<{onClose:Function, userData:{address:addressType, company:companyType} | undefined}> = ({ onClose, userData }) => {
   
    const onOutsideClick = () => {
        onClose(false)   
    };
    if(userData!==undefined){
    const {address, company} = userData
    const {street, suite, city, zipcode, geo } = address
    const { lat, lng } = geo
    const {name, catchPhrase, bs} = company

  return (
      <div className="outerModal flex centerFlex" onClick={onOutsideClick}>
        <div
          className="innerModal flex centerFlex flexColumn"
        >
          <span>Address 
            <ul>
                <li>{street}</li>
                <li>{suite}</li>
                <li>{city}</li>
                <li>{zipcode}</li>
                <li>{lat}</li>
                <li>{lng}</li>
            </ul>
            <span>Company 
            <ul>
                <li>{name}</li>
                <li>{catchPhrase}</li>
                <li>{bs}</li>
            </ul>
            </span>
           </span>
          
        </div>
      </div>
    )
  }
    return <></>
  }
  export default UserModal;