
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Register from './component/Register';
import Dashboard from './component/Dashboard';
import Profile from './component/Profile';
import Income from './component/Income';
import Expense from './component/Expense';
import EditProfile from './component/EditProfile';
import ChangePassword from './component/ChangePassword';
import AddIncome from './component/AddIncome';
import AddExpense from './component/AddExpense';
import EditIncome from './component/EditIncome';
import EditExpense from './component/EditExpense';
import PrivateRoute from './component/PrivateRoute';
import Message from './component/Message';
import { useEffect, useState } from 'react';

function App() {
  const c=JSON.parse(localStorage.getItem("user"));
  const [isAuthenticated,setIsAuthenticated]=useState(c ? true:false)
  const check=()=>{
    setIsAuthenticated(true);
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/'  element={<Home/>} />
          <Route path='/login' element={<Login a={()=>check()}/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dashboard/:userName' element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Dashboard/>}/>}/>
          <Route path='/profile/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Profile/>}/>}/>
          <Route path='/income/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Income/>}/>}/>
          <Route path='/expense/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Expense/>}/>}/>
          <Route path='/profile/edit/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} element={<EditProfile/>}/>}/>
          <Route path='/profile/changePassword/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} element={<ChangePassword/>}/>}/> 
          <Route path='/income/addIncome/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} element={<AddIncome/>}/>} />
          <Route path='/income/editIncome/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} element={<EditIncome/>}/>}/> 
          <Route path='/expense/addExpense/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} element={<AddExpense/>}/>} />  
          <Route path='/expense/editExpense/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} element={<EditExpense/>}/>} />
          
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
