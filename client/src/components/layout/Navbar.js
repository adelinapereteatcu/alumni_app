import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Navbar extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    render() {
        const {isAuthenticated, user} = this.props.auth; //contains initialState from authReducer
        let currentUser = '';
        //user ? currentUser = Object.values(user)[0][0].name : ''; 
        if (user !== null) {
            currentUser = Object.values(user)[0][0].name;
            console.log(Object.values(user)[0][0].name);
        }
             
        //else currentUser='';
       
        //console.log("USER " + user ? user : '');
        console.log("isAuthenticated   " + isAuthenticated);
        return (
            <nav className="nav-wrapper grey darken-3">
                <div className="container">
                    <Link to='/' className="brand-logo">Alumni App</Link>
                    {isAuthenticated ? <SignedInLinks userName={currentUser}/> : <SignedOutLinks/>}
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(Navbar);