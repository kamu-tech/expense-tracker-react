import React,{useState} from 'react'
import { useNavigate, useParams } from 'react-router'
import SideBar from './SideBar'
import Header1 from './Header1'
import Footer from './Footer'
import ProfileService from '../Service/ProfileService'
import Message from './Message'
const ChangePassword = () => {
    const [message,setMessage]=useState('')
    const [show,setShow]=useState(false);
    const [password,setPassword]=useState('')
    const [newPassword,setNewPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const {id}=useParams()
    const [profile,setProfile]=useState([])
    const navigate=useNavigate()
    useState(()=>{
        ProfileService.display(id).then(response=>{
          setProfile(response.data)
        }).catch(error=>{
          console.log(error);
        })
      })
    const FindPassword=(e)=>{
        e.preventDefault();
        const setpassword={password,newPassword,confirmPassword}
        ProfileService.changePassword(setpassword,id).then(response=>{
            setMessage(response.data);
            setShow(true);
        }).catch(error=>{
            console.log(error);
        })
      }
      const handleClose=()=>{
        if(message==="successfully changed password"){
          navigate(`/profile/${id}`)
         }
        setShow(false)
      };
  return (
    <div>
        <Header1/>
      <div className='main-dash'>
        <div className='main-sideBar'>
          <SideBar name='profile' id={id} userName={profile.userName} value={profile.name}/>
        </div>
        <div className='sub-dash'>
          <h2>Change Password</h2>
          <hr/>
          <div className='add-income'>
          <form>
          <label>Current Password:</label><br/>
          <input 
           type='password'
           value={password}
          onChange={(e)=>setPassword(e.target.value)}
          ></input><br/><br/>
          <label>New Password:</label><br/>
          <input 
          type='text'
          value={newPassword}
          onChange={(e)=>setNewPassword(e.target.value)}
          ></input><br/><br/>
          <label>Confirm Password:</label><br/>
          <input 
          type='password'
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          ></input><br/><br/>
        <button onClick={(e)=>FindPassword(e)}>Submit</button>
        {show && <Message m={message} id={id} close={()=>handleClose()}/>}
       </form>
       </div>
        </div>
        </div>
      <Footer/>
    </div>
  )
}

export default ChangePassword