import React from 'react'
import { useNavigate } from 'react-router';

const Header1 = () => {
  const navigate=useNavigate();
  const logout=(e)=>{
    e.preventDefault();
    localStorage.removeItem("user");
    navigate('/')
  }
  return (
    <div className="navBar">
        <nav>
        <a href="/">expense tracker system</a>
            <ul>
                <li><a onClick={e=>logout(e)}>Logout</a></li>
            </ul>
        </nav>
    </div>
  )
}

export default Header1