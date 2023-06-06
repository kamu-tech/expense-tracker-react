import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router'
import SideBar from './SideBar'
import Header1 from './Header1'
import Footer from './Footer'
import ProfileService from '../Service/ProfileService'
import Message from './Message'
const EditProfile = () => {
    const [message,setMessage]=useState('')
    const [show,setShow]=useState(false);
    const [userName,setUserName]=useState('')
    const [email,setEmail]=useState('')
    const [age,setAge]=useState()
    const [gender,setGender]=useState('')
    const {id}=useParams()
    const [name,setName]=useState('')
    const navigate=useNavigate()
    useEffect(()=>{
        ProfileService.display(id).then(response=>{
          setName(response.data.name)
          setAge(response.data.age)
          setEmail(response.data.email)
          setGender(response.data.gender)
          setUserName(response.data.userName)
        }).catch(error=>{
          console.log(error);
        })
     },[])
    const edit=(e)=>{
        e.preventDefault();
        const profile={name,email,age,userName,gender}
        ProfileService.Edit(profile,id).then(response=>{
            setMessage(response.data);
            setShow(true);
        }).catch(error=>{
            console.log(error);
        })
     }
    const handleClose=()=>{
      if(message==="Success"){
        navigate(`/profile/${id}`)
       }
      setShow(false)
    };
  return (
    <div>
     <Header1/>
      <div className='main-dash'>
        <div className='main-sideBar'>
          <SideBar name='profile' id={id} userName={userName} value={name}/>
        </div>
        <div className='sub-dash'>
          <h2>Edit Profile</h2>
          <hr/>
          <div className='add-income'>
          <form>
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
        <button onClick={(e)=>edit(e)}>Submit</button>
        {show && <Message m={message} id={id} close={()=>handleClose()}/>}
       </form>
       </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default EditProfile