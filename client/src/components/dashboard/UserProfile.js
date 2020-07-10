import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import clsx from 'clsx';
import _ from "lodash";
import { connect } from 'react-redux';
import { getUsers } from '../../store/actions/usersAction';
import PropTypes from 'prop-types';
import userIcon from "../../media/userIcon.png";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { getDetails } from '../../store/actions/detailsAction';

const useStyles = theme => ({
    paper: {
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
    root: {
        maxWidth: 500,
    },
    detailsRoot: {
        width: 600,
    },
});

class UserProfile extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const id = parseInt(this.props.id);
        const myUser = _.find(this.props.users.users, { 'id': id });
        console.log(myUser);
        console.log(myUser.cnp);
        this.props.getDetails(myUser.cnp);
    }
    render() {
        const { classes } = this.props;
        const id = parseInt(this.props.id);
        const myUser = _.find(this.props.users.users, { 'id': id });
        console.log(this.props.details);
        const currentJobDetails = this.props.details.currentJob;
        const currentResidenceDetails = this.props.details.currentResidence;
        return (
            <React.Fragment>
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
                                    <Typography gutterBottom variant="body1">
                                        Bachelor thesis: {myUser.bachelor_thesis}
                                    </Typography>

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
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    users: state.users, //from root reducer
    details: state.details
})

const mapDispatchtoProps = dispatch => {
    return {
        getDetails: (cnp) => dispatch(getDetails(cnp))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(withStyles(useStyles)(UserProfile));