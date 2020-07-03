import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { getEvents, addEvent } from '../../store/actions/eventsActions';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';
import { clearErrors } from '../../store/actions/errorActions';

const useStyles = theme => ({
    root: {
        width: '100%',
        //maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    section1: {
        margin: theme.spacing(1, 2),
    },
    section2: {
        margin: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    detailsPaper: {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: 600
    },
});

class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cnp: '',
            event_name: '',
            location: '',
            description: ''
        }
    }

    static propTypes = {
        // error: PropTypes.object.isRequired,
        addEvent: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getEvents();
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
        const { cnp, event_name, location, description } = this.state;
        console.log(this.state);
        const newEvent = {
            cnp,
            event_name,
            location,
            description
        }
        //attempt to register
        console.log(newEvent);
        this.props.addEvent(newEvent);
        this.props.clearErrors();
        event.target.reset();
        //console.log(this.props.auth.user.properties.cnp);   
    }

    componentWillReceiveProps(props) {
        //console.log(props);
        this.setState({
            cnp: props.auth.user.properties.cnp
        });
    }

    render() {
        const { classes } = this.props;
        // console.log(this.props);
        // console.log("EVENT ADDED" + this.props.eventAdded);
        return (
            <Container maxWidth="xl" className={classes.container}>
                <Typography variant="h4" gutterBottom>
                    Here you can see and post new events
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xl={6}>
                        <Paper className={classes.paper}>
                            {this.props.events.events.map((a) => (
                                <React.Fragment>
                                    <div className={classes.root}>
                                        <div className={classes.section1}>
                                            <Grid container alignItems="center">
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="h5">
                                                        {a.event_name}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Typography color="textSecondary" variant="body2">
                                               Event description: {a.description}
                                            </Typography>
                                        </div>
                                        <Divider variant="middle" />
                                        <div className={classes.section2}>
                                            <Grid container alignItems="center">
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="body1">
                                                        Event location
                                            </Typography>
                                                    <Typography color="textSecondary" variant="body2">
                                                        {a.location}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography gutterBottom variant="body1">
                                                        Posted on:
                                            </Typography>
                                                    <Typography color="textSecondary" variant="body2">
                                                        {a.timestamp.day.low + "-" + a.timestamp.month.low + "-" + a.timestamp.year.low}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                    <br />
                                </React.Fragment>
                            ))}
                        </Paper>
                    </Grid>
                    <Grid item xl={6}>
                        <Paper className={classes.detailsPaper}>
                            <Typography gutterBottom variant="h5">
                                Add event
                            </Typography>
                            <form
                                className={classes.form}
                                onSubmit={this.handleSubmit}
                                noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="event_name"
                                    label="Event name"
                                    name="event_name"
                                    autoComplete="event_name"
                                    autoFocus
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="location"
                                    label="Location"
                                    name="location"
                                    autoComplete="location"
                                    autoFocus
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    multiline
                                    fullWidth
                                    id="description"
                                    label="Event description"
                                    name="description"
                                    autoComplete="description"
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
                                    Add event
                        </Button>
                                {this.props.error.msg.msg !== undefined ?
                                    <div>
                                        <Alert severity="error">{this.props.error.msg.msg}</Alert>
                                    </div>
                                    : null}
                                {this.props.eventAdded === true ?
                                    <div>
                                        <Alert severity="success">Event added successfully</Alert>
                                    </div>
                                    : null}
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    events: state.events, //from events reducer
    auth: state.auth,
    error: state.error,
    eventAdded: state.events.eventAdded
})

export default connect(mapStateToProps, { getEvents, addEvent, clearErrors })(withStyles(useStyles)(Events));