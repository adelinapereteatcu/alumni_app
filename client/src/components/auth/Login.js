import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../store/actions/authActions';
import { clearErrors } from '../../store/actions/errorActions';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'

class LogIn extends Component {
    state = {
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            //check for register error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }
        M.AutoInit();
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
        console.log("handleChange " + [e.target.id] + " " + e.target.value);
        this.props.clearErrors();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const  {email, password} = this.state;
        const user = {
            email,
            password
        }
        //attempt to login
        this.props.login(user);
        this.props.clearErrors();
        console.log(this.state);
        this.props.history.push("/");
    }

    componentDidMount() {
        console.log("component did mount");
        M.AutoInit();
        this.props.clearErrors();
    }

    render() {
        return (
            <div className="container">
                <form className="white" onSubmit={this.handleSubmit}>
                    <h5 className="grey-text text-darken-3">Log in</h5>
                    {this.state.msg ?
                        <div className="card-panel pink lighten-3">
                            <span className="black-text">{this.state.msg}</span>
                        </div>
                        : null}
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error //getting this from rootReducer
});


export default connect(mapStateToProps, { login, clearErrors })(LogIn);