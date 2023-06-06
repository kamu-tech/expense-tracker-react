import React,{useState} from 'react'
import Header from './Header'
import Footer from './Footer'
import {useNavigate} from 'react-router-dom'
import LoginService from '../Service/LoginService'
import Message from './Message'
const Login = (props) => {
  const [message,setMessage]=useState('')
  const [show,setShow]=useState(false);
  const [usernameOrEmail,setUsernameOrEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate=useNavigate()
  const validateLogin=(e)=>{
    const login={usernameOrEmail,password}
    e.preventDefault();
    LoginService.checkLogin(login).then(response=>{
      if(response.data.accessToken!=="enter correct username or email" && response.data.accessToken!=="Enter correct password"){
        localStorage.setItem("user",JSON.stringify(response.data.accessToken));
        props.a();
        setMessage("Success")
        setShow(true)
      }
      else{
        setMessage(response.data.accessToken);
        setShow(true);
      }
    }).catch(error=>{
      console.log(error);
    })
  }
  const handleClose=()=>{
    if(message!=="enter correct username or email" && message!=="Enter correct password"){
       navigate("/dashboard/"+usernameOrEmail);
    }
    setShow(false)
  };
  return (
    <div>
        <Header/>
        <div className='Form'>
        <form>
          <h1>Login</h1>
          <label>Username/email:</label><br/>
          <input 
          type='text'
          value={usernameOrEmail}
          onChange={(e)=>setUsernameOrEmail(e.target.value)}
          ></input><br/><br/>
          <label>Password:</label><br/>
          <input 
          type='password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          ></input><br/><br/>
          <button onClick={(e)=>validateLogin(e)}>Login</button>
          {show && <Message m={message} close={()=>handleClose()}/>}
        </form>
        </div>
        <Footer/>
    </div>
  )
}

export default Login