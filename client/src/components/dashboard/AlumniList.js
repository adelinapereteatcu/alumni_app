import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { getAlumni } from '../../store/actions/alumniActions';
import { getUsers } from '../../store/actions/usersAction';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const useStyles = theme => ({
    root: {
        width: '100%',
        maxWidth: '100ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    }
});

class AlumniList extends Component {

    //the place usually for making API requests
    componentDidMount() {
        this.props.getAlumni();
        this.props.getUsers();
        //console.log(this.props);
        //console.log(this.props.alumni.alumniArray);
    }

    render() {
        const { classes } = this.props;
        const { alumni } = this.props.alumni;
        const { users } = this.props.users;
        return (
            <React.Fragment>
                <Container maxWidth="xl" className={classes.container}>
                    <Typography variant="h4" gutterBottom>
                        Registered Alumni
                    </Typography>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <List className={classes.root}>
                                {users.map((a) => (
                                    <React.Fragment>
                                        <ListItem 
                                        component={Link}
                                            to={`/dashboard/alumni/${a.id}`} 
                                            key={a.id} 
                                            alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar />
                                                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                                            </ListItemAvatar>
                                            <ListItemText
                                                key={a.id}
                                                primary={a.first_name + " " + a.last_name}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            className={classes.inline}
                                                            color="textPrimary"
                                                        >
                                                            {"Graduation year: " + a.graduation_year}
                                                            <br />
                                                            {"Bachelor thesis: " + a.bachelor_thesis}
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                        {/* <Divider variant="inset" component="li" /> */}
                                    </React.Fragment>))}
                            </List>
                        </Paper>
                    </Grid>
                </Container>


                <Container maxWidth="xl" className={classes.container}>
                    <Typography variant="h4" gutterBottom>
                        Unregistered Alumni
                    </Typography>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <List className={classes.root}>
                                {alumni.map((a) => (
                                    <React.Fragment>
                                        <ListItem key={a.id} alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar/>
                                                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={a.first_name + " " + a.last_name}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            className={classes.inline}
                                                            color="textPrimary"
                                                        >
                                                        </Typography>
                                                        {"Graduation year: " + a.graduation_year}
                                                        <br />
                                                        {"Bachelor thesis: " + a.bachelor_thesis}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                    </React.Fragment>))}
                            </List>
                        </Paper>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}

AlumniList.propTypes = {
    getAlumni: PropTypes.func.isRequired,
    alumni: PropTypes.object.isRequired,
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    alumni: state.alumni, //from root reducer
    users: state.users //from root reducer
})

const mapDispatchtoProps = dispatch => {
    return {
        getAlumni: () => dispatch(getAlumni()),
        getUsers: () => dispatch(getUsers())
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(withStyles(useStyles)(AlumniList));
