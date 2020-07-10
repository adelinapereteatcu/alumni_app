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
import Divider from '@material-ui/core/Divider';
import { Route, Switch } from "react-router-dom";
import Edit from './Edit';
import { NavLink } from 'react-router-dom';
import { getDetails } from '../../store/actions/detailsAction';

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
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
});

class EditProfile extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.auth.user.properties.cnp);
        this.props.getDetails(this.props.auth.user.properties.cnp);
    }

    render() {
        const { classes } = this.props;
        const myUser = this.props.auth.user.properties;
        const currentJobDetails = this.props.details.currentJob;
        const currentResidenceDetails = this.props.details.currentResidence;
        return (
            <Grid container spacing={3}>
                {/* User image here */}
                <Grid item xl={4}>
                    <Paper className={classes.paper}>
                        <Card className={classes.root}>
                            <CardMedia
                                className={classes.media}
                                image={userIcon}
                                title="User Profile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {myUser.first_name + " " + myUser.last_name}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Button
                            exact
                            component={NavLink}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            to="/dashboard/myprofile/edit"
                        >
                            Add details
                        </Button>
                    </Paper>
                </Grid>
                {/* User details */}
                <Grid item xl={8}>
                    <Paper className={classes.detailsPaper}>
                        <Card className={classes.detailsRoot}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    User details
                                    </Typography> 
                                <Typography gutterBottom variant="body1">
                                    Graduation year: {myUser.graduation_year}
                                </Typography>
                                <Divider />
                                <Typography gutterBottom variant="body1">
                                    Bachelor thesis: {myUser.bachelor_thesis}
                                </Typography>
                                <Divider />
                                {currentJobDetails && currentJobDetails.length > 0 ?
                                <React.Fragment>
                                    <Typography gutterBottom variant="body1">
                                        Current job
                                    </Typography>
                                    <Typography gutterBottom variant="body2">
                                        Position: {currentJobDetails[0].position}
                                    </Typography>
                                    <Typography gutterBottom variant="body2">
                                        Company: {currentJobDetails[0].company}
                                    </Typography>
                                        <Divider />
                                    </React.Fragment>
                                    : null
                                }
                                {currentResidenceDetails && currentResidenceDetails.length > 0 ?
                                <React.Fragment>
                                    <Typography gutterBottom variant="body1">
                                        Current residency
                                    </Typography>
                                    <Typography gutterBottom variant="body2">
                                            Country: {currentResidenceDetails[0].country}
                                    </Typography>
                                    <Typography gutterBottom variant="body2">
                                            City: {currentResidenceDetails[0].city}
                                    </Typography>
                                        
                                    </React.Fragment>
                                    : null
                                }

                            </CardContent>
                        </Card>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    details: state.details
})

const mapDispatchtoProps = dispatch => {
    return {
        getDetails: (cnp) => dispatch(getDetails(cnp))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(withStyles(useStyles)(EditProfile));