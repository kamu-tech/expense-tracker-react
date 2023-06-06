import React from 'react'

const Header = () => {
  return (
    <div className="navBar">
        <nav>
        <a href="/">expense tracker system</a>
            <ul>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
            </ul>
        </nav>
    </div>
  )
}

export default Header