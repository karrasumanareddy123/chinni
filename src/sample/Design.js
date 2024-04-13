import React from 'react'
import {useNavigate} from 'react-router-dom'
const Design = () => {
    const navigate=useNavigate()
  return (
    <div style={{display:'flex',listStyle:"none",gap:"30px",background:"lightblue",cursor:"pointer"}}>
      <li onClick={()=>navigate("/")}>Home</li>
      <li onClick={()=>navigate("/post")}>Post</li>
      <li onClick={()=>navigate("/get")}>Get</li>
      <li onClick={()=>navigate("/signup")}>Signup</li>
      <li onClick={()=>navigate("/login")}>Login</li>
     
    </div>
  )
}

export default Design
