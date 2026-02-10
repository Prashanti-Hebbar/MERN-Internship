import React from 'react'
import './style.css';
import myimage from '../assets/myimage.png';

export default function FirstApp() {
    const mystyle={
        color:"red",
        textAlign:"center",
        border:"2px solid black",
        padding:"10px",
        width:"200px",
        margin:"0 auto"
    }
  return (
    <div>
      <h1>My First App</h1>
      <h4 style={{color:"blue", fontSize:"20px", marginTop:"10px"}}>Inline CSS</h4>
      
      <h4 style={mystyle}>Internal CSS</h4>

      <h5 className='myclass'>External CSS</h5>

      <img src={myimage} alt="My Image" className='myimage'/>
    </div>
  )
}
