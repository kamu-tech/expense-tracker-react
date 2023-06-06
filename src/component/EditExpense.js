import React,{useState,useEffect} from 'react'
import SideBar from './SideBar'
import { useNavigate, useParams } from 'react-router'
import Header1 from './Header1'
import ExpenseService from '../Service/ExpenseService'
import LoginService from '../Service/LoginService'
import Message from './Message'
import Footer from './Footer'
const EditExpense = () => {
    const [message,setMessage]=useState('')
    const [show,setShow]=useState(false);
    const [select,setSelect]=useState([])
    const [date,setDate]=useState('')
    const [amount,setAmount]=useState()
    const [category,setCategory]=useState('')
    const [name,setName]=useState('')
    const [userid,setUserId]=useState()
    const [userName,setuserName]=useState('')
    const navigate=useNavigate();
    const {id}=useParams()
    const findName=()=>{
      LoginService.displayById(userid).then(response=>{
        setName(response.data.name)
        setuserName(response.data.userName)
      }).catch(error=>{
        console.log(error);
      })
    }
    useEffect(()=>{
        ExpenseService.displayById(id).then(response=>{
            setDate(response.data.date)
            setAmount(response.data.amount)
            setCategory(response.data.category)
            setUserId(response.data.userId)
        }).catch(error=>{
            console.log(error);
        })
        ExpenseService.category("expense").then(response=>{
          setSelect(response.data)
        }).catch(error=>{
          console.log(error);
        })
    },[])
    const EditExpense=(e)=>{
        const expense={date,amount,category}
        e.preventDefault();
        ExpenseService.edit(expense,id).then(response=>{
          setMessage(response.data);
          setShow(true);
        }).catch(error=>{
            console.log(error);
        })
    }
    const handleClose=()=>{
      if(message==="success"){
         navigate(`/expense/${userid}`);
      }
      setShow(false)
    };
    return (
      <div>
        {findName()}
          <Header1/>
          <div className='main-dash'>
             <div className='main-sideBar'>
                <SideBar name='expense' id={userid} userName={userName} value={name}/>
             </div>
             <div className='sub-dash'>
               <h2> Edit Expense</h2>
               <hr/>
               <div className='add-income'>
                <form>
                    <label>Date:</label><br/>
                    <input type='date'
                    value={date}
                    onChange={(e)=>setDate(e.target.value)}
                    ></input><br/><br/>
                    <label>Amount:</label>
                    <input type='text'
                    value={amount}
                    onChange={(e)=>setAmount(e.target.value)}
                    ></input><br/><br/>
                    <label>Category:</label><br/>
                    <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                       {
                        select.map(
                          select=>
                          <option key={select.id}>{select.category}</option>
                        )
                       }
                    </select><br></br><br></br>
                    <button onClick={(e)=>EditExpense(e)}>Submit</button>
                    {show && <Message m={message} id={id} close={()=>handleClose()}/>}
                </form>
               </div>
             </div>
          </div>
          <Footer/>
      </div>
    )
}

export default EditExpense