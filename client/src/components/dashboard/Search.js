import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = theme => ({
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 220,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
});

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            criteria: '',
            search_result: []
        }
    }

    handleChangeOnName = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
        console.log("handleChangeOnName " + "name: " + [e.target.name] + " value: " + e.target.value);

    }
    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
        console.log("handleChange " + "id: " + [e.target.id] + " value: " + e.target.value);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { criteria, value } = this.state;
        var filter;
        if (criteria === "first_name") {
            filter = _.filter(this.props.users.users, function (f) {
                return f.first_name === value
            });
        } else if (criteria === "last_name") {
            filter = _.filter(this.props.users.users, function (f) {
                        return f.last_name === value
                    });
        } else if (criteria === "graduation_year") {
            filter = _.filter(this.props.users.users, function (f) {
                    return f.graduation_year === value
                });
        } else 
        // switch (criteria) {
        //     case "first_name":
        //         {
        //             console.log("FIRST CASE");
        //             console.log("CRITERIA " + criteria);
        //             filter = _.filter(this.props.users.users, function (f) {
        //             return f.first_name === value
        //         });
        //         }
        //     case "last_name":
        //         {
        //             console.log("SECOND CASE");
        //             filter = _.filter(this.props.users.users, function (f) {
        //                 return f.last_name === value
        //             });
        //         }
        //     case "graduation_year":
        //         {
        //             console.log("THIRD CASE");
        //             filter = _.filter(this.props.users.users, function (f) {
        //             return f.graduation_year === value
        //         });
        //         }
        //     default:
        //         console.log("DEFAULT");      
        // }

        // const filter = _.filter(this.props.users.users, function(f){
        //     return f.first_name === first_name
        // });
        console.log("SEARCH" + JSON.stringify(filter));
        this.setState({
            ...this.state,
            search_result: filter
        })
        // console.log("The STATE" + JSON.stringify(this.state.search_result));
    }

    render() {
        const { classes } = this.props;
        console.log(this.props);
        console.log(this.state);
        return (
            <Container maxWidth="xl" className={classes.container}>
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography variant="h4" gutterBottom>
                        Here you can search for an alumni
                        </Typography>
                    <br />
                    <Typography variant="h5" gutterBottom>
                        Select the criteria for your search
                     </Typography>

                    <form
                        className={classes.form}
                        onSubmit={this.handleSubmit}
                        noValidate>
                        <div className={classes.margin}>
                            <FormControl name="criteria" className={classes.formControl} id="criteria">
                                <InputLabel name="criteria" id="criteria">Search criteria</InputLabel>
                                <Select
                                    labelId="criteria"
                                    name="criteria"
                                    id="criteria"
                                    value={this.criteria}
                                    onChange={this.handleChangeOnName}
                                >
                                    <MenuItem id="criteria" name="criteria" value="first_name">First name</MenuItem>
                                    <MenuItem id="criteria" value='last_name'>Last name</MenuItem>
                                    <MenuItem id="criteria" value='graduation_year'>Graduation year</MenuItem>
                                </Select>
                                {/* <FormHelperText>Some important helper text</FormHelperText> */}
                            </FormControl>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <SearchIcon />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="value"
                                        label="Search "
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
                <br />
                {this.state.search_result && this.state.search_result.length > 0 ?
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
                    : null}
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    users: state.users //from root reducer
})

export default connect(mapStateToProps, null)(withStyles(useStyles)(Search));