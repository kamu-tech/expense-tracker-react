import React,{useState} from 'react'
import {AiOutlineClose} from 'react-icons/ai'


function Message(props) {
  const handleClose=()=>{
    props.close();
  };
  return (
    <div>
     <div className='dialog-box'>
          <div className='content'>
          <a className='close-button' onClick={()=>handleClose()}><AiOutlineClose/></a>
                <p>{props.m}</p>
          </div>
     </div>
    </div>
  )
}

export default Message