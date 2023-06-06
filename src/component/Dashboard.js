import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import SideBar from './SideBar'
import Footer from './Footer'
import Header1 from './Header1'
import DashboardService from '../Service/DashboardService'
import LoginService from '../Service/LoginService'
import { Link } from 'react-router-dom'
const Dashboard = () => {
    const [income,setIncome]=useState([])
    const [expense,setExpense]=useState([])
    const [totalIncome,setTotalIncome]=useState()
    const [totalExpense,setTotalExpense]=useState()
    const [balance,setBalance]=useState()
    const [name,setName]=useState('')
    const [id,setId]=useState();
    const {userName}=useParams();
    const findId=()=>{
      LoginService.display(userName).then(response=>{
         console.log(response.data);
         setId(response.data.id)
      }).catch(error=>{
        console.log(error);
      })
    }
    const findName=()=>{
      LoginService.displayById(id).then(response=>{
        setName(response.data.name)
      }).catch(error=>{
        console.log(error);
      })
    }
    useEffect(()=>{
      DashboardService.LatestIncome(id).then(response=>{
        setIncome(response.data)
      }).catch(error=>{
        console.log(error);
      })
      DashboardService.LatestExpense(id).then(response=>{
        setExpense(response.data)
      }).catch(error=>{
        console.log(error);
      })
      DashboardService.Balance(id).then(response=>{
        setBalance(response.data)
      }).catch(error=>{
        console.log(error);
      })
      DashboardService.TotalExpense(id).then(response=>{
         setTotalExpense(response.data)
      }).catch(error=>{
        console.log(error);
      })
      DashboardService.TotalIncome(id).then(response=>{
        setTotalIncome(response.data)
      }).catch(error=>{
        console.log(error);
      })
    })
  return (
    <div>
      <Header1/>
      {findId()}
    <div className='main-dash'>
      <div className='main-sidebar'>
        {findName()}
      <SideBar name='dashboard' userName={userName} id={id} value={name}/>
      </div>
     <div className='sub-dash'>
        <h2>Dashboard</h2>
        <hr/>
        <div className='dash-box'>
          <div className='expense-box'>
            <h3>Total expense</h3>
            <h4>${totalExpense}</h4>
          </div>
          <div className='income-box'>
            <h3>Total income</h3>
            <h4>${totalIncome}</h4>
          </div>
          <div className='income-box'>
            <h3>Balance income</h3>
            <h4>${balance}</h4>
          </div>
        </div>
         <div className='latest-income'>
            <h3>Latest Income</h3>
            <table>
              <thead>
                <th>Date</th>
                <th>Category</th>
                <th>Balance</th>
              </thead>
              <tbody>
                {
                  income.map(income=>
                    <tr key={income.id}>
                      <td>{income.date}</td>
                      <td>{income.category}</td>
                      <td>{income.balance}</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
            <h4><a href={`/income/${id}`}>view All</a></h4>
          </div>
          <div className='latest-income'>
            <h3>Latest expense</h3>
            <table>
              <thead>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
              </thead>
              <tbody>
                {
                  expense.map(expense=>
                    <tr key={expense.id}>
                       <td>{expense.date}</td>
                       <td>{expense.category}</td>
                       <td>{expense.amount}</td>
                    </tr>
                    )
                }
              </tbody>
            </table>
            <h4><Link to={`/expense/${id}`}>view All</Link></h4>
          </div>
     </div>
     
     </div>
     <Footer/>
    </div>
  )
}

export default Dashboard