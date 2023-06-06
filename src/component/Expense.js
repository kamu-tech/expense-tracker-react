import React,{useState,useEffect} from 'react'
import SideBar from './SideBar'
import { useParams } from 'react-router'
import Header1 from './Header1'
import LoginService from '../Service/LoginService'
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import {SiAddthis} from 'react-icons/si'
import Footer from './Footer'
import ExpenseService from '../Service/ExpenseService'
import DeleteDialogue from './DeleteDialogue'
import Message from './Message'

const Expense = () => {
    const [message,setMessage]=useState('Sucess')
    const [select,setSelect]=useState([])
    const [expense,setExpense]=useState([])
    const [start,setFrom]=useState()
    const [end,setTo]=useState()
    const [category,setCategory]=useState('All')
    const [name,setName]=useState('')
    const [userName,setUserName]=useState('')
    const {id}=useParams()
    const findName=()=>{
      LoginService.displayById(id).then(response=>{
        setName(response.data.name)
        setUserName(response.data.userName)
      }).catch(error=>{
        console.log(error);
      })
    }
    const filter=()=>{
      const filter={start,end,category}
      ExpenseService.filter(filter,id).then(response=>{
        setExpense(response.data)
      }).catch(error=>{
        console.log(error);
      })
    }
    useEffect(()=>{
     ExpenseService.display(id).then(response=>{
       setExpense(response.data)
      }).catch(error=>{
        console.log(error);
      })
      ExpenseService.category("expense").then(response=>{
        setSelect(response.data)
      }).catch(error=>{
        console.log(error);
      })
    },[])
    const deleteIncome=(id1)=>{
        ExpenseService.delete(id1).then(response=>{
          setMessage(response.data)
          ExpenseService.display(id).then(response=>{
            setExpense(response.data)
          }).catch(error=>{
            console.log(error);
          })
        }).catch(error=>{
          console.log(error);
        })
    }
    
    return (
      <div>
        {findName()}
          <Header1/>
          <div className='main-dash'>
             <div className='main-sideBar'>
                <SideBar name='expense' id={id} userName={userName} value={name}/>
             </div>
             
             <div className='sub-dash'>
               <h2>Expense</h2>
               <hr/>
               <div className='filter-form'>
            <form>
                <label>From:</label>
                <input type='date' value={start} onChange={(e)=>setFrom(e.target.value)}></input>
                <label>To:</label>
                <input type='date' value={end} onChange={(e)=>setTo(e.target.value)}></input>
                <label>category:</label>
                <select value={category} onChange={(e)=>setCategory(e.target.value)} >
                <option>select option</option>
                {
                  select.map(
                    select=>
                    <option key={select.id}>{select.category}</option>
                  )
                }
                <option>All</option>
                </select>
                {filter()}
            </form>
        </div>
               <div className='add'>
               <a href={`/expense/addExpense/${id}`} className='link-add'><SiAddthis/></a>
               </div>
               <div className='income-table'>
                <table>
                  <thead>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </thead>
                  <tbody>
                    {expense.map(
                      expense=>
                      <tr key={expense.id}>
                        <td>{expense.date}</td>
                        <td>{expense.category}</td>
                        <td>{expense.amount}</td>
                        <td className='btn-income'>
                          <a href={`editExpense/${expense.id}`} className='link'><AiFillEdit/></a> 
                          <DeleteDialogue delete={()=>deleteIncome(expense.id)} message={message}/>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
               </div>
             </div>
          </div>
          <Footer/>
      </div>
    )
}

export default Expense