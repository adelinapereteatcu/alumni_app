import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../../store/actions/authActions';
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
import Alert from '@material-ui/lab/Alert';

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
    },
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    }
});


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cnp: '',
            first_name: '',
            last_name: '',
            user_email: '',
            graduation_year: '',
            password: '',
            msg: null
        }
    }

    static propTypes = {
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
        console.log(this.state.msg);
        // if (this.state.msg === null)
        //     this.props.history.push("/login");
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
        //console.log("handleChange " + [e.target.id] + " " + e.target.value);
        //this.props.clearErrors();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { cnp, first_name, last_name, graduation_year, user_email, password } = this.state;
        const newUser = {
            cnp,
            first_name,
            last_name,
            graduation_year,
            user_email,
            password
        }
        //attempt to register
        this.props.register(newUser);
        this.props.clearErrors();
        this.props.history.push("/login");
        // console.log("Name : " + this.state.name);
        // console.log("Surname : " + this.state.surname);
        // console.log("Date of birth : " + this.state.date_of_birth);
        // console.log("Email : " + this.state.email);
        // console.log("Password : " + this.state.password);
        // console.log("Gender : " + this.state.gender);    
    }

    componentDidMount() {
        console.log("component did mount");
        this.props.clearErrors();
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Navbar />
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Register
                        </Typography>
                        <br/>
                        {this.state.msg ?
                            <div className={classes.root}>
                                <Alert severity="error">{this.state.msg}</Alert>
                            </div> : null}
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
                                id="cnp"
                                label="CNP"
                                name="cnp"
                                autoComplete="cnp"
                                autoFocus
                                onChange={this.handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="first_name"
                                label="First Name"
                                name="first_name"
                                autoComplete="first_name"
                                autoFocus
                                onChange={this.handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="last_name"
                                label="Last Name"
                                name="last_name"
                                autoComplete="last_name"
                                autoFocus
                                onChange={this.handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="graduation_year"
                                label="Graduation Year"
                                name="graduation_year"
                                autoComplete="graduation_year"
                                autoFocus
                                onChange={this.handleChange}
                            />
                            <TextField
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
                                Register
                        </Button>
                            {/* <form
                        className={classes.form}
                        onSubmit={this.handleSubmit}
                    > 
                    <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="cnp">
                                CNP
                                </InputLabel>
                            <Input
                                id="cnp"
                                name="cnp"
                                autoComplete="cnp"
                                autoFocus
                                onChange={this.handleChange}
                                required
                            />
                        </FormControl> 
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="first_name">
                                First Name
                                </InputLabel>
                            <Input
                                id="first_name"
                                name="first_name"
                                autoComplete="first_name"
                                autoFocus
                                onChange={this.handleChange}
                                required
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="last_name">
                                Last Name
                                </InputLabel>
                            <Input
                                id="last_name"
                                name="last_name"
                                autoComplete="last_name"
                                autoFocus
                                onChange={this.handleChange}
                                required
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="graduation_year">
                                Graduation Year
                                </InputLabel>
                            <Input
                                id="graduation_year"
                                name="graduation_year"
                                autoComplete="graduation_year"
                                autoFocus
                                onChange={this.handleChange}
                                required
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onSubmit={this.handleSubmit}
                        >
                            Register
                            </Button>*/}
                        </form>
                    </div>
                </Container>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    error: state.error //getting this from rootReducer
});


//mapStateToProps, mapDispatchToProps
export default connect(mapStateToProps, { register, clearErrors })(withStyles(useStyles)(SignUp));