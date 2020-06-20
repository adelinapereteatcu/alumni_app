import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import BarChartIcon from '@material-ui/icons/BarChart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from "react-router-dom";

export const mainListItems = (
    <div>
        <ListItem button component={Link} to="/dashboard/alumni">
            <ListItemIcon>
                <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Alumni" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/myprofile">
            <ListItemIcon>
                <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="My profile" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/events">
            <ListItemIcon>
                <EventAvailableIcon />
            </ListItemIcon>
            <ListItemText primary="Events" />
        </ListItem>
        <ListItem button to="/dashboard/search">
            <ListItemIcon>
                <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
        </ListItem>
        <ListItem button to="/dashboard/statistics">
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Statistics" />
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
        </ListItem>
    </div>
);