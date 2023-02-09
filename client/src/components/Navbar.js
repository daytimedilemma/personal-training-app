import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props){
  const { logout } = props
  return (
    <>
    <div className="navbar">
      <Link to="/profile"
      style={{
        color:"#8fb996"
      }}
      >Profile</Link>
      <Link to="/workout"
       style={{
        color:"#8fb996"
      }}
      >Workout List</Link>
      <Link to="/workoutForm_RepAndWeight"
       style={{
        color:"#8fb996"
      }}
      >Create New Workout</Link>
      <div className='logout--button'> <button onClick={logout}>Logout</button></div>
    </div>
      
    </>
  )
}