import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {logout} from '../../store/actions/authActions';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    }
  render() {
    return (
        <Fragment>
            <NavLink onClick={this.props.logout} to="/">
                Logout
            </NavLink>
        </Fragment>
    );
  }

}

export default connect (null, {logout})(Logout);
