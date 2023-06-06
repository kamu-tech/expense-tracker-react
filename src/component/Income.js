import React,{useState,useEffect} from 'react'
import SideBar from './SideBar'
import { useParams } from 'react-router'
import Header1 from './Header1'
import IncomeService from '../Service/IncomeService'
import LoginService from '../Service/LoginService'
import {AiFillEdit} from 'react-icons/ai'
import {SiAddthis} from 'react-icons/si'
import Footer from './Footer'
import ExpenseService from '../Service/ExpenseService'
import DeleteDialogue from './DeleteDialogue'
const Income = () => {
    const [message,setMessage]=useState('Success')
    const [income,setIncome]=useState([])
    const [select,setSelect]=useState([])
    const [name,setName]=useState('')
    const [userName,setUserName]=useState('')
    const [start,setFrom]=useState()
    const [end,setTo]=useState()
    const [category,setCategory]=useState('All')
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
      IncomeService.filter(filter,id).then(response=>{
        setIncome(response.data)
      }).catch(error=>{
        console.log(error);
      })
    }
    useEffect(()=>{
      IncomeService.display(id).then(response=>{
        setIncome(response.data)
      }).catch(error=>{
        console.log(error);
      })
      ExpenseService.category("income").then(response=>{
        setSelect(response.data)
      }).catch(error=>{
        console.log(error);
      })
    },[])
    const deleteIncome=(id1)=>{
        IncomeService.delete(id1).then(response=>{
          setMessage(response.data)
          IncomeService.display(id).then(response=>{
            setIncome(response.data)
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
                <SideBar name='income' id={id} userName={userName} value={name}/>
             </div>
             <div className='sub-dash'>
               <h2>Income</h2>
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
               <a href={`/income/addIncome/${id}`} className='link-add'><SiAddthis/></a>
               </div>
               <div className='income-table'>
                <table>
                  <thead>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Balance</th>
                    <th>Action</th>
                  </thead>
                  <tbody>
                    {income.map(
                      income=>
                      <tr key={income.id}>
                        <td>{income.date}</td>
                        <td>{income.category}</td>
                        <td>{income.balance}</td>
                        <td className='btn-income'>
                          <a href={`editIncome/${income.id}`} className='link'><AiFillEdit/></a> 
                          <DeleteDialogue delete={()=>deleteIncome(income.id)} message={message} />
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

export default Income