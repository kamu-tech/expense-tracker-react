import React,{useState} from 'react'
import {AiFillDelete} from 'react-icons/ai'
import Message from './Message';
import { useNavigate } from 'react-router';

function DeleteDialogue(props) {
    const [show,setShow]=useState(false);
    const [open,setOpen]=useState(false)
    const openDialogue=()=>{
        setOpen(true)
    };
    const closeDialogue=()=>{
        setOpen(false)
    };
    const handleDelete=()=>{
        props.delete();
        if(props.message==="can't delete! income less than expense.So Try to add income or delete expense"){
            setShow(true)
        }
    };
    const handleClose=()=>{
        setShow(false);
        closeDialogue();
    };
  return (
    <div>
        <a onClick={()=>openDialogue()}><AiFillDelete/></a>
        {open &&(
            <div className='dialog-box'>
                <div className='content'>
                    <p>Are you sure you want to delete this item?</p>
                    <div className='content-button'>
                    <button className='cancel-button' onClick={closeDialogue}>cancel</button>
                    <button className='delete-button' onClick={handleDelete}>Delete</button>
                    {show && <Message m={props.message} close={()=>handleClose()}/>}
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default DeleteDialogue