import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../../store/actions/authActions';
import { clearErrors } from '../../store/actions/errorActions';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'

class SignUp extends Component {
    state = {
        cnp: '',
        first_name: '',
        last_name: '',
        email: '',
        graduation_year: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        //if the error has changed
        if (error !== prevProps.error) {
            //check for register error
            if (error.id === 'REGISTER_FAIL') {
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
        //this.props.clearErrors();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { cnp, first_name, last_name, email, graduation_year } = this.state;
        const newUser = {
            cnp,
            first_name,
            last_name,
            email,
            graduation_year
        }
        //attempt to register
        this.props.register(newUser);
        this.props.clearErrors();
        // console.log("Name : " + this.state.name);
        // console.log("Surname : " + this.state.surname);
        // console.log("Date of birth : " + this.state.date_of_birth);
        // console.log("Email : " + this.state.email);
        // console.log("Password : " + this.state.password);
        // console.log("Gender : " + this.state.gender);
        console.log(this.state);
        console.log(this.props.isAuthenticated);
        if (this.props.isAuthenticated)
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
                    <h5 className="grey-text text-darken-3">Register</h5>
                    {this.state.msg ?
                        <div className="card-panel pink lighten-3">
                            <span className="black-text">{this.state.msg}</span>
                        </div>
                        : null}
                    <div className="input-field">
                        <label htmlFor="name">CNP</label>
                        <input type="text" id="cnp" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="surname">First name</label>
                        <input type="text" id="first_name" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="surname">Last name</label>
                        <input type="text" id="first_name" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Graduation year</label>
                        <input type="graduation_year" id="graduation_year" onChange={this.handleChange} />
                    </div>
                    {/* <div className="input-field col s12">
                        <select htmlFor="graduation_year" id="graduation_year" name={this.state.gender} value={this.state.gender} onChange={this.handleChange}>
                            <option disabled value="">Choose the year of graduation</option>
                            <option value="F">Female</option>
                            <option value="M">Male</option>
                        </select>
                        <label htmlFor="graduation_year">Year of graduation</label>
                         <label for="gender">Gender
                        <select value={this.state.gender} onChange={this.handleChange}>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </label> 
                    </div>*/}
                    <br />
                    <br />

                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Register</button>
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


export default connect(mapStateToProps, { register, clearErrors })(SignUp);