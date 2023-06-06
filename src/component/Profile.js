import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router'
import SideBar from './SideBar'
import Header1 from './Header1'
import Footer from './Footer'
import ProfileService from '../Service/ProfileService'
import LoginService from '../Service/LoginService'
const Profile = () => {
    const {id}=useParams()
    const [profile,setProfile]=useState([])
    useEffect(()=>{
      ProfileService.display(id).then(response=>{
        setProfile(response.data)
      }).catch(error=>{
        console.log(error);
      })
    },[])
  return (
    <div>
      <Header1/>
      <div className='main-dash'>
        <div className='main-sideBar'>
          <SideBar name='profile' id={id} userName={profile.userName} value={profile.name}/>
        </div>
        <div className='sub-dash'>
          <h2>Profile</h2>
          <hr/>
          <div className='profile'>
            <div className='link-profile'>
            <a href={`/profile/edit/${id}`}>Edit</a>
            </div>
            <div className='label'>
            <h4>Name:<label style={{marginLeft:"55px"}}>{profile.name}</label></h4>
            <h4>Age:<label style={{marginLeft:"70px"}}>{profile.age}</label></h4>
            <h4>Email:<label style={{marginLeft:"60px"}}>{profile.email}</label></h4>
            <h4>UserName:<label style={{marginLeft:"20px"}}>{profile.userName}</label></h4>
            <h4>Gender:<label style={{marginLeft:"45px"}}>{profile.gender}</label></h4>
            </div>
            <hr/>
            <div className='password'>
              <a href={`/profile/changePassword/${id}`}>change password</a>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Profile