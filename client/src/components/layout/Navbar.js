import React, { Component } from 'react';
import Link from '@material-ui/core/Link';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    margin: {
        margin: theme.spacing(3),
        flexGrow: 1,
        color: "white"
    },
});

class Navbar extends Component {

    // state = {
    //     isAuthenticated: null,
    //     user: ''
    // }

    // componentDidMount(){
    //     console.log();
    //     this.setState({
    //         isAuthenticated: this.props.auth.isAuthenticated,
    //         user: this.props.auth.user
    //     })
    // }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    render() {
        const { isAuthenticated, user } = this.props.auth; //contains initialState from authReducer
        let currentUser = '';
        //user ? currentUser = Object.values(user)[0][0].name : ''; 
        // if (user !== null) {
        //     currentUser = Object.values(user)[0][0].name;
        //     console.log(Object.values(user)[0][0].name);
        // }

        //else currentUser='';

        //console.log("USER " + user ? user : '');
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Box flexGrow={1}>
                        <Typography variant="h5">
                            <Link href="/" color="inherit" className="margin">
                                Alumni App
                            </Link>
                        </Typography>
                        </Box>
                        <Button variant="contained" color="primary" href="/register" >
                            Register
                        </Button>
                        <Button variant="contained" color="primary" href="/login" >
                            Log in
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
            // <nav className="nav-wrapper grey darken-3">
            //     <div className="container">
            //         <Link to='/' className="brand-logo">Alumni App</Link>
            //         {isAuthenticated ? <SignedInLinks userName={currentUser}/> : <SignedOutLinks/>}
            //     </div>
            // </nav>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(withStyles(useStyles)(Navbar));