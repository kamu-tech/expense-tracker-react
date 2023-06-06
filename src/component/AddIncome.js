import React,{useState,useEffect} from 'react'
import SideBar from './SideBar'
import { useNavigate, useParams } from 'react-router'
import Header1 from './Header1'
import IncomeService from '../Service/IncomeService'
import LoginService from '../Service/LoginService'
import ExpenseService from '../Service/ExpenseService'
import Message from './Message'
import Footer from './Footer'
const AddIncome = () => {
    const [message,setMessage]=useState('')
    const [show,setShow]=useState(false);
    const [select,setSelect]=useState([])
    const current=new Date();
    const str=current.setDate(current.getDate()+0);
    const date=new Date(str).toISOString().split('T')[0]
    const [balance,setBalance]=useState()
    const [category,setCategory]=useState('')
    const [name,setName]=useState('')
    const [userName,setUserName]=useState('')
    const navigate=useNavigate();
    const {id}=useParams()
    const findName=()=>{
      LoginService.displayById(id).then(response=>{
        setName(response.data.name)
        setUserName(response.data.userName)
      }).catch(error=>{
        console.log(error);
      })
    }
    useEffect(()=>{
      ExpenseService.category("income").then(response=>{
        setSelect(response.data)
      }).catch(error=>{
        console.log(error);
      })
    },[])
    const addIncome=(e)=>{
        const income={date,balance,category}
        e.preventDefault();
        IncomeService.add(income,id).then(response=>{
            setMessage(response.data);
            setShow(true);
        }).catch(error=>{
            console.log(error);
        })
    }
    const handleClose=()=>{
      if(message==="success"){
         navigate(`/income/${id}`);
      }
      setShow(false)
    };
    
    return (
      <div>
        {findName()}
          <Header1/>
          <div className='main-dash'>
             <div className='main-sideBar'>
                <SideBar name='income' id={id} userName={userName} value={name}/>
             </div>
             <div className='sub-dash'>
               <h2> Add Income</h2>
               <hr/>
               <div className='add-income'>
                <form>
                    <label>Date:</label><br/>
                    <input type='date'
                    value={date}
                    disabled='true'
                    ></input><br/><br/>
                    <label>Amount:</label>
                    <input type='text'
                    value={balance}
                    onChange={(e)=>setBalance(e.target.value)}
                    ></input><br/><br/>
                    <label>Category:</label><br/>
                    <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                    <option>select option</option>
                      {select.map(
                          select=>
                          <option key={select.id}>{select.category}</option>
                      )}
                    </select><br></br><br></br>
                    <button onClick={(e)=>addIncome(e)}>Submit</button>
                    {show && <Message m={message} id={id} close={()=>handleClose()}/>}
                </form>
               </div>
             </div>
          </div>
          <Footer/>
      </div>
    )
}

export default AddIncome