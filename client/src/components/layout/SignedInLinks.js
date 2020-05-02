import React from 'react';
import {NavLink} from 'react-router-dom';
import Navbar from './Navbar';
import Logout from '../auth/Logout';

const SignedInLinks = () => {
    return (
       <ul className="right">
           {/* <li><NavLink to='/logout'>Log out</NavLink></li> */}
           <li><Logout/></li>
           <li><NavLink to='/'></NavLink></li>
       </ul>
    )
}

export default SignedInLinks;