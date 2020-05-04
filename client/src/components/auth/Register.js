import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../../store/actions/authActions';
import { clearErrors } from '../../store/actions/errorActions';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'

class SignUp extends Component {
    state = {
        name: '',
        surname: '',
        date_of_birth: '',
        email: '',
        password: '',
        gender: '',
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
        console.log("handleChange " + [e.target.id] +" "+ e.target.value);
        //this.props.clearErrors();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { name, surname, date_of_birth, email, password, gender } = this.state;
        const newUser = {
            name,
            surname,
            date_of_birth,
            email,
            password,
            gender
        }
        //attempt to register
        this.props.register(newUser);
        //this.props.clearErrors();
        // console.log("Name : " + this.state.name);
        // console.log("Surname : " + this.state.surname);
        // console.log("Date of birth : " + this.state.date_of_birth);
        // console.log("Email : " + this.state.email);
        // console.log("Password : " + this.state.password);
        // console.log("Gender : " + this.state.gender);
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
                    <h5 className="grey-text text-darken-3">Register</h5>
                    {this.state.msg ?
                        <div className="card-panel pink lighten-3">
                            <span className="black-text">{this.state.msg}</span>
                        </div>
                        : null}
                    <div className="input-field">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="surname">Surname</label>
                        <input type="text" id="surname" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="date_of_birth">Date of birth YYYY-MM-DD</label>
                        <input type="text" id="date_of_birth" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange} />
                    </div>
                    <div className="input-field col s12">
                        <select htmlFor="gender" id="gender" name={this.state.gender} value={this.state.gender} onChange={this.handleChange}>
                            <option disabled value="">Choose option</option>
                            <option value="F">Female</option>
                            <option value="M">Male</option>
                        </select>
                        <label htmlFor="gender">Gender</label>

                        {/* <label for="gender">Gender
                        <select value={this.state.gender} onChange={this.handleChange}>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </label> */}
                    </div>
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