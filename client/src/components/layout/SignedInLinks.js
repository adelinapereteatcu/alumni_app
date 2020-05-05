import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Navbar from './Navbar';
import Logout from '../auth/Logout';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SignedInLinks extends Component {
    render (){
        return (
            <ul className="right">
                {/* <li><NavLink to='/logout'>Log out</NavLink></li> */}
                <li> Welcome {this.props.userName} </li>
                <li><Logout /></li>
                <li><NavLink to='/'></NavLink></li>
            </ul>
        )
    }
}

export default SignedInLinks;