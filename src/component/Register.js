import React,{useState} from 'react'
import Header from './Header'
import Footer from './Footer'
import LoginService from '../Service/LoginService'
import { useNavigate } from 'react-router'
import Message from './Message'
const Register = () => {
  const [message,setMessage]=useState('')
  const [show,setShow]=useState(false);
  const [name,setName]=useState('')
  const [userName,setUserName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [age,setAge]=useState()
  const [gender,setGender]=useState('')
  const navigate=useNavigate()
  const Validregister=(e)=>{
    const register={name,userName,email,password,age,gender}
    e.preventDefault();
    LoginService.Register(register).then(response=>{
      setMessage(response.data);
      setShow(true);
    }).catch(error=>{
      console.log(error)
    })
  }
  const handleClose=()=>{
    if(message==="User registered successfully!."){
      navigate('/login')
    }
    setShow(false)
  };
  return (
    <div>
    <Header/>
    <div className='Form'>
    <form>
      <h1>Register</h1>
      <label>Name:</label><br/>
      <input 
      type='text'
      value={name}
      onChange={(e)=>setName(e.target.value)}
      ></input><br/><br/>
      <label>Username:</label><br/>
      <input 
      type='text'
      value={userName}
      onChange={(e)=>setUserName(e.target.value)}
      ></input><br/><br/>
      <label>Email:</label><br/>
      <input 
      type='email'
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      ></input><br/><br/>
      <label>Password:</label><br/>
      <input 
      type='password'
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      ></input><br/><br/>
      <label>Age:</label><br/>
      <input 
      type='text'
      value={age}
      onChange={(e)=>setAge(e.target.value)}
      ></input><br/><br/>
      <label>Gender:</label><br/>
      <select value={gender} onChange={(e)=>setGender(e.target.value)}>
        <option>select options</option>
        <option>Female</option>
        <option>male</option>
        <option>others</option>
      </select>
      <button onClick={(e)=>Validregister(e)}>Register</button>
      {show && <Message m={message} close={()=>handleClose()}/>}
    </form>
    </div>
    <Footer/>
   </div> 

  )
}

export default Register