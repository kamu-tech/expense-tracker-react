import React from 'react'

const SideBar = (props) => {
  return (
    <div className='sideBar'>
        <h3>{props.value}</h3>
        <ul>
            <div className={props.name==='dashboard' ? 'dash':'box'}>
            <li><a href={`/dashboard/${props.userName}`}>Dashboard</a></li>
            </div>
            <div className={props.name==='profile' ? 'dash':'box'}>
            <li><a href={`/profile/${props.id}`}>Profile</a></li>
            </div>
            <div className={props.name==='income' ? 'dash':'box'}>
            <li><a href={`/income/${props.id}`}>Income</a></li>
            </div>
            <div className={props.name==='expense' ? 'dash':'box'}>
            <li><a href={`/expense/${props.id}`}>Expense</a></li>
            </div>
        </ul>
    </div>
  )
}

export default SideBar