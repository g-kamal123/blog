import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Storage } from './Storage'
import classes from './Styles/Navbar.module.css'

function Navbar() {
    const detail = useContext(Storage)
  return (
    <nav className={classes.nav}>
        <Link to='/'>BlogPost!</Link >
        <ul>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/login' activeClassName="active">LogIn</Link>
            </li>
            <li>
                <Link to='/feeds' activeClassName="active">Feeds</Link>
            </li>
            <li>
                {detail.user && <Link to='/login' activeClassName="active" onClick={detail.logout}>Logout</Link>}
                
            </li>
        </ul>
    </nav>
  )
}

export default Navbar