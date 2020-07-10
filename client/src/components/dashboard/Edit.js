import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import userIcon from "../../media/userIcon.png";
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import _ from "lodash";
import { Route, Switch } from "react-router-dom";
import { addDetails } from '../../store/actions/detailsAction';
import Alert from '@material-ui/lab/Alert';
import { NavLink } from 'react-router-dom';

const useStyles = theme => ({
    paper: {
        // marginTop: theme.spacing(8),
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        padding: theme.spacing(1),
        textAlign: 'center',
        marginBottom: theme.spacing(1),
    },
    detailsPaper: {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    media: {
        height: 400,
        width: 400
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    detailsRoot: {
        width: 600,
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

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cnp: '',
            current_position: '',
            company: '',
            country: '',
            city: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
        console.log("handleChange " + [e.target.id] + " " + e.target.value);
        //this.props.clearErrors();
    }

    componentWillMount() {
        console.log("Component will mount")
        console.log(this.props);
        this.setState({
            cnp: this.props.auth.user.properties.cnp
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("HERE IS HANDLE SUBMIT");
        const { cnp, current_position, company, country, city } = this.state;
        const newDetails = {
            cnp,
            current_position,
            company,
            country,
            city
        }
        console.log("HERE ARE THE newDetails");
        console.log(newDetails);
        this.props.addDetails(newDetails);
        event.target.reset();
        // if (this.props.auth.isLoading === false)
        //     this.props.history.push("/login");    
    }

    render() {
        const { classes } = this.props;
        const myUser = this.props.auth.user.properties;
        console.log(myUser);
        return (

            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Add details
                    </Typography>
                    <br />
                    <form
                        className={classes.form}
                        onSubmit={this.handleSubmit}
                        noValidate>
                        <Typography component="h1" variant="h6">
                            Current job
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="current_position"
                            label="Current position"
                            name="current_position"
                            autoComplete="current_position"
                            autoFocus
                            onChange={this.handleChange}
                        />
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="company"
                            label="Company"
                            name="company"
                            autoComplete="company"
                            autoFocus
                            onChange={this.handleChange}
                        />
                        <Typography component="h1" variant="h6">
                            Current residence
                    </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="country"
                            label="Country"
                            name="country"
                            autoComplete="country"
                            autoFocus
                            onChange={this.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="city"
                            label="City"
                            name="city"
                            autoComplete="city"
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
                            Submit
                    </Button>
                        <Button
                            exact
                            component={NavLink}
                            variant="contained"
                            color="primary"
                            to="/dashboard/myprofile"
                        >
                            Return to my profile
                        </Button>
                        {this.props.details.detailsAdded === true ?
                            <div>
                                <Alert severity="success">Details added successfully</Alert>
                            </div>
                            : null}
                    </form>
                </div>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    state: state,
    details: state.details
})

export default connect(mapStateToProps, { addDetails })(withStyles(useStyles)(Edit));