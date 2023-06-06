import React,{useState,useEffect} from 'react'
import SideBar from './SideBar'
import { useNavigate, useParams } from 'react-router'
import Header1 from './Header1'
import IncomeService from '../Service/IncomeService'
import LoginService from '../Service/LoginService'
import ExpenseService from '../Service/ExpenseService'
import Message from './Message'
import Footer from './Footer'
const EditIncome = () => {
    const [message,setMessage]=useState('')
    const [show,setShow]=useState(false);
    const [select,setSelect]=useState([])
    const [date,setDate]=useState('')
    const [balance,setBalance]=useState()
    const [category,setCategory]=useState('')
    const [name,setName]=useState('')
    const [userid,setUserId]=useState()
    const [userName,setUserName]=useState('')
    const navigate=useNavigate();
    const {id}=useParams()
    const findName=()=>{
      LoginService.displayById(userid).then(response=>{
        setName(response.data.name)
        setUserName(response.data.userName)
      }).catch(error=>{
        console.log(error);
      })
    }
    useEffect(()=>{
        IncomeService.displayById(id).then(response=>{
            setDate(response.data.date)
            setBalance(response.data.balance)
            setCategory(response.data.category)
            setUserId(response.data.userId)
        }).catch(error=>{
            console.log(error);
        })
        ExpenseService.category("income").then(response=>{
          setSelect(response.data)
        }).catch(error=>{
          console.log(error);
        })
    },[])
    const EditIncome=(e)=>{
        const income={date,balance,category}
        e.preventDefault();
        IncomeService.edit(income,id).then(response=>{
          setMessage(response.data);
          setShow(true);
        }).catch(error=>{
            console.log(error);
        })
    }
    const handleClose=()=>{
      if(message==="Success"){
         navigate(`/income/${userid}`);
      }
      setShow(false)
    };
    return (
      <div>
        {findName()}
          <Header1/>
          <div className='main-dash'>
             <div className='main-sideBar'>
                <SideBar name='income' id={userid} userName={userName} value={name}/>
             </div>
             <div className='sub-dash'>
               <h2> Add Income</h2>
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
                    value={balance}
                    onChange={(e)=>setBalance(e.target.value)}
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
                    <button onClick={(e)=>EditIncome(e)}>Submit</button>
                    {show && <Message m={message} id={id} close={()=>handleClose()}/>}
                </form>
               </div>
             </div>
          </div>
          <Footer/>
      </div>
    )
}

export default EditIncome