import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./navbar.css"

const Navbar = ({ option1, option2, option3, option4 }) => {
  const homeClass = option1 ? "selected" : "";
  const aboutClass = option2 ? "selected" : "";
  const contactClass = option3 ? "selected" : "";
  const adminClass = option4 ? "selected" : "";

  const navigate = useNavigate();

  return (
    <div className='navbar rise'>
      <h1><span>Code</span> vault</h1>
      <div className="nav-container">
        <button 
          className={homeClass}
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <button
          className={aboutClass}
          onClick={() => navigate("/about")}
        >
          About
        </button>
        <button
          className={contactClass}
          onClick={() => navigate("/contact")}
        >
          Contact
        </button>
      </div>
    </div>
  )
}

export default Navbar