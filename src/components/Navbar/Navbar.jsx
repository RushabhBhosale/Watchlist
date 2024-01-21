import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {

   const [menuOpen, setMenuOpen] = useState(true)

   return (
      <nav>
         <Link to='/'><img src='https://img.logoipsum.com/291.svg' /></Link>
         <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
            <i className="fa-solid text-white fa-bars"></i>
         </div>
         <ul className={menuOpen ? 'open' : ''}>
            <li>
               <NavLink to='/anime'>Anime</NavLink>
            </li>
            <li>
               <NavLink to='/movie'>Movies</NavLink>
            </li>
            <li>
               <NavLink to='/webseries'>Webseries</NavLink>
            </li>
         </ul>
      </nav>
   )
}

export default Navbar