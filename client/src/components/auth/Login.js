import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../store/actions/authActions';
import { clearErrors } from '../../store/actions/errorActions';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Navbar from '../layout/Navbar';

const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
});

class LogIn extends Component {
    state = {
        user_email: '',
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
        console.log("Component did update");
        const { error } = this.props;
        if (error !== prevProps.error) {
            //check for register error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
        //console.log("handleChange " + [e.target.id] + " " + e.target.value);
        // this.props.clearErrors();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { user_email, password } = this.state;
        const user = {
            user_email,
            password
        }
        //attempt to login
        this.props.login(user);
        //this.props.clearErrors();
        console.log(this.props.state);
        console.log("LOGIN " + this.props.isAuthenticated);
        console.log(this.state.msg);
        if (this.props.isAuthenticated) {
            this.props.history.push("/");
        }
    }

    componentDidMount() {
        console.log("component did mount");
        this.props.clearErrors();
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment >
                {this.props.isAuthenticated ? this.props.history.push("/dashboard") : null}
                <Navbar />
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Log in
                        </Typography>
                        <form
                            className={classes.form}
                            onSubmit={this.handleSubmit}
                            noValidate>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="user_email"
                                label="Email"
                                name="user_email"
                                autoComplete="user_email"
                                autoFocus
                                onChange={this.handleChange}
                            />
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                autoComplete="password"
                                autoFocus
                                onChange={this.handleChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onSubmit={this.handleSubmit}
                            >
                                Log in
                         </Button>
                            {this.state.msg ?
                                <div className="card-panel pink lighten-3">
                                    <span className="black-text">{this.state.msg}</span>
                                </div>
                                : null}
                        </form>
                    </div>
                </Container>
            </React.Fragment >
            // <div className="container">
            //     <form className="white" onSubmit={this.handleSubmit}>
            //         <h5 className="grey-text text-darken-3">Log in</h5>
            //         {this.state.msg ?
            //             <div className="card-panel pink lighten-3">
            //                 <span className="black-text">{this.state.msg}</span>
            //             </div>
            //             : null}
            //         <div className="input-field">
            //             <label htmlFor="email">Email</label>
            //             <input type="email" id="email" onChange={this.handleChange} />
            //         </div>
            //         <div className="input-field">
            //             <label htmlFor="password">Password</label>
            //             <input type="password" id="password" onChange={this.handleChange} />
            //         </div>
            //         <div className="input-field">
            //             <button className="btn pink lighten-1 z-depth-0">Login</button>
            //         </div>
            //     </form>
            // </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        state: state,
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error //getting this from rootReducer
    }
};


export default connect(mapStateToProps, { login, clearErrors })(withStyles(useStyles)(LogIn));