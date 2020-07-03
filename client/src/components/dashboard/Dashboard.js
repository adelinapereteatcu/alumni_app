import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { mainListItems, secondaryListItems } from './listItems';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Route, Switch } from "react-router-dom";
import AlumniList from './AlumniList';
import EditProfile from './EditProfile';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Upload from '../upload/Upload';
import UserProfile from './UserProfile';
import Search from './Search';
import Events from './Events';

const drawerWidth = 240;

const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
});

class Dashboard extends Component {
  state = {
    open: true
  }

  static propTypes = {
    logout: PropTypes.func.isRequired
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
    //console.log("Handle Drawer Open: " + this.state.open);
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
    //console.log("Handle Drawer Close: " + this.state.open);
  };


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, this.state.open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={clsx(classes.menuButton, this.state.open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Dashboard
            </Typography>
            <Button
              exact
              component={NavLink}
              variant="contained"
              color="primary"
              to="/"
              onClick={this.props.logout}
            >
              Log out
            </Button>
            {this.props.user !== null ?
              this.props.user.properties.user_email === "admin@gmail.com" ?
                <Button
                  exact
                  component={NavLink}
                  variant="contained"
                  color="primary"
                  to="/dashboard/upload"
                //onClick={this.props.logout}
                >
                  Upload
            </Button>
                : null : null
            }
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Switch>
            <Route
              exact
              path="/dashboard/alumni"
              component={AlumniList}
            />
            <Route
              exact
              path="/dashboard/myprofile"
              component={EditProfile}
            />
            <Route
              exact
              path="/dashboard/upload"
              component={Upload}
            />
            <Route
              exact
              path="/dashboard/search"
              component={Search}
            />
            <Route
              exact
              path="/dashboard/events"
              component={Events}
            />
            <Route
              exact
              path="/dashboard/alumni/:id"
              render={renderProps => (
                <UserProfile id={renderProps.match.params.id} />
              )}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, { logout })(withStyles(useStyles)(Dashboard));
