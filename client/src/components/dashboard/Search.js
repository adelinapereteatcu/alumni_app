import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import _ from "lodash";
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";

const options = [
    { name: 'Search by first name', label:'first_name'},
    { name: 'Search by last name', label: 'last_name'},
    { name: 'Search by year of graduation', label: 'graduation_year'}
];

const useStyles = theme => ({
});

class Search extends Component {
    constructor(props) {
        super(props);
    
    this.state = {
        first_name:'',
        search_result: []
    }
}

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
        console.log("handleChange " + [e.target.id] + " " + e.target.value);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { first_name } = this.state;
        //console.log(first_name);        
        const filter = _.filter(this.props.users.users, function(f){
            return f.first_name === first_name
        });
        //console.log("SEARCH" + JSON.stringify(search));
        console.log("SEARCH" + JSON.stringify(filter));
        this.setState({
            ...this.state,
            search_result: filter
        })
        console.log("The STATE" + JSON.stringify(this.state.search_result));
    }

    render(){
        const { classes } = this.props;
        return(
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Here you can search for an alumni
                        </Typography>
                    <br />
                    {/* <Autocomplete
                        id="value"
                        options={options}
                        getOptionLabel={(option) => option.name}
                        style={{ width: 300 }}
                        onChange={this.handleChange}
                        renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                    /> */}
                    <form
                        className={classes.form}
                        onSubmit={this.handleSubmit}
                        noValidate>
                        <div className={classes.margin}>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <SearchIcon />
                                </Grid>
                                <Grid item>
                                    <TextField 
                                    id="first_name" 
                                    label="Search by first name"
                                    onChange={this.handleChange}
                                    />
                                </Grid>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onSubmit={this.handleSubmit}
                                >
                                    Search
                        </Button>
                            </Grid>
                        </div>
                    </form>
                </div>
                    <br/>
                {this.state.search_result !== undefined  ?
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <List className={classes.root}>
                            {this.state.search_result.map((a) => (
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
                :null}
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    users: state.users //from root reducer
})

export default connect(mapStateToProps, null)(withStyles(useStyles)(Search));